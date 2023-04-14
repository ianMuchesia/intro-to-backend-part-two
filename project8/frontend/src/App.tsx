import {useMemo} from 'react'
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material"
import { Palette, createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme"
import { useAppSelector } from "./hooks"
import Dashboard from './scenes/dashboard' 
import Layout from './scenes/layout'
import {BrowserRouter , Routes , Route, Navigate } from "react-router-dom"




function App() {

  const mode = useAppSelector((state)=>state.mode.mode)

  const theme = useMemo (()=>createTheme(themeSettings(mode)), [mode])


  return (
    <div className="app">
      <BrowserRouter>
   <ThemeProvider theme= {theme}>
    {/* it resets everything in terms of your css */}
    <CssBaseline />
   <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>
   </Routes>
   </ThemeProvider>
   </BrowserRouter>
    </div>
  )
}

export default App
