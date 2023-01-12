export const log = (message, style = 'color: #02bb55; font-weight: 700') =>
  console.log(`%c🟢 ${message}`, style);

export const error = (message, style = 'color: #f85454; font-weight: 700') =>
  console.error(`%c🔴 ${message}`, style);
