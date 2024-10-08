import { brandList } from './brand-list'
import type { BrandModel } from '../interfaces/brand-model'
import store from '../../store';
// import { useI18n, type ComposerTranslation } from 'vue-i18n'
import { Lang } from '../interfaces/lang-model'
import { FormProvince } from './form-dropdown-list'
import { host, Environment } from '../config/environment/host'
import { NS_URL } from './const-variables'

const favicon = document.getElementById('favicon') as HTMLLinkElement

export const evaluateRouting = () => {
  const brandStore = store.getters['brand']
  // const { locale } = useI18n({ useScope: 'global' })
  const locale = {
    value: 'en'
  }

  const path = window.location.origin
  const query = window.location.search
  const params = new URLSearchParams(query)

  const querySource = params.get('source')
  let source = path
  let brand: BrandModel | undefined = undefined

  if (host.environment !== Environment.production) {
    source = path.includes('localhost') ? 'cash-depot' : path
    if (querySource) {
      brand = brandList.find((item) => querySource === item.slug)
    }
    if (!brand) {
      brand = brandList.find((item) => source.includes(item.slug))
    }
    if (!brand) {
      window.location.href = NS_URL
      return
    }
  } else {
    brand = brandList.find((item) => path.includes(item.slug))
    if (!brand) {
      window.location.href = NS_URL
      return
    }
  }
  const queryLang = params.get('lang')
  if (queryLang && (queryLang === Lang.en || queryLang === Lang.fr)) locale.value = queryLang

  brandStore.setBrand(brand)
  favicon.href = brand.favicon
  document.title = brand.name + ' - Form'
}

export const replaceKeys = (text: string, replacements: Record<string, string>): string => {
  return Object.keys(replacements).reduce((acc, key) => {
    const regex = new RegExp(`\\[${key}\\]`, 'g')
    return acc.replace(regex, replacements[key])
  }, text)
}

export const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export const getProvince = (province: string) => {
  const provinceKey = Object.keys(FormProvince).find((key) => key.split('-')[0].trim() === province)
  return provinceKey ?? undefined
}

/* 
esto parece que es para traducir cada parrafo de los terminos y condiciones segun el idioma
export const termsPrivacyModalConfiguration = (
  type: 'terms' | 'privacy',
  t: ComposerTranslation
): { title: string; button: string; description: string } => {
  const brandStore = store.getters['brand']
  const title = type === 'terms' ? t('form.terms.terms-conditions') : t('form.terms.privacy-policy')
  const button = t('form.terms.button-back-application')
  const descriptions = {
    terms: [
      t('form.policies.terms-conditions.notice'),
      t('form.policies.terms-conditions.warning'),
      t('form.policies.terms-conditions.termsAndConditions'),
      t('form.policies.terms-conditions.acceptance'),
      t('form.policies.terms-conditions.electronicPresentment'),
      t('form.policies.terms-conditions.classAction'),
      t('form.policies.terms-conditions.documentation'),
      t('form.policies.terms-conditions.electronicSignature')
    ],
    privacy: [
      t('form.policies.privacy-policy.introduction'),
      t('form.policies.privacy-policy.informationSecurity'),
      t('form.policies.privacy-policy.internalLimitedAccess'),
      t('form.policies.privacy-policy.sharingDataWithThirdParties'),
      t('form.policies.privacy-policy.appHubDataSharing'),
      t('form.policies.privacy-policy.phoneCallSmsConsent'),
      t('form.policies.privacy-policy.emailConsent'),
      t('form.policies.privacy-policy.dataRetention'),
      t('form.policies.privacy-policy.userRights'),
      t('form.policies.privacy-policy.cookiesAndTracking'),
      t('form.policies.privacy-policy.contactInformation')
    ]
  }

  const brand = brandStore.getBrand
  const replacements = {
    KEY: brand.name,
    URL: brand.url,
    MAIL: brand.mail
  }

  const description = descriptions[type].map((text) => replaceKeys(text, replacements)).join('\n\n')
  return {
    title,
    description,
    button
  }
}
 */