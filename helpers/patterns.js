const namePattern = /^[A-Za-z ]+$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

const patterns = { namePattern, emailPattern, phonePattern };

module.exports = patterns;
