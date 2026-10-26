<template>
  <section ref="sceneRef" id="finale-scene" class="scene finale-scene">
    <div class="scene__inner">
      <span class="scene__tag">Cena 05</span>
      <h2 class="scene__title">The Name</h2>
      <p class="scene__description">
        Desfecho minimalista, revelação do título e transição de encerramento.
      </p>
      <div class="scene__placeholder">
        [Estrutura base pronta — Aguardando implementação visual e animações]
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useGsap } from '@/composables/useGsap'

const sceneRef = ref(null)

useGsap(sceneRef)
</script>

<style scoped>
.finale-scene {
  /* Identificador visual provisório */
  border-top: 2px solid rgba(89, 99, 91, 0.3);
}
</style>
