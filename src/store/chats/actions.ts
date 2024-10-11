// @ts-nocheck
import axios from "../../services/axios.service";
import validateInput from "./validateInput";

const actions = {
  async sendMessage({ state, commit, dispatch }, message) {
    commit('ADD_MESSAGE', { id: Date.now(), text: message, sender: 'user' });
    commit('ADD_MESSAGE', { id: 'typing-indicator', text: '', sender: 'bot', typing: true });

    const validationResult = await dispatch('validateInput', { step: state.currentStep, message });

    setTimeout(async () => {
      const typingIndex = state.chat.findIndex(m => m.id === 'typing-indicator');
      if (typingIndex !== -1) state.chat.splice(typingIndex, 1);

      const botResponse = state.botResponses[state.currentStep];

      commit('ADD_MESSAGE', {
        id: Date.now(), 
        text: validationResult.valid ? botResponse.valid : botResponse.invalid, 
        sender: 'bot', 
        type: botResponse.type,
        options: botResponse.options ? botResponse.options : ""
      });

      if (validationResult.valid) {
        commit('UPDATE_FORM_FIELD', { field: validationResult.field, value: message });  
      }

      if (state.currentStep === 12) {
        let createApplicationRes;

        try {
          createApplicationRes = await axios.post("/api/chats/create-applicant", state.applicantForm);
/*           createApplicationRes = {
            data: {
              "phone": "(000) 000 - 000",
              "city": "sdfgbdfgb",
              "postalCode": "a1a1a1",
              "address": "gfdghsdf",
              "emailAsETransfer": true,
              "termsAndConditions": true,
              "email": "hsdfh@a.com",
              "dateOfBirth": "2000-02-01T00:00:00.000Z",
              "firstName": "dfgjdgf",
              "lastName": "sdf",
              "province": "Northwest Territories",
              "id": "76faba4f-9b00-41f9-8f5d-0a35de57a1ff",
              "updatedAt": "2024-10-08T19:13:17.553Z",
              "createdAt": "2024-10-08T19:13:17.553Z",
              "leadId": 663,
              "leadKey": "b74bd41e-b052-4727-afbf-22964df5e027"
            }
          } */
        } catch (e) {
          console.error(e)
        }

        commit("SET_OPEN_FLINKS", true)
        commit('SET_LEAD_ID', createApplicationRes?.data.leadId)
        commit('SET_LEAD_KEY', createApplicationRes?.data.leadKey)

        // para updateLead: http://localhost:5173/thanks?leadid=663&tag=b74bd41e-b052-4727-afbf-22964df5e027&demo=true&loginId=3a5e11e0-d59e-4a78-8128-08dcc1ceb429&accountId=db418500-ae7f-467f-be0b-0f9f1aa18b6c&institution=FlinksCapital
      }

      commit('INCREMENT_STEP');
    }, 1500);
  },

  async editMessageStart({ state, commit }, message) {
    commit('SET_MESSAGE_TO_EDIT', message)
  },

  async editMessage({ state, commit, dispatch }, message) {
    commit('EDIT_MESSAGE', { id: message.id, text: message.text });

    /* const validationResult = await dispatch('validateInput', { step: message.step, text: message.text });

     if (validationResult.valid) {
      commit('UPDATE_FORM_FIELD', { field: validationResult.field, value: message });  
      commit('SET_MESSAGE_TO_EDIT', null)
    } */
  },

  async updateLead({ state, commit, dispatch }, updateLeadObj) {
    await axios.post("/api/lead/update-lead", updateLeadObj);
  },

  setLoginId({ state, commit, dispatch }, loginId) {
    commit("SET_LOGIN_ID", loginId)
  },

  setAccountId({ state, commit, dispatch }, accountId) {
    commit("SET_ACCOUNT_ID", accountId)
  },

  validateInput({ state }, { step, message }) {
    return validateInput(step, message);
  }
};

export default actions;