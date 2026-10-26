import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra o ScrollTrigger globalmente uma única vez
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Composable mínimo para ciclo de vida de animações com GSAP e Vue 3.
 * Utiliza gsap.context() para gerenciar o escopo e reverter automaticamente
 * todas as timelines e ScrollTriggers ao desmontar o componente, prevenindo vazamento de memória.
 *
 * @param {import('vue').Ref<HTMLElement | null>} scopeRef - Referência do elemento raiz do componente
 * @param {Function} [initCallback] - Callback opcional executado dentro do gsap.context na montagem
 */
export function useGsap(scopeRef, initCallback) {
  let ctx = null

  onMounted(() => {
    if (typeof initCallback === 'function') {
      ctx = gsap.context((self) => {
        initCallback(self)
      }, scopeRef?.value || undefined)
    }
  })

  onUnmounted(() => {
    if (ctx) {
      ctx.revert()
    }
  })

  return {
    gsap,
    ScrollTrigger,
    getContext: () => ctx
  }
}

export { gsap, ScrollTrigger }
