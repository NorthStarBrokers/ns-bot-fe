// @ts-nocheck
const mutations = {
    ADD_MESSAGE(state, message) {
      state.chat.push(message);
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
    SET_APPLICATION_ID(state, applicationId) {
      state.applicationId = applicationId;
    },
    SET_OPEN_FLINKS(state, bool) {
      state.flinksModalOpened = bool
    },
    SET_LEAD_ID(state, leadId) {
      state.leadId = leadId
    },
    SET_LEAD_KEY(state, leadKey) {
      state.leadKey = leadKey
    },
    SET_LOGIN_ID(state, loginId) {
      state.loginId = loginId
    },
    SET_ACCOUNT_ID(state, accountId) {
      state.accountId = accountId
    }
  };
  
  export default mutations;