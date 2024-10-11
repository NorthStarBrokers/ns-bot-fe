<template>
  <form id="message-form" @submit.prevent="send">
    <div class="input-group">
      <div 
        v-if="messageToEdit" 
        class="input-group-message-to-edit" 
        ref="messageToEditContainer" 
        :style="{ width: inputWidth + 'px' }"
      >
        <div class="edit-header">
          <p style="font-weight: bold; color: white">Edit Message:</p>
          <button 
            type="button" 
            class="close text-white" 
            @click="$emit('editMessageStart', null)"
          >
            &times;
          </button>
        </div>
        <p class="edited-message">{{ messageToEdit.text }}</p>
      </div>
      <div class="input-group-write-message">
        <input
          type="text"
          v-model="newMessage"
          ref="newMessageInput"
          placeholder="Type here"
          class="input-message"
          :class="{ 'input-disabled': isBotTyping || hasOptions || isDatePicker, 'top-borders-without-edit': !messageToEdit }"
          :readonly="isBotTyping"
        />
        <a 
          type="submit" 
          title="Send message" 
          class="btn send-message-button" 
          :class="{ 'input-disabled': isBotTyping || hasOptions || isDatePicker }"
        >
          <svg v-if="!messageToEdit" viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>send</title><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" height="24" width="24"  viewBox="0 0 24 24"><path fill="currentColor" d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"></path></svg>
        </a>
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
        inputWidth: 0,
      };
    },
    props: {
        chat: {
            type: Array,
            required: true,
        },
    },
    mounted() {
      this.setInputWidth();
      window.addEventListener('resize', this.setInputWidth); // update on window resize
    },
    updated() {
      this.setInputWidth(); // update the width if the DOM changes
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setInputWidth);
    },
    methods: {
      setInputWidth() {
        this.inputWidth = this.$refs.newMessageInput.offsetWidth;
      },
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
        if (this.messageToEdit && !this.messageToEdit.options) {
          return false;
        }

        if (this.chat && this.chat.length > 0) {
          const lastMessage = this.chat[this.chat.length - 1];
          return !!lastMessage.options;
        } else {
          return false;
        }
      },
      isDatePicker() {
        if (this.messageToEdit && !this.messageToEdit.options) {
          return false;
        }

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
  align-items: center;
  padding: 10px 0;
  margin-top: 10px;
  background-color: #1a2822;
  border-radius: 10px;
}

.input-group-message-to-edit {
  padding: 10px;
  background-color: #28a745;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.input-group-write-message {
  display: flex;
}

.input-message {
  flex: 1;
  border: none;
  padding: 15px;
  font-size: 16px;
  color: white;
  background-color: #16221f;
  margin-right: 10px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.top-borders-without-edit {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.send-message-button {
  border: none;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #28a745;
}

.send-message-button:hover {
  background-color: transparent;
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

.edited-message {
  color: white;
  font-weight: bold;
  background-color: #208537;
  padding: 5px;
  padding-left: 10px;
  border-radius: 5px;
}

.edit-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.close {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: white;
  border: none;
  background-color: transparent;
  align-items: center;
}
</style>