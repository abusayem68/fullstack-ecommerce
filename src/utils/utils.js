export const objectToQueryString = (obj) => {
  let queryString = '';
  const arr = Object.keys(obj).map((key) =>
    obj[key].length > 0
      ? obj[key]
          .map((value) => `${key}_like=${encodeURIComponent(value)}`)
          .join('&')
      : ''
  );
  if (arr.length > 1) {
    queryString = arr.join('&');
    return queryString;
  }
  if (arr.length === 1) {
    queryString = arr.join('');
    return queryString;
  }
  return queryString;
};

export const validateEmail = (email) => {
  // Regular expression for email validation
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};
export const validatePhoneNumber = (phoneNumber) => {
  // Regular expression for phone number validation
  const bdPhoneNumberRegex = /^(?:(?:\+|00)88|01)?\d{11}$/;

  if (bdPhoneNumberRegex.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
};
