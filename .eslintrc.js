module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    'semi': ['error', 'always'],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'vue/order-in-components': 'error',
    'no-undef': 'error',
  },
};