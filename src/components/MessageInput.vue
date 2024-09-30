<template>
    <form id="message-form" @submit.prevent="send">
      <div class="input-group send-message-group">
        <input
          v-model="newMessage"
          ref="newMessageInput"
          type="text"
          class="input-message"
          placeholder="Write a message..."
        />
        <button type="submit" class="btn send-message-button" title="Send message">
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
    methods: {
      send() {
        if (this.newMessage.trim()) {
          this.$emit('sendMessage', this.newMessage);
          this.newMessage = '';
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
  </style>