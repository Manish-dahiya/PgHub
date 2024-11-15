const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")


const initialState={
    propertyInfo:{
        status:"idle",
        data:null,
        error:null
    },
    ownerProperties:{
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
export const getOwnersProperties=createAsyncThunk(
    "propertySlice/getOwnersProperties",
    async(ownerId)=>{
        const res= await fetch(`/api/owner/${ownerId}`)
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
        .addCase(getOwnersProperties.pending,(state,action)=>{
            state.ownerProperties.status="pending"
        })
        .addCase(getOwnersProperties.fulfilled,(state,action)=>{
            if(action.payload.success==false){
                state.ownerProperties.status="failed"
                console.log("owner properties from false",action.payload.response)
                state.ownerProperties.error= action.payload.response ; //error message
            }
            else{
                state.ownerProperties.status="success"
                state.ownerProperties.error=null,
                console.log("owner properties from true",action.payload.response)
                state.ownerProperties.data=action.payload.response
            }
        })
    }
})



export default propertySlice.reducer