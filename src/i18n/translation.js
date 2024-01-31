import i18n from "@/i18n";
import { nextTick } from "vue";
import { setFormattedDateLocale } from "@/composables/useFormattedDate";

const Translation = {
  defaultLocale: import.meta.env.VITE_DEFAULT_LOCALE,
  supportedLocales: import.meta.env.VITE_SUPPORTED_LOCALES,

  isLocaleSupported(locale) {
    return this.supportedLocales.split(",").includes(locale);
  },

  async switchLanguage(newLocale) {
    if (!i18n.global.availableLocales.includes(newLocale)) {
      const messages = await import(`@/i18n/locales/${newLocale}.json`);
      i18n.global.setLocaleMessage(newLocale, messages.default);
    }

    i18n.global.locale.value = newLocale;
    document.querySelector("html").setAttribute("lang", newLocale);
    await localStorage.setItem("user-locale", newLocale);
    await setFormattedDateLocale(newLocale);

    return nextTick();
  },

  getDefaultLocale() {
    const persistedLocale = localStorage.getItem("user-locale");
    if (this.isLocaleSupported(persistedLocale)) {
      return persistedLocale;
    }

    const locale = window.navigator.language || this.defaultLocale;
    const localeNoRegion = locale.split("-")[0];

    if (this.isLocaleSupported(locale)) {
      return locale;
    }

    if (this.isLocaleSupported(localeNoRegion)) {
      return localeNoRegion;
    }

    return this.defaultLocale;
  },
};

export default Translation;
