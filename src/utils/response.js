export const ok = (message = 'Success', data = null) => ({
  success: true,
  message,
  data,
});

export const created = (message = 'Created successfully', data = null) => ({
  success: true,
  message,
  data,
});

export const fail = (message = 'Error', data = null) => ({
  success: false,
  message,
  data,
});
