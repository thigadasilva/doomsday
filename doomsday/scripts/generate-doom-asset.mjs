import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

function createPng(width, height, getPixel) {
  const crcTable = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1)
      else c = c >>> 1
    }
    crcTable[n] = c
  }

  function crc32(buf) {
    let c = 0xffffffff
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
    }
    return (c ^ 0xffffffff) >>> 0
  }

  function makeChunk(type, data) {
    const len = data.length
    const buf = Buffer.alloc(12 + len)
    buf.writeUInt32BE(len, 0)
    buf.write(type, 4, 4, 'ascii')
    data.copy(buf, 8)
    const crcVal = crc32(buf.subarray(4, 8 + len))
    buf.writeUInt32BE(crcVal, 8 + len)
    return buf
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr.writeUInt8(8, 8)
  ihdr.writeUInt8(6, 9) // RGBA
  ihdr.writeUInt8(0, 10)
  ihdr.writeUInt8(0, 11)
  ihdr.writeUInt8(0, 12)

  const scanlineSize = 1 + width * 4
  const rawData = Buffer.alloc(scanlineSize * height)

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineSize
    rawData[rowOffset] = 0
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4
      const [r, g, b, a] = getPixel(x, y, width, height)
      rawData[pixelOffset] = r
      rawData[pixelOffset + 1] = g
      rawData[pixelOffset + 2] = b
      rawData[pixelOffset + 3] = a
    }
  }

  const idatData = zlib.deflateSync(rawData, { level: 8 })
  const idat = makeChunk('IDAT', idatData)
  const iend = makeChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([signature, makeChunk('IHDR', ihdr), idat, iend])
}

const WIDTH = 1200
const HEIGHT = 1600

function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
  return x * x * (3 - 2 * x)
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const l2 = (x1 - x2) ** 2 + (y1 - y2) ** 2
  if (l2 === 0) return Math.hypot(px - x1, py - y1)
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2
  t = Math.max(0, Math.min(1, t))
  return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)))
}

