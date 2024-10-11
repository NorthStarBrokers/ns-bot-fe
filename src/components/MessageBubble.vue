<template>
  <div v-if="message.text.length" :class="messageClass" class="message-wrapper">
    <div style="display: flex;"> 
      <a v-if="message.sender == 'user'" @click="$emit('editMessageStart', message)" class="edit-button">
        <svg style="display: flex;" fill="#8c8c8c" height="18px" width="18px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 348.882 348.882" xml:space="preserve" stroke="#8c8c8c"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M333.988,11.758l-0.42-0.383C325.538,4.04,315.129,0,304.258,0c-12.187,0-23.888,5.159-32.104,14.153L116.803,184.231 c-1.416,1.55-2.49,3.379-3.154,5.37l-18.267,54.762c-2.112,6.331-1.052,13.333,2.835,18.729c3.918,5.438,10.23,8.685,16.886,8.685 c0,0,0.001,0,0.001,0c2.879,0,5.693-0.592,8.362-1.76l52.89-23.138c1.923-0.841,3.648-2.076,5.063-3.626L336.771,73.176 C352.937,55.479,351.69,27.929,333.988,11.758z M130.381,234.247l10.719-32.134l0.904-0.99l20.316,18.556l-0.904,0.99 L130.381,234.247z M314.621,52.943L182.553,197.53l-20.316-18.556L294.305,34.386c2.583-2.828,6.118-4.386,9.954-4.386 c3.365,0,6.588,1.252,9.082,3.53l0.419,0.383C319.244,38.922,319.63,47.459,314.621,52.943z"></path> <path d="M303.85,138.388c-8.284,0-15,6.716-15,15v127.347c0,21.034-17.113,38.147-38.147,38.147H68.904 c-21.035,0-38.147-17.113-38.147-38.147V100.413c0-21.034,17.113-38.147,38.147-38.147h131.587c8.284,0,15-6.716,15-15 s-6.716-15-15-15H68.904c-37.577,0-68.147,30.571-68.147,68.147v180.321c0,37.576,30.571,68.147,68.147,68.147h181.798 c37.576,0,68.147-30.571,68.147-68.147V153.388C318.85,145.104,312.134,138.388,303.85,138.388z"></path> </g> </g></svg>
      </a>
      <div :class="bubbleClass" class="message-bubble">
        <p v-if="message.type == 'termsAndConditions'">
          Please read our <a @click="$emit('openModal', 'terms')">Terms and Conditions</a> and our 
          <a @click="$emit('openModal', 'privacy')">Privacy Policy</a>. Do you accept them?
        </p>
        <p v-else>
          {{ message.text }}
        </p>
      </div>
    </div>
    <h4 v-if="message.options && (isLastMessage || isEditing)" class="options-header">Select an option:</h4>
    <div v-if="message.options && (isLastMessage || isEditing)" class="options-container">
      <button 
        v-for="(option, index) in message.options"
        class="option-button"
        @click="handleSelectOption(option)"
        :key="index"
      >
        {{ option }}
      </button>       
    </div>
    <div v-if="message.type == 'dob' && (isLastMessage || isEditing)" style="padding-top: 10px;">
      <VueDatePicker 
        v-model="date" 
        inline 
        auto-apply
        dark
        :month-change-on-scroll="false"
        :enable-time-picker="false"
        @date-update="formatDateAndEmit"
      />
    </div>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { mapState } from 'vuex';

export default {
  components: {
    VueDatePicker
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  emits: ["openModal", "sendOptionAsMessage", 'editMessageStart', 'editOption'],
  data: function () {
    return {
      date: null
    }
  },
  computed: {
    ...mapState({
      chat: state => state.chats.chat,
      messageToEdit: state => state.chats.messageToEdit
    }),
    messageClass() {
      return this.message.sender === 'bot' ? 'message-bot' : 'message-user';
    },
    bubbleClass() {
      return this.message.sender === 'bot' ? 'message-bot-bubble' : 'message-user-bubble';
    },
    isLastMessage() {
      return this.message.id == this.chat[this.chat.length - 1].id;
    },
    isEditing() {
      return this.messageToEdit != null;
    }
  },
  methods: {
    handleSelectOption(option) {  
      if (this.isEditing) {
        this.$emit('editOption', {id: this.messageToEdit.id, text: option})
        this.$emit('editMessageStart', null);
      } else {
        this.$emit('sendOptionAsMessage', option)
      }
    },
    formatDateAndEmit(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      this.handleSelectOption(formattedDate)
    }
  }
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

.edit-button {
  align-self: center;
  padding-right: 10px;
}

.edit-button:hover {
  background-color: transparent;
}

.dp__main :deep(.dp__theme_dark) {
  --dp-background-color: #16221f; /* Main background color */
    --dp-text-color: #fff; /* White text for contrast */
    --dp-hover-color: #1e7d32; /* Darker green for hover effect */
    --dp-hover-text-color: #fff; /* Keep text white for readability */
    --dp-hover-icon-color: #28a745; /* Brighter green for icon hover */
    --dp-primary-color: #28a745; /* Main primary color (green) */
    --dp-primary-disabled-color: #61a8ea; /* Keep as is for contrast */
    --dp-primary-text-color: #fff; /* Ensure text is readable */
    --dp-secondary-color: #a9a9a9; /* Neutral secondary color */
    --dp-border-color: #1e7d335d; /* Match border with hover color */
    --dp-menu-border-color: #1e7d335d; /* Same for menu border */
    --dp-border-color-hover: #28a74650; /* Brighter hover border */
    --dp-border-color-focus: #28a74650; /* Focus border as brighter green */
    --dp-disabled-color: #737373; /* Keep disabled elements neutral */
    --dp-disabled-color-text: #d0d0d0; /* Light text for disabled state */
    --dp-scroll-bar-background: #16221f; /* Match background */
    --dp-scroll-bar-color: #1e7d32; /* Match scroll bar with hover */
    --dp-success-color: #28a745; /* Use your palette's green */
    --dp-success-color-disabled: #61a8ea; /* Contrast for disabled success */
    --dp-icon-color: #959595; /* Neutral icon color */
    --dp-danger-color: #e53935; /* Keep red for danger */
    --dp-marker-color: #e53935; /* Keep red for markers */
    --dp-tooltip-color: #3e3e3e; /* Keep neutral for tooltip */
    --dp-highlight-color: rgb(40 167 69 / 20%); /* Green highlight */
    --dp-range-between-dates-background-color: var(--dp-hover-color, #1e7d32); /* Hover color */
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff); /* Text for range hover */
    --dp-range-between-border-color: var(--dp-hover-color, #1e7d32); /* Border for range hover */
}
</style>