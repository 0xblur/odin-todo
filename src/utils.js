export function generateRandomHEXColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export function genUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
