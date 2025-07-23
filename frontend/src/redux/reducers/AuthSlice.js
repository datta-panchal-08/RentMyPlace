import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user:null,
    popup:false,
    isDarkMode:false
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
        removeUser:(state)=>{
            state.user = null;
            state.popup = false;
            state.isDarkMode = false;
        },
        setDarkMode:(state)=>{
           state.isDarkMode = !state.isDarkMode;
        }
    }
});

export const {setUser,removeUser,isPopupVisible,setDarkMode} = AuthSlice.actions;
export default AuthSlice.reducer;