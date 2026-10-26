<template>
  <section ref="sceneRef" id="arrival-scene" class="scene arrival-hero" aria-label="The Arrival — Abertura com Doutor Destino">
    <!-- 1. Fundo com profundidade atmosférica -->
    <div class="hero-background" aria-hidden="true">
      <div class="hero-background__gradient"></div>
      <div class="hero-background__vignette"></div>
      <div class="hero-background__grain"></div>
    </div>

    <!-- 2. Atmosfera e iluminação volumétrica verde -->
    <div class="hero-atmosphere" aria-hidden="true">
      <div class="hero-atmosphere__glow"></div>
      <div class="hero-atmosphere__beam"></div>
      <div class="hero-atmosphere__mist-base"></div>
    </div>

    <!-- 3. Tipografia monumental integrada -->
    <div class="hero-typography">
      <p class="hero-eyebrow">AVENGERS &bull; DOOMSDAY</p>
      <h1 class="hero-title">DOOMSDAY</h1>
    </div>

    <!-- 4. Personagem principal (Doutor Destino) em escala imponente -->
    <div class="hero-character">
      <div class="hero-character__aura" aria-hidden="true"></div>
      <div class="hero-character__wrapper">
        <img
          :src="doomHeroImg"
          alt="Doutor Destino em silhueta monumental com manto verde e máscara de aço"
          class="hero-character__image"
          loading="eager"
          decoding="async"
        />
      </div>
      <!-- Sombra e fade suave na base para fundir o personagem ao abismo da cena -->
      <div class="hero-character__shadow-blend" aria-hidden="true"></div>
    </div>

    <!-- 5. Indicador discreto de scroll -->
    <div class="hero-scroll-indicator" aria-hidden="true">
      <span class="hero-scroll-indicator__label">SCROLL</span>
      <div class="hero-scroll-indicator__track">
        <div class="hero-scroll-indicator__notch"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useGsap } from '@/composables/useGsap'
import doomHeroImg from '@/assets/images/doctor-doom-hero.png'

const sceneRef = ref(null)

// Mantém a instância do useGsap pronta para a próxima etapa (animações GSAP/ScrollTrigger)
useGsap(sceneRef)
</script>

<style scoped>
/* ==========================================================================
   HERO CONTAINER
   ========================================================================== */
.arrival-hero {
  position: relative;
  width: 100%;
  height: calc(100vh - 48px);
  min-height: calc(100svh - 48px);
  max-height: 1200px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  border-bottom: 1px solid var(--color-border-subtle);
  background-color: var(--color-bg-primary);
  user-select: none;
}

/* ==========================================================================
   1. CAMADA DE FUNDO (HERO BACKGROUND)
   ========================================================================== */
.hero-background {
  position: absolute;
  inset: 0;
  z-index: var(--z-background);
  pointer-events: none;
}

.hero-background__gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 85% 65% at 50% 30%,
    rgba(20, 32, 25, 0.4) 0%,
    rgba(12, 18, 14, 0.85) 50%,
    var(--color-bg-primary) 100%
  );
}

.hero-background__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    transparent 45%,
    rgba(0, 0, 0, 0.6) 80%,
    var(--color-bg-primary) 100%
  );
}

.hero-background__grain {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: radial-gradient(#ffffff 1px, transparent 1px);
  background-size: 4px 4px;
}

/* ==========================================================================
   2. CAMADA DE ATMOSFERA E ILUMINAÇÃO (HERO ATMOSPHERE)
   ========================================================================== */
.hero-atmosphere {
  position: absolute;
  inset: 0;
  z-index: var(--z-base);
  pointer-events: none;
  overflow: hidden;
}

/* Halo místico esmeralda posicionado estrategicamente atrás do Doutor Destino */
.hero-atmosphere__glow {
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(340px, 50vw, 750px);
  height: clamp(340px, 50vw, 750px);
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(52, 211, 153, 0.18) 0%,
    rgba(36, 73, 54, 0.35) 30%,
    rgba(20, 32, 25, 0.12) 60%,
    transparent 75%
  );
  filter: blur(45px);
}

/* Feixe volumétrico sutil que evoca a abertura de um portal ou iluminação teatral */
.hero-atmosphere__beam {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(280px, 40vw, 600px);
  height: 80%;
  background: linear-gradient(
    180deg,
    rgba(52, 211, 153, 0.06) 0%,
    rgba(36, 73, 54, 0.1) 40%,
    transparent 85%
  );
  filter: blur(35px);
}

