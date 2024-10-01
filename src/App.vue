<template>
  <div class="chat-wrapper">
    <MessageContainer :conversation="conversation" />
    <MessageInput :conversation="conversation" @sendMessage="sendMessage" />
  </div>
</template>

<script>
import MessageContainer from './components/MessageContainer.vue';
import MessageInput from './components/MessageInput.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    MessageContainer,
    MessageInput
  },
  computed: {
    ...mapGetters(['conversation']),
  },
  methods: {
    ...mapActions(['sendMessage']),
  }
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