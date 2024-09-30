import { createStore } from 'vuex';
import axios from "../services/axios.service";

const getBotResponse = async (message, currentStep) => {
  const response = await axios.post("/api/chats/create-applicant", {
    message,
    currentStep
  });
  return response.data.bot_response;
};

export default createStore({
  state: {
    conversation: [
      { id: 1, text: 'Welcome! How can I help you today?', sender: 'bot' }
    ],
    applicantForm: {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      phoneNumber: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      eTransferSameAsEmail: null
    },
    currentStep: 0, // To track which field the bot is currently prompting for
    botResponses: {
      0: {
        valid: "Great! Now, what is your last name?",
        invalid: "Please provide a valid first name."
      },
      1: {
        valid: "Thanks! What's your date of birth? (dd/mm/yyyy)",
        invalid: "Please provide a valid last name."
      },
      2: {
        valid: "Got it! Now, could you share your email address?",
        invalid: "The date of birth must be in the format dd/mm/yyyy."
      },
      3: {
        valid: "Perfect! What is your phone number? (e.g., (000) 000 - 000)",
        invalid: "Please enter a valid email address."
      },
      4: {
        valid: "Thanks! Could you share your address?",
        invalid: "Please provide a valid phone number in the format (000) 000 - 000."
      },
      5: {
        valid: "Awesome! What city do you live in?",
        invalid: "Please enter a valid address."
      },
      6: {
        valid: "Great! Which province are you in?",
        invalid: "Please provide a valid city."
      },
      7: {
        valid: "Thanks! What's your postal code? (e.g., A1A1A1)",
        invalid: "Please select a valid province."
      },
      8: {
        valid: "Finally, is your communications email the same as your e-transfer email? (Yes or No)",
        invalid: "Please enter a valid postal code (e.g., A1A1A1)."
      },
      9: {
        valid: "Thank you for completing the form!",
        invalid: "Please answer 'Yes' or 'No'."
      }
    }
  },
  mutations: {
    ADD_MESSAGE(state, message) {
      state.conversation.push(message);
    },
    UPDATE_FORM_FIELD(state, { field, value }) {
      state.applicantForm[field] = value;
    },
    INCREMENT_STEP(state) {
      state.currentStep++;
    },
  },
  actions: {
    async sendMessage({ state, commit, dispatch }, message) {
      // Validate the message based on the current step
      const validationResult = await dispatch('validateInput', { step: state.currentStep, message });
      
      if (!validationResult.valid) {
        // If validation fails, get the invalid response
        const botResponse = state.botResponses[state.currentStep].invalid;
        commit('ADD_MESSAGE', { id: Date.now(), text: botResponse, sender: 'bot' });
        commit('KEEP_STEP'); // Stay on the same step
      } else {
        // If validation succeeds, update the form, send user message, and move to the next step
        commit('UPDATE_FORM_FIELD', { field: validationResult.field, value: message });
        commit('ADD_MESSAGE', { id: Date.now(), text: message, sender: 'user' });

        const botResponse = state.botResponses[state.currentStep].valid;
        commit('ADD_MESSAGE', { id: Date.now(), text: botResponse, sender: 'bot' });

        commit('INCREMENT_STEP'); // Move to the next step
      }
      
      if (state.currentStep == 9) {
        await submitForm(state);
      }
    },

    validateInput({ state }, { step, message }) {
      switch (step) {
        case 0:
          return validateName(message, 'firstName');
        case 1:
          return validateName(message, 'lastName');
        case 2:
          return validateDateOfBirth(message);
        case 3:
          return validateEmail(message);
        case 4:
          return validatePhoneNumber(message);
        case 5:
          return validateTextField(message, 'address');
        case 6:
          return validateTextField(message, 'city');
        case 7:
          return validateTextField(message, 'province');
        case 8:
          return validatePostalCode(message);
        case 9:
          return validateYesNo(message);
        default:
          return { valid: true };
      }
    }
  },
  getters: {
    conversation: (state) => state.conversation,
    formData: (state) => state.applicantForm,
  }
});

const submitForm = async ({ state }) => {
  const formData = state.applicantForm;
  await axios.post("/api/chats/submit-form", formData);
};

const validateName = (input, field) => {
  if (!input.trim()) {
    return { valid: false, error: `Please provide a valid ${field}.`, field };
  }
  return { valid: true, field };
};

const validateDateOfBirth = (input) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(input)) {
    return { valid: false, error: 'Please enter a valid date of birth (dd/mm/yyyy).', field: 'dob' };
  }
  return { valid: true, field: 'dob' };
};

const validateEmail = (input) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(input)) {
    return { valid: false, error: 'Please provide a valid email address.', field: 'email' };
  }
  return { valid: true, field: 'email' };
};

const validatePhoneNumber = (input) => {
  const regex = /^\(\d{3}\) \d{3} - \d{3}$/;
  if (!regex.test(input)) {
    return { valid: false, error: 'Please enter a valid phone number (e.g., (000) 000 - 000).', field: 'phoneNumber' };
  }
  return { valid: true, field: 'phoneNumber' };
};

const validateTextField = (input, field) => {
  if (!input.trim()) {
    return { valid: false, error: `Please provide a valid ${field}.`, field };
  }
  return { valid: true, field };
};

const validatePostalCode = (input) => {
  const regex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
  if (!regex.test(input)) {
    return { valid: false, error: 'Please enter a valid postal code (e.g., A1A1A1).', field: 'postalCode' };
  }
  return { valid: true, field: 'postalCode' };
};

const validateYesNo = (input) => {
  const normalizedInput = input.trim().toLowerCase();
  if (normalizedInput === 'yes' || normalizedInput === 'no') {
    return { valid: true, field: 'eTransferSameAsEmail', value: normalizedInput === 'yes' };
  }
  return { valid: false, error: 'Please answer "Yes" or "No".', field: 'eTransferSameAsEmail' };
};