/* Névoa densa na base para fundir suavemente com as próximas seções */
.hero-atmosphere__mist-base {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 180px;
  background: linear-gradient(
    to top,
    var(--color-bg-primary) 0%,
    rgba(8, 9, 9, 0.85) 45%,
    transparent 100%
  );
}

/* ==========================================================================
   3. TIPOGRAFIA MONUMENTAL (HERO TYPOGRAPHY)
   ========================================================================== */
.hero-typography {
  position: relative;
  z-index: var(--z-content);
  width: 100%;
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding-top: clamp(1.75rem, 5vh, 4rem);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}

.hero-eyebrow {
  margin: 0;
  margin-bottom: clamp(0.5rem, 1.5vh, 1.25rem);
  font-family: var(--font-family-body);
  font-size: clamp(0.7rem, 1.2vw, 0.95rem);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.38em;
  text-transform: uppercase;
  color: var(--color-gold-aged);
  text-shadow:
    0 2px 10px rgba(0, 0, 0, 0.9),
    0 0 16px rgba(183, 154, 96, 0.3);
}

.hero-title {
  margin: 0;
  font-family: var(--font-family-display);
  font-size: clamp(3.2rem, 13vw, 11.5rem);
  font-weight: var(--font-weight-black);
  line-height: 0.88;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #d8dfd9 30%,
    #8c978f 65%,
    #465049 95%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.95));
}

/* ==========================================================================
   4. PERSONAGEM (HERO CHARACTER)
   ========================================================================== */
.hero-character {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-effects);
  width: 100%;
  max-width: min(85vw, 680px);
  height: clamp(380px, 68vh, 760px);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  pointer-events: none;
}

.hero-character__aura {
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(260px, 45vw, 520px);
  height: clamp(260px, 45vw, 520px);
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(52, 211, 153, 0.22) 0%,
    rgba(36, 73, 54, 0.28) 40%,
    transparent 70%
  );
  filter: blur(35px);
  z-index: -1;
}

.hero-character__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  /* Mascara que faz o corte gradativo da base para transparência absoluta */
  mask-image: linear-gradient(
    to bottom,
    black 0%,
    black 72%,
    rgba(0, 0, 0, 0.6) 88%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    black 0%,
    black 72%,
    rgba(0, 0, 0, 0.6) 88%,
    transparent 100%
  );
}

.hero-character__image {
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: bottom center;
  filter: drop-shadow(0 0 25px rgba(20, 32, 25, 0.7));
}

.hero-character__shadow-blend {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(
    to top,
    var(--color-bg-primary) 0%,
    rgba(8, 9, 9, 0.9) 35%,
    transparent 100%
  );
  pointer-events: none;
}

/* ==========================================================================
   5. INDICADOR DE SCROLL (HERO SCROLL INDICATOR)
   ========================================================================== */
.hero-scroll-indicator {
  position: relative;
  z-index: var(--z-ui);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: clamp(1rem, 2.5vh, 1.75rem);
  pointer-events: none;
}

.hero-scroll-indicator__label {
  font-family: var(--font-family-body);
  font-size: 0.65rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-metal-light);
  opacity: 0.75;
}

.hero-scroll-indicator__track {
  width: 1px;
  height: 32px;
  background: linear-gradient(
    to bottom,
    rgba(183, 154, 96, 0.5) 0%,
    rgba(89, 99, 91, 0.2) 100%
  );
  position: relative;
  overflow: hidden;
}

.hero-scroll-indicator__notch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--color-gold-aged) 50%,
    var(--color-green-accent) 100%
  );
  animation: scrollNotchSlide 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

@keyframes scrollNotchSlide {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateY(260%);
    opacity: 0;
  }
}

/* ==========================================================================
   RESPONSIVIDADE E ACESSIBILIDADE
   ========================================================================== */
@media (max-width: 768px) {
  .arrival-hero {
    height: calc(100vh - 44px);
    min-height: calc(100svh - 44px);
  }

  .hero-typography {
    padding-top: 1.25rem;
  }

  .hero-eyebrow {
    letter-spacing: 0.26em;
  }

  .hero-title {
    letter-spacing: 0.05em;
  }

  .hero-character {
    max-width: 94vw;
    height: clamp(320px, 58vh, 460px);
  }

  .hero-scroll-indicator {
    margin-bottom: 0.75rem;
  }

  .hero-scroll-indicator__track {
    height: 24px;
  }
}

@media (min-width: 1440px) {
  .hero-character {
    max-width: 740px;
    height: clamp(560px, 72vh, 840px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-scroll-indicator__notch {
    animation: none;
    top: 30%;
    opacity: 0.8;
  }
}
</style>
