<template>
    <div v-if="message.text.length" :class="messageClass" class="message-wrapper">
      <p :class="bubbleClass" class="message-bubble">
        {{ message.text }}
<!--         <p v-if="message.type == 'termsAndCondtions'" style="font-weight: 500;">
          Please read the <a style="cursor: pointer;">terms</a>
        </p> -->
      </p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: Object,
        required: true,
      },
    },
    computed: {
      messageClass() {
        return this.message.sender === 'bot' ? 'message-bot' : 'message-user';
      },
      bubbleClass() {
        return this.message.sender === 'bot' ? 'message-bot-bubble' : 'message-user-bubble';
      }
    }
  };
  </script>
  
  <style scoped>
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
  </style>