<template>
  <div class="chat-wrapper">
    <div
      class="message-container"
      ref="messageContainer"
      @scroll.passive="loadMoreMessages"
    >
      <div
        v-for="(message, index) in conversation"
        :key="index"
        :class="{
          'message-bot': message.sender == 'bot',
          'message-user': message.sender == 'user',
        }"
        class="message-wrapper"
      >
        <p
          class="message-bubble"
          :class="{
            'message-bot-bubble': message.sender == 'bot',
            'message-user-bubble': message.sender == 'user',
          }"
        >
          {{ message.text }}
        </p>
      </div>
    </div>

    <form id="message-form" @submit.prevent="send">
      <div class="input-group send-message-group">
        <input
          v-model="newMessage"
          ref="newMessageInput"
          type="text"
          class="input-message"
          placeholder="Write a message..."
        />
        <button
          type="submit"
          class="btn send-message-button"
          title="Send message"
        >
          <i class="bi bi-send"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      newMessage: ''
    };
  },
  computed: {
    ...mapGetters(['conversation'])
  },
  methods: {
    ...mapActions(['sendMessage']),
    send() {
      if (this.newMessage.trim()) {
        this.sendMessage(this.newMessage);
        this.newMessage = '';
        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const messageContainer = this.$refs.messageContainer;
        messageContainer.scrollTop = messageContainer.scrollHeight;
      });
    }
  },
  updated() {
    this.scrollToBottom();
  }
};
</script>

<style scoped>
.chat-wrapper {
  background-color: #1a2822;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.message-container {
  background-color: #121f1a;
  color: white;
  overflow-y: auto;
  padding: 15px;
  border-radius: 10px;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.message-wrapper {
  display: flex;
  align-items: center;
}

.message-user {
  justify-content: flex-end;
}

.message-bot {
  justify-content: flex-start;
}

.message-bubble {
  padding: 12px 18px;
  border-radius: 20px;
  font-weight: 500;
  max-width: 70%;
  word-wrap: break-word;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease-in-out;
}

.message-user-bubble {
  background-color: #28a745;
  color: white;
  border-bottom-right-radius: 5px;
}

.message-bot-bubble {
  background-color: #16221f;
  color: white;
  border-bottom-left-radius: 5px;
}

.input-group {
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin-top: 10px;
  background-color: #1a2822;
  border-radius: 10px;
}

.input-message {
  flex: 1;
  border-radius: 20px;
  border: none;
  padding: 15px;
  font-size: 16px;
  color: white;
  background-color: #16221f;
  margin-right: 10px;
  transition: all 0.3s ease;
}

.input-message::placeholder {
  color: #a9a9a9;
}

.send-message-button {
  background-color: #28a745;
  border: none;
  border-radius: 50%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.send-message-button:hover {
  background-color: #218838;
}

.send-message-button i {
  color: white;
  font-size: 20px;
}
</style>