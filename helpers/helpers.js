const isValidEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (regex.exec(email)) {
    return true;
  } else {
    return false;
  }
};

const isValidPhoneNumber = (number) => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;

  if (regex.exec(number)) {
    return true;
  } else {
    return false;
  }
};

const isValidPostcode = (postcode) => {
  const regex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;

  if (regex.exec(postcode)) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isValidPhoneNumber,
  isValidEmail,
  isValidPostcode,
};
