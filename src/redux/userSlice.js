import { decodeToken } from "@/helper/helper";

const { createAsyncThunk, createSlice,current } = require("@reduxjs/toolkit")

const initialState={
    user:{
        data:  typeof window!="undefined" && JSON.parse(localStorage.getItem("user"))? decodeToken(JSON.parse(localStorage.getItem("user"))):null,   
        status:"idle",
        error:null
    },
    emailData:{
        response:"Idle",
        status:"idle",
        error:null
    }
}

export const loginUser = createAsyncThunk(
    "userSlice/loginUser",
    async (formData, { rejectWithValue }) => {
        const res = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    }
);

export const registerUser= createAsyncThunk(
    "userSlice/registerUser",
    async(formData)=>{
        const res= await fetch("/api/user/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        return res.json();
    }
)


export const sendEmail= createAsyncThunk(
    "userSlice/sendEmail",
    async(formData)=>{
        const res= await fetch("/api/user/emailOwner",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        return res.json();
    }
)


const userSlice= createSlice({
    initialState,
    name:"userSlice",
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state,action)=>{
            state.user.status="pending"
            
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            if(action.payload.success==false){
                state.user.error=action.payload.response //message from api
                state.user.status="failed"
                
            }
            else{
                state.user.status="success"
                state.user.error=null
                let token= JSON.stringify(action.payload.response)
                localStorage.setItem("user",token)
            }
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.user.status = "rejected";
            console.log("got again rejected")
            state.user.error = action.error.message || "An error occurred during login.";
        })
        .addCase(registerUser.pending,(state,action)=>{
            state.user.status="pending"
           
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            if(action.payload.success==false){
                state.user.error=action.payload.response //message from api
                state.user.status="failed"
               
            }
            else{
                state.user.status="success"
                state.user.error=null
                let token= JSON.stringify(action.payload.response)
                if(typeof window!="undefined"){
                    localStorage.setItem("user",token)
                }
                // state.user.data=decodeToken(JSON.parse(localStorage.getItem("user")))
            }
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.user.status="rejected"
            // state.error=action.payload.response || "An error occurred during login.";
        })
        .addCase(sendEmail.pending,(state)=>{
            state.emailData.status="pending"
            state.emailData.response="processing"
        })
        .addCase(sendEmail.fulfilled,(state,action)=>{
            if(action.payload.success==false){
                 state.emailData.status="failed"
            state.emailData.response="error in sending email"
            }else{
                state.emailData.response=action.payload.response
                state.emailData.status="success"
                console.log(action.payload.response)
            }
        })
    }
})


export default userSlice.reducer
