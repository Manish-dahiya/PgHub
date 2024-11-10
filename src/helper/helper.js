import { redirect } from "next/navigation";

export const configTheme=(theme)=>{
    const localTheme= JSON.stringify(theme);
    localStorage.setItem("theme",localTheme)
}