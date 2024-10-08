const validateName = (input, field) => {
    if (!input.trim()) {
      return { valid: false, error: `Please provide a valid ${field}.`, field };
    }
    return { valid: true, field };
  };
  
  const validateDateOfBirth = (input) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(input)) {
      return { valid: false, error: 'Please enter a valid date of birth (yyyy-mm-dd).', field: 'dob' };
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
      return { valid: false, error: 'Please enter a valid phone number (e.g., (000) 000 - 000).', field: 'phone' };
    }
    return { valid: true, field: 'phone' };
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
  
  const validateYesNo = (input, field) => {
    const normalizedInput = input.trim().toLowerCase();
    if (normalizedInput === 'yes' || normalizedInput === 'no') {
      return { valid: true, field: field, value: normalizedInput === 'yes' ? true : false };
    }
    return { valid: false, error: 'Please answer "Yes" or "No".', field: field };
  };
  
  const validateInput = (step, message) => {
    switch (step) {
      case 0:
        return validateName(message, 'firstname');
      case 1:
        return validateName(message, 'lastname');
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
        return validateYesNo(message, 'termsAndConditions');
      case 10:
        return validateYesNo(message, 'emailAsETransfer');
      default:
        return { valid: true };
    }
  };
  
  export default validateInput;