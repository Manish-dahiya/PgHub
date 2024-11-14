import { redirect } from "next/navigation";

export const configTheme=(theme)=>{
    const localTheme= JSON.stringify(theme);
    localStorage.setItem("theme",localTheme)
}

export const decodeToken = (token) => {
    try {
      const arrayToken = token.split('.');
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      return tokenPayload;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };