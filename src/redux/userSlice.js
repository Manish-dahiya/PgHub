const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")

const initialState={
    user:{
        data:{},
        status:"idle",
        error:null
    }
}



export const loginUser= createAsyncThunk(
    "userSlice/loginUser",
    async(formData)=>{
        console.log("req has been sent")
        const response= await fetch("/api/user/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        });
        return response.json();
    }
)
export const registerUser= createAsyncThunk(
    "userSlice/registerUser",
    async(formData)=>{
        const response= await fetch("/api/user/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        return response.json();
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
            state.user.error=action.payload.response
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.user.status="success"
            state.user.error=null
            state.user.data=action.payload.response
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.user.status="rejected"
            // state.error=action.payload.response || "An error occurred during login.";
        })
        .addCase(registerUser.pending,(state,action)=>{
            state.user.status="pending"
            state.user.error=action.payload.response
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.user.status="success"
            state.user.data= action.payload.response
            state.user.error=null
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.user.status="rejected"
            // state.error=action.payload.response || "An error occurred during login.";
        })
    }
})


export default userSlice.reducer
