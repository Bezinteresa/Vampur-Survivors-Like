import { createApp } from 'vue'
import App from './App.vue'
import { vDragScroll, vSwipe } from './ui/gestures'
import './style.css'

createApp(App).directive('swipe', vSwipe).directive('drag-scroll', vDragScroll).mount('#app')
