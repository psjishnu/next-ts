// .eslintrc.js
module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
  },
};
