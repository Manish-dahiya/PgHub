import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice"
import userReducer from "./userSlice"
import propertyReducer from "./propertySlice"
export const store = configureStore({
    reducer:{
        getTheme:themeReducer,
        userData:userReducer,
        propertyData:propertyReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Disables the middleware
        }),
})


