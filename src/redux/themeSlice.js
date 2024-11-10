const { createSlice, current } = require("@reduxjs/toolkit")

const initialState={
    theme: JSON.parse(localStorage.getItem("theme"))||"dark"
}



const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        // Action to change the theme
        changeTheme(state, action) {
            state.theme = action.payload;  // Directly update the theme in state
        }
    }
});


export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;