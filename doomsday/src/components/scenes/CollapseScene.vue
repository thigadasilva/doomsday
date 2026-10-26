<template>
  <section ref="sceneRef" id="collapse-scene" class="scene collapse-scene">
    <div class="scene__inner">
      <span class="scene__tag">Cena 04</span>
      <h2 class="scene__title">The End of Everything</h2>
      <p class="scene__description">
        Clímax visual com fragmentação da realidade, energia e distorções.
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
.collapse-scene {
  /* Identificador visual provisório */
  border-top: 2px solid rgba(183, 154, 96, 0.3);
}
</style>
