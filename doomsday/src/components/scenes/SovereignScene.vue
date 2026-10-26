<template>
  <section ref="sceneRef" id="sovereign-scene" class="scene sovereign-scene">
    <div class="scene__inner">
      <span class="scene__tag">Cena 03</span>
      <h2 class="scene__title">The Sovereign</h2>
      <p class="scene__description">
        Composição de corpo inteiro em arquitetura monumental com profundidade e parallax.
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
.sovereign-scene {
  /* Identificador visual provisório */
  border-top: 2px solid rgba(20, 32, 25, 0.5);
}
</style>
