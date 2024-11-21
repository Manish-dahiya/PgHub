const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")


const initialState={
    propertyInfo:{
        status:"idle",
        data:null,
        error:null,
        totalCount:null
    },
    ownerProperties:{
        status:"idle",
        data:null,
        error:null
    },
    totalPropertyInfo:{
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
// export const getPropertiesByPagination=createAsyncThunk(
//     "propertySlice/getPropertiesByPagination",
//     async(pgNo)=>{
//         const res= await fetch(`/api/properties/${pgNo}`,{method:"GET"})
//         return res.json();
//     }
// )
export const getPropertiesByPagination = createAsyncThunk(
    "propertySlice/getPropertiesByPagination",
    async ({ pgNo, filters }) => {
      // Construct the query parameters
      const queryParams = new URLSearchParams(filters).toString();
  
      const res = await fetch(`/api/properties/${pgNo}?${queryParams}`, { method: "GET" });
      
      if (!res.ok) {
        throw new Error("Failed to fetch properties");
      }
  
      return res.json();
    }
  );




export const getTotalPropertiesCount=createAsyncThunk(
    "propertySlice/getTotalPropertiesCount",
    async()=>{
        const res= await fetch(`/api/properties`)
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
                state.ownerProperties.error= action.payload.response ; //error message
            }
            else{
                state.ownerProperties.status="success"
                state.ownerProperties.error=null,
            
                state.ownerProperties.data=action.payload.response
            }
        })
        .addCase(getPropertiesByPagination.pending,(state,action)=>{
              state.propertyInfo.status="pending"
        })
        .addCase(getPropertiesByPagination.fulfilled,(state,action)=>{
            if(action.payload.success==false){
                state.propertyInfo.status="failed"
        

                state.propertyInfo.error= action.payload.response ; //error message
            }
            else{
                state.propertyInfo.status="success"
                state.propertyInfo.error=null,
                state.propertyInfo.data=action.payload.response
                state.propertyInfo.totalCount=action.payload.totalCount
        
            }
        })
        .addCase(getTotalPropertiesCount.pending,(state)=>{
            state.totalPropertyInfo.status="pending"
        })
        .addCase(getTotalPropertiesCount.fulfilled,(state,action)=>{
            state.totalPropertyInfo.data= action.payload.response
        })
    }
})



export default propertySlice.reducer