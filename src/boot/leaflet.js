import { boot } from 'quasar/wrappers'
import L from 'leaflet'

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(L)
})
