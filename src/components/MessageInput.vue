<template>
  <form id="message-form" @submit.prevent="send">
    <div class="input-group">
      <div v-if="messageToEdit" class="input-group-message-to-edit">
        <p class="edited-message">Edit Message:</p>
        <p class="edited-message">{{ messageToEdit.text }}</p>
      </div>
      <div class="input-group-write-message">
        <input
          type="text"
          v-model="newMessage"
          ref="newMessageInput"
          placeholder="Type here"
          class="input-message"
          :class="{ 'input-disabled': isBotTyping || hasOptions || isDatePicker }"
          :readonly="isBotTyping"
        />
        <button 
          type="submit" 
          title="Send message" 
          class="btn send-message-button" 
          :class="{ 'input-disabled': isBotTyping || hasOptions || isDatePicker }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
          </svg>
        </button>
      </div>
      </div>
  </form>
</template>
  
<script>
import { mapState } from 'vuex';

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
        if (this.messageToEdit && this.newMessage.trim()) {
          this.$emit('editMessage', { id: this.messageToEdit.id, text: this.newMessage });
          this.$emit('editMessageStart', null);
          this.newMessage = '';
        }
        if (this.newMessage.trim()) {
          this.$emit('sendMessage', this.newMessage);
          this.newMessage = '';
        }
      },
    },
    computed: {
      ...mapState({
        messageToEdit: state => state.chats.messageToEdit,
      }),
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
      },
      isDatePicker() {
        if (this.chat && this.chat.length > 0) {
          const lastMessage = this.chat[this.chat.length - 1];
          return lastMessage.type == 'dob';
        } else {
          return false;
        }
      }
    }
  };
  </script>
  
<style scoped>
.input-group {

}

.input-group-message-to-edit {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #28a745; /* Change this color as needed */
  border-radius: 10px;
}

.input-group-write-message {
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

.edited-message-container {

}

.edited-message {
  color: white; /* Change this as needed */
  font-weight: bold;
}
</style>