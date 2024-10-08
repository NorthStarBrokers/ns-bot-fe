<template>
  <div v-if="message.text.length" :class="messageClass" class="message-wrapper">
    <div :class="bubbleClass" class="message-bubble">
      <p v-if="message.type == 'termsAndConditions'">
        Please read our <a @click="$emit('openModal', 'terms')">Terms and Conditions</a> and our 
        <a @click="$emit('openModal', 'privacy')">Privacy Policy</a>. Do you accept them?
      </p>
      <p v-else>
        {{ message.text }}
      </p>
    </div>
    <h4 v-if="message.options" class="options-header">Select an option:</h4>
    <div v-if="message.options" class="options-container">
      <button 
        v-for="(option, index) in message.options"
        class="option-button"
        @click="$emit('sendOptionAsMessage', option)"
        :key="index"
      >
        {{ option }}
      </button>       
    </div>
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
  emits: ["openModal", "sendOptionAsMessage"],
  computed: {
    messageClass() {
      return this.message.sender === 'bot' ? 'message-bot' : 'message-user';
    },
    bubbleClass() {
      return this.message.sender === 'bot' ? 'message-bot-bubble' : 'message-user-bubble';
    }
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
  font-weight: 500;
  padding: 0px;
}
p {
  font-weight: 500;
}
.message-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}

.message-user {
  align-items: flex-end;
}

.message-bot {
  align-items: flex-start;
}

.message-bubble {
  padding: 12px 18px;
  border-radius: 20px;
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

.options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 5px;
  max-width: 70%;
  /* align-self: self-end;
  flex-direction: row-reverse; */
}

.options-header {
  font-weight: 500;
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  font-style: italic;
  /* align-self: self-end; */
}

.option-button {
  background-color: #1e7d32;
  padding: 8px;
  margin: 2px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: 600;
}

.option-button:hover {
  background-color: #28a745;
}
</style>