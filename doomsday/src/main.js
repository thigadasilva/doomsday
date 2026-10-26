import { createApp } from 'vue'
import App from './App.vue'

// Importação ordenada dos estilos globais
import './styles/tokens.css'
import './styles/global.css'
import './styles/scenes.css'

const app = createApp(App)
app.mount('#app')
