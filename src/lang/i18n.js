// eslint-disable-next-line import/no-extraneous-dependencies
import { createI18n } from 'vue-i18n'

import messages from './index'

const i18n = createI18n({
  legacy: false,
  globalInjection: true, // 全局生效$t
  locale: localStorage.getItem('lang') || 'zh_cn',
  messages
})

export default i18n
