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
    <div v-if="message.type == 'dob'" style="padding-top: 10px;">
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
  emits: ["openModal", "sendOptionAsMessage"],
  data: function () {
    return {
      date: null
    }
  },
  computed: {
    messageClass() {
      return this.message.sender === 'bot' ? 'message-bot' : 'message-user';
    },
    bubbleClass() {
      return this.message.sender === 'bot' ? 'message-bot-bubble' : 'message-user-bubble';
    }
  },
  methods: {
    formatDateAndEmit(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      this.$emit('sendOptionAsMessage', formattedDate)
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