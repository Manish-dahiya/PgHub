import { redirect } from "next/navigation";

export const changeTheme=(theme)=>{
    const localTheme= JSON.stringify(theme);
    localStorage.setItem("theme",localTheme)
    
}