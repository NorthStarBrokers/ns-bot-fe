<template>
  <div class="flinks-container" id="form-flinks">
    <errorContainer v-if="errorController"></errorContainer>
    <loadingComponent v-if="loading"></loadingComponent>
    <div v-show="!loading && !errorController && funding === 'on'" ref="flinksConnectRef"></div>
    <div v-if="!loading && !errorController && funding === 'off'">
      <h2 v-if="!loading && !errorController" class="primary-color-dark">{{ $t('not-funding.title') }}</h2>
      <p class="primary-color">{{ $t('not-funding.description') }}</p>
    </div>
  </div>
</template>

<script>
import './Flinks.scss'
import loadingComponent from './LoadingSpinner.vue'
import errorContainer from './error-container.vue'
import { jerryAPI, mapFormToBody } from '../../services/jerry-service'
import { fundLead } from '../../services/split-service'
import { cleanLocalStorage, saveLocalStorage } from '../../core/helper/local-storage-functions'
import { redirectWithParams } from '../../core/helper/redirection'
import { appHubUrlParams } from '../../core/helper/mappers'
import { routing } from '../../core/helper/route-list'
import { host, Environment } from '../../core/config/environment/host'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'FlinksComponent',
  components: {
    loadingComponent,
    errorContainer
  },
  data() {
    return {
      url: 'https://toolbox-iframe.private.fin.ag', // flinks dev pruebas
      thanksPage: '',
      funding: 'on',
      tag: null,
      flinksConnectRef: null,
      errorController: false,
      iframe: null,
      loading: true,
      loginId: null,
      accountId: null,
    }
  },
  computed: {
    ...mapState({
      brand: state => state.brand.getBrand,
      leadId: state => state.chats.leadId,
      leadKey: state => state.chats.leadKey,
      loginId: state => state.chats.leadId,
      accountId: state => state.chats.leadKey,
    }),
    locale() {
      // return this.$i18n.locale; *INSTALAR I18N*
      return 'en'
    }
  },
  mounted() {
    window.addEventListener('message', this.handleFlinks);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.handleFlinks);
  },
  methods: {
    ...mapActions(['getBrand']),
    handleFlinks(e) {
      console.log(e.data);

      if (e.data.loginId) {
        this.loginId = e.data.loginId;
      }

      if (e.data.accountId) {
        this.accountId = e.data.accountId;
      }
    },
    generateIframeUrl() {
      if (host.environment === Environment.production) {
        this.url = `https://${this.brand.flinks}-iframe.private.fin.ag/v2/`;
      }
      let iframeUrl = `${this.url}?theme=light&desktopLayout=true&features=TransactionHistory,AccountNumberandAccountInfo&backgroundColor=ffffff&institutionFilterEnable=true&headerEnable=false&language=${this.locale}&accountSelectorEnable=true&showAllAccounts=true`;

      if (host.environment !== Environment.production) {
        iframeUrl += '&demo=true';
      }

      console.log(iframeUrl)

      return iframeUrl;
    },
    createIframe() {
      this.iframe = document.createElement('iframe');
      this.iframe.src = this.generateIframeUrl();
      this.iframe.height = 672;

      const flinksConnectDiv = this.$refs.flinksConnectRef;
      if (flinksConnectDiv) {
        flinksConnectDiv.appendChild(this.iframe);
      }
    },
    updateThanksPage() {
      console.log('hey')
      const redirectThanks = this.locale === 'en' ? routing.apply.children.thanks.name : routing.apply.children.merci.name;
      let mainPath = 'http://localhost:5173';
      console.log(mainPath);
/*       switch (host.environment) {
        case Environment.local:
          mainPath = 'http://localhost:5173';
          break;
        case Environment.development:
          mainPath = `https://form-dev.${this.brand.url}`;
          break;
        default:
          mainPath = `https://form.${this.brand.url}`;
          break;
      } */
      const baseUrl = `${mainPath}/${redirectThanks}`;
      console.log(baseUrl);
      const searchParams = new URLSearchParams();
      console.log(searchParams);
      if (this.leadId) {
        searchParams.append('leadid', this.leadId.toString());
      }
      if (this.leadKey) {
        searchParams.append('tag', this.leadKey);
      }
      console.log(searchParams);

      this.thanksPage = `${baseUrl}?${searchParams.toString()}`;

      console.log(this.thanksPage)
    },
    updateIframe() {
      if (this.iframe) {
        this.iframe.src = this.generateIframeUrl();
      }
    },
    async loadingToggle(value) {
      setTimeout(() => {
        this.loading = value;
      }, 10000);
    }
  },
  async mounted() {
    try {
      /* // this.funding = (await fundLead()).data; no reviso el funding, lo dejo en on para pruebas
      this.funding = 'on';
      const mappedJerry = mapFormToBody(this.form, this.locale, this.brand, this.funding === 'on');
      console.log(mappedJerry)
      const leadInfo = (await jerryAPI('add', this.applicationId, mappedJerry)).data;

      this.leadId = leadInfo.id; // sacar de create-applicant
      this.tag = leadInfo.key; // sacar de create-applicant
      */
      /* 
      if (this.funding === 'off') {
        cleanLocalStorage();
        this.loading = false;
        setTimeout(() => {
          redirectWithParams('https://leads.gaglianosoftware.com', appHubUrlParams(this.form, this.brand.appHubId, this.leadId.toString(), this.locale));
        }, 5000);
        return;
      } */

      // saveLocalStorage('funding', 'true');
      this.loading = true;
      this.updateThanksPage();
      this.createIframe();
      this.loadingToggle(false);
    } catch (error) {
      this.errorController = true;
    }
  },
  watch: {
    locale() {
      this.updateThanksPage();
      this.updateIframe();
      this.loading = true;
      this.loadingToggle(false);
    }
  },
  beforeDestroy() {
    if (this.iframe) {
      this.iframe.remove();
    }
  }
}
</script>