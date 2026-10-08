export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhoneNumber = (phone) => {
  const re = /^\+?[0-9]{10,15}$/;
  return re.test(phone);
};

export const validatePassword = (password) => {
  return password && password.length >= 8;
};

export const sanitizeUser = (user) => {
  const { password, ...rest } = user;
  return rest;
};
