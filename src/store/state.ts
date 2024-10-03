// @ts-nocheck
import termsContent from "./termsContent.js";
import privacyContent from "./privacyContent.js";

const state = {
  conversation: [
    { id: 1, text: "Welcome! I'm your application bot and I'll ask some details about you.", sender: 'bot' },
    { id: 2, text: "What is your first name?", sender: 'bot' },
  ],
  applicantForm: {
    firstname: '',
    lastname: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    termsAndConditions: null,
    emailAsETransfer: null,
    language: 'en',
    source: 'cashdepot',
    source_companyid: 3,
    emp_incometype: "Unemployed",
    loanamount: 300
  },
  currentStep: 0,
  botResponses: {
    0: {
      type: "lastname",
      valid: "Great! Now, what is your last name?",
      invalid: "Please provide a valid first name."
    },
    1: {
      type: "dob",
      valid: "Thanks! What's your date of birth? (YYYY-MM-DD)",
      invalid: "Please provide a valid last name."
    },
    2: {
      type: "email",
      valid: "Got it! Now, could you share your email address?",
      invalid: "The date of birth must be in the format YYYY-MM-DD."
    },
    3: {
      type: "phone",
      valid: "Perfect! What is your phone number? (e.g., (000) 000 - 000)",
      invalid: "Please enter a valid email address."
    },
    4: {
      type: "address",
      valid: "Thanks! Could you share your address?",
      invalid: "Please provide a valid phone number in the format (000) 000 - 000."
    },
    5: {
      type: "city",
      valid: "Awesome! What city do you live in?",
      invalid: "Please enter a valid address."
    },
    6: {
      type: "province",
      valid: "Great! Which province are you in?",
      invalid: "Please provide a valid city."
    },
    7: {
      type: "postalCode",
      valid: "Thanks! What's your postal code? (e.g., A1A1A1)",
      invalid: "Please select a valid province."
    },
    8: {
      type: "termsAndConditions",
      valid: "Do you agree with the terms and conditions?",
      invalid: "Please answer 'Yes' or 'No'."
    },
    9: {
      type: "emailAsETransfer",
      valid: "Finally, is your communications email the same as your e-transfer email? (Yes or No)",
      invalid: "Please answer 'Yes' or 'No'."
    },
    10: {
      valid: "Thank you for completing the form!"
    }
  },
  termsContent: termsContent,
  privacyContent: privacyContent
};

export default state;