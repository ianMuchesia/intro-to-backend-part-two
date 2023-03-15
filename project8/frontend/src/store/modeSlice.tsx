
import { Palette, PaletteMode } from "@mui/material"
import {createSlice } from "@reduxjs/toolkit"
type GlobalState ={
    mode: PaletteMode
}

const initialState:GlobalState= {
    mode: "dark"
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode : (state)=>{
            state.mode = state.mode === 'light' ? 'dark' : 'light';

        }
    }
})



export default globalSlice