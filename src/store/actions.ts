// @ts-nocheck
import axios from "../services/axios.service";
import validateInput from "./validateInput";

const actions = {
  async sendMessage({ state, commit, dispatch }, message) {
    commit('ADD_MESSAGE', { id: Date.now(), text: message, sender: 'user' });
    commit('ADD_MESSAGE', { id: 'typing-indicator', text: '', sender: 'bot', typing: true });

    const validationResult = await dispatch('validateInput', { step: state.currentStep, message });

    console.log(validationResult);

    setTimeout(async () => {

      const typingIndex = state.conversation.findIndex(m => m.id === 'typing-indicator');
      if (typingIndex !== -1) state.conversation.splice(typingIndex, 1);

      const botResponse = state.botResponses[state.currentStep];

      commit('ADD_MESSAGE', {
        id: Date.now(), 
        text: validationResult.valid ? botResponse.valid : botResponse.invalid, 
        sender: 'bot', 
        type: botResponse.type
      });

      if (validationResult.valid) {
        commit('UPDATE_FORM_FIELD', { field: validationResult.field, value: message });  
        commit('INCREMENT_STEP');
      }

      if (state.currentStep === 11) {
        await axios.post("/api/chats/create-applicant", state.applicantForm);
        commit('RESET_STEP');
      }
    }, 1500);
  },

  validateInput({ state }, { step, message }) {
    return validateInput(step, message);
  }
};

export default actions;