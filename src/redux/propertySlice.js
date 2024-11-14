const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")


const initialState={
    propertyInfo:{
        status:"idle",
        data:null,
        error:null
    }
}

export const addNewProperty=createAsyncThunk(
    "propertySlice/addNewProperty",
    async(formData)=>{
        const res= await fetch("/api/owner/properties",{
            method:"POST",
            body:formData //no need to convert it into stringify since it also contains images
        })

        return res.json();
    }
)

const propertySlice= createSlice({
    initialState,
    name:"propertySlice",
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addNewProperty.pending,(state)=>{
            state.propertyInfo.status="pending"

        })
        .addCase(addNewProperty.fulfilled,(state,action)=>{
            if(action.payload.success==false){
                state.propertyInfo.status="failed"
                state.propertyInfo.error= action.payload.response ; //error message
            }
            else{
                state.propertyInfo.status="success"
                state.propertyInfo.error=null,
                state.propertyInfo.data=action.payload.response
            }
        })
    }
})



export default propertySlice.reducer