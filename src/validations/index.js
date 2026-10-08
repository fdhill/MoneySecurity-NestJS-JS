export const createUserRules = {
  email: { type: 'email', required: true },
  password: { type: 'string', minLength: 8, required: true },
  name: { type: 'string', minLength: 2, required: true },
  phoneNumber: { type: 'string', pattern: /^\+?[0-9]{10,15}$/, required: false },
};

export const updateUserRules = {
  name: { type: 'string', minLength: 2, required: false },
  phoneNumber: { type: 'string', pattern: /^\+?[0-9]{10,15}$/, required: false },
};
