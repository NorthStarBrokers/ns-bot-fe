<template>
    <form id="message-form" @submit.prevent="send">
      <div class="input-group send-message-group">
        <input
          type="text"
          v-model="newMessage"
          ref="newMessageInput"
          placeholder="Write a message..."
          class="input-message"
          :class="{ 'input-disabled': isBotTyping }"
          :readonly="isBotTyping"
        />
        <button 
          type="submit" 
          title="Send message" 
          class="btn send-message-button" 
          :class="{ 'input-disabled': isBotTyping }">
          <i class="bi bi-send"></i>
        </button>
      </div>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newMessage: '',
      };
    },
    props: {
        conversation: {
            type: Array,
            required: true,
        },
    },
    methods: {
      send() {
        if (this.newMessage.trim()) {
          this.$emit('sendMessage', this.newMessage);
          this.newMessage = '';
        }
      }
    },
    computed: {
        isBotTyping() {
            if (this.conversation) {
                return this.conversation.some(message => message.typing);
            } else {
                return false;
            }
        }
    }
  };
  </script>
  
  <style scoped>
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
  }
  
  .send-message-button {
    background-color: #28a745;
    border: none;
    border-radius: 50%;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .send-message-button:hover {
    background-color: #218838;
  }
  
  .send-message-button i {
    color: white;
    font-size: 20px;
  }

  .input-disabled {
    opacity: 0.7;
    cursor: not-allowed;
    filter: blur(1px);
  }
  </style>