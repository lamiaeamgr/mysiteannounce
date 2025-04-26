// src/redux/reducers/themeReducer.js
const initialState = {
  theme: localStorage.getItem("theme") === "dark" ? "dark" : "light", // Check for valid theme in localStorage
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); // Save the new theme
      return { ...state, theme: newTheme };
    default:
      return state;
  }
};

export default themeReducer;
