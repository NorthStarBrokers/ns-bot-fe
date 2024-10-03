// @ts-nocheck
const mutations = {
    ADD_MESSAGE(state, message) {
      state.conversation.push(message);
    },
    UPDATE_FORM_FIELD(state, { field, value }) {
      state.applicantForm[field] = value.toLowerCase() == 'yes' ? true : value.toLowerCase() == 'no' ? false : value;
    },
    INCREMENT_STEP(state) {
      state.currentStep++;
    },
    RESET_STEP(state) {
      state.currentStep = 0;
    },
  };
  
  export default mutations;