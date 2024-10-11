<template>
  <div class="chat-wrapper">
    <MessageContainer :chat="chat" @openModal="handleModal" @sendOptionAsMessage="sendMessage" @editMessageStart="editMessageStart" @editOption="editMessage" />
    <MessageInput :chat="chat" @sendMessage="sendMessage" @editMessage="editMessage" @editMessageStart="editMessageStart" />
    <Modal v-if="showTermsModal" title="Terms and Conditions" :content="termsContent" @closemodal="showTermsModal = false" />
    <Modal v-if="showPrivacyModal" title="Privacy Policy" :content="privacyContent" @closemodal="showPrivacyModal = false" />
    <FlinksModal v-if="showFlinksModal" title="Flinks" @closemodal="showFlinksModal = false" />
  </div>
</template>

<script>
import FlinksModal from './components/flinks/FlinksModal.vue';
import MessageContainer from './components/MessageContainer.vue';
import MessageInput from './components/MessageInput.vue';
import Modal from "./components/Modal.vue";
import { mapGetters, mapActions, mapState } from 'vuex';
import { brandList } from './core/helper/brand-list';

export default {
  components: {
    MessageContainer,
    MessageInput,
    Modal,
    FlinksModal
  },
  data: function() {
    return {
      showTermsModal: false,
      showPrivacyModal: false,
      showFlinksModal: false
    }
  },
  computed: {
    ...mapState({
      flinksModalOpened: state => state.chats.flinksModalOpened,
      leadId: state => state.chats.leadId,
      leadKey: state => state.chats.leadKey,
      loginId: state => state.chats.loginId,
      accountId: state => state.chats.accountId,
    }),
    ...mapGetters({
      chat: 'chats/chat',
      termsContent: 'chats/termsContent', 
      privacyContent: 'chats/privacyContent'
    }),
  },
  mounted() {
    this.setBrand(brandList[2])
  },  
  mounted() {
    window.addEventListener('message', this.handleFlinks);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.handleFlinks);
  },
  methods: {
    ...mapActions({
      sendMessage: 'chats/sendMessage',
      editMessageStart: 'chats/editMessageStart',
      editMessage: 'chats/editMessage',
      setBrand: 'brands/setBrand',
      setLoginId: 'chats/setLoginId',
      setAccountId: 'chats/setAccountId',
      updateLead: "chats/updateLead"
    }),
    handleFlinks(e) {
      if (e.data.step == 'REDIRECT') {
        this.setLoginId(e.data.loginId);
        this.setAccountId(e.data.accountId);

        this.updateLead({
          leadid: this.leadId,
          tag: this.leadKey,
          loginid: this.loginId,
          accountid: this.accountId,
        })
      }
    },
    handleModal(modalType) {
      if (modalType === 'terms') {
        this.openTermsModal();
      } else if (modalType === 'privacy') {
        this.openPrivacyModal();
      }
    },
    openTermsModal() {
      this.showTermsModal = true;
    },
    openPrivacyModal() {
      this.showPrivacyModal = true;
    },
    openFlinksModal() {
      this.showFlinksModal = true;
    },
  },
  watch: {
    flinksModalOpened(opened) {
      if (opened) {
        this.openFlinksModal();
      }
    }
  },
};
</script>

<style scoped>
.chat-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100vw - 60px);
  height: calc(100vh - 60px);
  max-width: 1200px;
  max-height: 1000px;
  padding: 20px;
  background-color: #1a2822;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>