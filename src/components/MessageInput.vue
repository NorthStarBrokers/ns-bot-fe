<template>
    <form id="message-form" @submit.prevent="send">
      <div class="input-group send-message-group">
        <input
          type="text"
          v-model="newMessage"
          ref="newMessageInput"
          placeholder="Write a message..."
          class="input-message"
          :class="{ 'input-disabled': isBotTyping || hasOptions }"
          :readonly="isBotTyping"
        />
        <button 
          type="submit" 
          title="Send message" 
          class="btn send-message-button" 
          :class="{ 'input-disabled': isBotTyping || hasOptions }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
          </svg>
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
        chat: {
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
        if (this.chat) {
          return this.chat.some(message => message.typing);
        } else {
          return false;
        }
      },
      hasOptions() {
        if (this.chat && this.chat.length > 0) {
          const lastMessage = this.chat[this.chat.length - 1];
          return !!lastMessage.options;
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
    margin-right: 20px;
  }
  
  .send-message-button {
    background-color: #28a745;
    border: none;
    border-radius: 50%;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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