const { createSlice, current } = require("@reduxjs/toolkit")

const getInitialTheme = () => {
    if (typeof window !== "undefined") {  //if it is client side
      // Only access localStorage on the client
      return localStorage.getItem("theme") || "dark";
    }
    return "dark"; // Default theme for server-side rendering
  };



  const initialState = {
    theme: getInitialTheme(),
  };



const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        // Action to change the theme
        changeTheme(state, action) {
            state.theme = action.payload;
            if (typeof window !== "undefined") {//if it is client side
              localStorage.setItem("theme", action.payload); // Update localStorage in the browser
            }
          },
    }
});


export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;