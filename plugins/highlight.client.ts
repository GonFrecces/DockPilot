import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark-reasonable.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('hljs', hljs)
})
