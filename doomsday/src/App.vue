<template>
  <div class="app-container">
    <!-- Header mínimo indicativo de status da infraestrutura -->
    <header class="app-status-bar">
      <div class="app-status-bar__brand">
        <span class="app-status-bar__badge">AVENGERS: DOOMSDAY</span>
        <span class="app-status-bar__phase">Etapa 01 — Infraestrutura & Esqueleto Base</span>
      </div>
      <div class="app-status-bar__tech">
        <span>Vue 3</span>
        <span>•</span>
        <span>Vite</span>
        <span>•</span>
        <span>GSAP + ScrollTrigger</span>
      </div>
    </header>

    <!-- Sequência narrativa das cinco cenas -->
    <main class="scenes-wrapper">
      <ArrivalScene />
      <MaskScene />
      <SovereignScene />
      <CollapseScene />
      <FinaleScene />
    </main>

    <!-- Rodapé estrutural discreto -->
    <footer class="app-footer">
      <p>Avengers: Doomsday — Landing Page Cinematográfica • Base Incremental Ativa</p>
    </footer>
  </div>
</template>

<script setup>
import ArrivalScene from '@/components/scenes/ArrivalScene.vue'
import MaskScene from '@/components/scenes/MaskScene.vue'
import SovereignScene from '@/components/scenes/SovereignScene.vue'
import CollapseScene from '@/components/scenes/CollapseScene.vue'
import FinaleScene from '@/components/scenes/FinaleScene.vue'
</script>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-status-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-ui);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: rgba(8, 9, 9, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border-subtle);
  font-family: var(--font-family-body);
  font-size: var(--font-size-xs);
}

.app-status-bar__brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.app-status-bar__badge {
  font-family: var(--font-family-display);
  font-weight: var(--font-weight-bold);
  color: var(--color-gold-aged);
  letter-spacing: 0.1em;
}

.app-status-bar__phase {
  color: var(--color-metal-light);
  display: none;
}

@media (min-width: 640px) {
  .app-status-bar__phase {
    display: inline;
  }
}

.app-status-bar__tech {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--color-metal-light);
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.scenes-wrapper {
  flex: 1;
  padding-top: 48px; /* Compensação da status bar fixa */
}

.app-footer {
  padding: var(--spacing-lg) var(--spacing-md);
  text-align: center;
  font-size: var(--font-size-xs);
  color: var(--color-metal-gray);
  border-top: 1px solid var(--color-border-subtle);
  background-color: var(--color-bg-primary);
}
</style>
