// @ts-nocheck
import termsContent from "./termsContent.js";
import privacyContent from "./privacyContent.js";

const state = {
  chat: [
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
      valid: "Thanks! Please select your date of birth:",
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
      invalid: "Please provide a valid city.",
      options: [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Northwest Territories",
        "Nova Scotia",
        "Nunavut",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon"
      ]
    },
    7: {
      type: "postalCode",
      valid: "Thanks! What's your postal code? (e.g., A1A1A1)",
      invalid: "Please select a valid province."
    },
    8: {
      type: "termsAndConditions",
      valid: "Please read our Terms and Conditions and our Privacy Policy. Do you accept them?",
      invalid: "Please answer 'Yes' or 'No'.",
      options: ["Yes", "No"]
    },
    9: {
      type: "emailAsETransfer",
      valid: "Is your communications email the same as your e-transfer email?",
      invalid: "Please answer 'Yes' or 'No'.",
      options: ["Yes", "No"]
    },
    10: {
      type: "loanamount",
      valid: "How much would you like to borrow?",
      invalid: "Please answer 'Yes' or 'No'.",
      options: ["$300", "$500", "$700", "$1000", "$1500", "$2000", "$2500", "$3000"]
    },
    11: {
      type: "emp_incometype",
      valid: "What is your employment situation?",
      invalid: "Please answer 'Yes' or 'No'.",
      options: [
        "Full time",
        "Part time",
        "Self employed",
        "Retired",
        "Disability",
        "Social security",
        "Unemployed"
      ]
    },
    12: {
      valid: "Loading Flinks..."
    }
  },
  termsContent: termsContent,
  privacyContent: privacyContent,
  applicationId: null,
  flinksModalOpened: false,
  leadId: null,
  leadKey: null,
  loginId: null,
  accountId: null
};

export default state;