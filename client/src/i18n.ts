import { createI18n } from 'vue-i18n'
import enCommon from './locales/en/common.json'
import enAuth from './locales/en/auth.json'
import enMenu from './locales/en/menu.json'
import enFooter from './locales/en/footer.json'
import enValidation from './locales/en/validation.json'
import enButton from './locales/en/button.json'
import enMessage from './locales/en/message.json'

import viCommon from './locales/vi/common.json'
import viAuth from './locales/vi/auth.json'
import viMenu from './locales/vi/menu.json'
import viFooter from './locales/vi/footer.json'
import viValidation from './locales/vi/validation.json'
import viButton from './locales/vi/button.json'
import viMessage from './locales/vi/message.json'

const i18n = createI18n({
    legacy: false, // Use Composition API mode
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            common: enCommon,
            auth: enAuth,
            menu: enMenu,
            footer: enFooter,
            validation: enValidation,
            button: enButton,
            message: enMessage
        },
        vi: {
            common: viCommon,
            auth: viAuth,
            menu: viMenu,
            footer: viFooter,
            validation: viValidation,
            button: viButton,
            message: viMessage
        }
    }
})

export default i18n
