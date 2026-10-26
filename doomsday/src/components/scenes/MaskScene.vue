<template>
  <section ref="sceneRef" id="mask-scene" class="scene mask-scene">
    <div class="scene__inner">
      <span class="scene__tag">Cena 02</span>
      <h2 class="scene__title">The Man Behind the Mask</h2>
      <p class="scene__description">
        Close-up da máscara metálica e iluminação verde mística.
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
.mask-scene {
  /* Identificador visual provisório */
  border-top: 2px solid rgba(89, 99, 91, 0.3);
}
</style>
