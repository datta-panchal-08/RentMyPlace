import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    popup:false
}

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        isPopupVisible:(state)=>{
            state.popup = !state.popup;
        },
        removeUser:(state,action)=>{
            state.user = null;
        }
    }
});

export const {setUser,removeUser,isPopupVisible} = AuthSlice.actions;
export default AuthSlice.reducer;