function getPixel(x, y, w, h) {
  // Coordenadas relativas ao centro horizontal
  const cx = w / 2
  const dx = x - cx
  const absDx = Math.abs(dx)

  // 1. Definição da silhueta do capuz e capa
  // Pico do capuz em y = 240
  // Alargamento do capuz até os ombros
  let hoodWidth = 0
  if (y >= 230 && y < 720) {
    const t = (y - 230) / (720 - 230)
    // Curva ogival/pontuda no topo abrindo suavemente
    hoodWidth = 240 * Math.sin(t * Math.PI * 0.5) + 80 * Math.sin(t * Math.PI)
    if (t < 0.25) {
      hoodWidth = (y - 230) * 1.3
    }
  }

  // Ombro e manto
  let cloakWidth = 0
  if (y >= 680 && y < 1600) {
    const t = (y - 680) / (1600 - 680)
    cloakWidth = 260 + 320 * Math.pow(t, 0.65)
  }

  const inHood = y >= 230 && y < 720 && absDx <= hoodWidth
  const inCloak = y >= 680 && y < 1600 && absDx <= cloakWidth

  if (!inHood && !inCloak) {
    return [0, 0, 0, 0] // Transparente total fora da silhueta
  }

  // Cálculo da distância até a borda externa para rim lighting (iluminação de contorno)
  const currentBoundWidth = inHood ? Math.max(hoodWidth, cloakWidth) : cloakWidth
  const distToEdge = Math.max(0, currentBoundWidth - absDx)

  // Cor base do tecido (verde profundo Doom com textura de dobras)
  let r = 18
  let g = 30
  let b = 23
  let alpha = 255

  // Dobras do manto (variações subtis com cosseno)
  const foldPattern = Math.cos((absDx * 0.05) + (y * 0.02)) * 0.5 + 0.5
  const shadowDepth = (1 - (absDx / (currentBoundWidth + 1))) * 0.35
  r = Math.round(r * (0.7 + 0.6 * foldPattern - shadowDepth))
  g = Math.round(g * (0.7 + 0.6 * foldPattern - shadowDepth))
  b = Math.round(b * (0.7 + 0.6 * foldPattern - shadowDepth))

  // 2. Abertura do capuz e máscara metálica
  // Centro do rosto em y = 500, cx = 600
  const faceDistY = (y - 505) / 135
  const faceDistX = dx / 115
  const inFaceOpening = (faceDistX * faceDistX + faceDistY * faceDistY) <= 1.0 && y >= 370 && y <= 645

  if (inFaceOpening) {
    // Sombra profunda interna do capuz
    const rimShadow = 1.0 - Math.sqrt(faceDistX * faceDistX + faceDistY * faceDistY)
    
    // Placa metálica da máscara
    // Geometria da máscara metálica
    const maskDistX = dx / 95
    const maskDistY = (y - 515) / 115
    const inMask = (maskDistX * maskDistX + maskDistY * maskDistY) <= 0.88 && y >= 410

    if (inMask) {
      // Tom do metal: cinza ferro/aço escovado
      let metalTone = 75 + Math.cos(dx * 0.08) * 25 + Math.sin(y * 0.06) * 15
      
      // Reflexo metálico angular
      const specularHighlight = Math.max(0, 1 - Math.abs(dx * 0.02 - (y - 510) * 0.015))
      metalTone += specularHighlight * 30

      r = Math.min(255, Math.round(metalTone * 0.85))
      g = Math.min(255, Math.round(metalTone * 0.95))
      b = Math.min(255, Math.round(metalTone * 0.90))

      // Sulcos / rebites e traços característicos da máscara
      // Ranhuras verticais de ventilação na boca (y entre 565 e 600)
      if (y >= 565 && y <= 600 && absDx <= 40) {
        if (Math.abs(dx) % 12 < 3) {
          r = 12; g = 14; b = 13 // Fendas da boca
        }
      }

      // Olhos: Fendas angulares frias e ameaçadoras (olhos entre y=475 e y=495)
      // Olho esquerdo (dx negativo ~ -42), Olho direito (dx positivo ~ 42)
      const eyeDx = absDx - 42
      const eyeDy = y - 485
      const eyeDist = Math.hypot(eyeDx * 0.5, eyeDy * 1.5)

      if (eyeDist < 12) {
        // Fenda interna do olho: núcleo verde esmeralda místico
        const glowFactor = Math.max(0, 1 - eyeDist / 12)
        r = Math.round(20 + 32 * glowFactor)
        g = Math.round(50 + 205 * glowFactor) // Brilho esmeralda intenso
        b = Math.round(40 + 153 * glowFactor)
      } else if (eyeDist < 24) {
        // Halo sutil ao redor dos olhos
        const halo = (1 - (eyeDist - 12) / 12) * 0.5
        g = Math.min(255, g + Math.round(120 * halo))
        b = Math.min(255, b + Math.round(60 * halo))
      }
    } else {
      // Cavidade de sombra densa dentro do capuz
      r = 10; g = 14; b = 12
    }
  }

  // 3. Medalhões / Broches dourados de Latveria (ombros em y = 730, dx = -220 e +220)
  const claspLeftDist = Math.hypot(dx - (-210), y - 730)
  const claspRightDist = Math.hypot(dx - 210, y - 730)
  const minClaspDist = Math.min(claspLeftDist, claspRightDist)

  if (minClaspDist < 32) {
    // Medalhão de ouro envelhecido
    const tClasp = minClaspDist / 32
    const ringHighlight = Math.sin(tClasp * Math.PI * 3) * 0.5 + 0.5
    r = Math.round(183 * 0.8 + 40 * ringHighlight)
    g = Math.round(154 * 0.8 + 35 * ringHighlight)
    b = Math.round(96 * 0.8 + 20 * ringHighlight)
  }

  // Corrente entre os medalhões (arco sutil)
  const chainY = 730 + Math.pow(dx / 210, 2) * 35
  if (absDx < 210 && Math.abs(y - chainY) < 5) {
    if (Math.abs(dx) % 14 < 6) {
      r = 170; g = 145; b = 88 // Elos da corrente dourada
    }
  }

  // 4. Rim Light (Luz verde esmeralda no contorno do capuz e ombros)
  if (distToEdge < 38) {
    const rimIntensity = Math.pow(1 - distToEdge / 38, 2.2)
    // Luz verde esmeralda mística contornando a silhueta
    r = Math.min(255, Math.round(r + 30 * rimIntensity))
    g = Math.min(255, Math.round(g + 180 * rimIntensity))
    b = Math.min(255, Math.round(b + 110 * rimIntensity))
  }

  // 5. Suavização das bordas externas (anti-aliasing)
  if (distToEdge < 2.5) {
    alpha = Math.round(255 * (distToEdge / 2.5))
  }

  // 6. Fusão na base (y de 1150 a 1600: fade gradativo para preto/transparência suave)
  if (y > 1100) {
    const fadeOut = 1 - smoothstep(1100, 1580, y)
    alpha = Math.round(alpha * fadeOut)
  }

  return [r, g, b, alpha]
}

console.log('Gerando asset de alta resolução do Doutor Destino (1200x1600)...')
const pngBuffer = createPng(WIDTH, HEIGHT, getPixel)

const targetDirs = [
  path.resolve('src/assets/images'),
  path.resolve('public/images')
]

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  const outPath = path.join(dir, 'doctor-doom-hero.png')
  fs.writeFileSync(outPath, pngBuffer)
  console.log(`Asset gravado com sucesso em: ${outPath} (${(pngBuffer.length / 1024).toFixed(1)} KB)`)
}
