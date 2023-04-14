import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { PaletteMode } from '@mui/material';
import FlexBetween from "./FlexBetween";
import { setMode } from "../store/modeSlice";
import { ThemeOptions } from "../@types/pallette";
import profile from "../assets/profile.png";
import { useAppDispatch } from "../hooks";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
interface Props {

  isSideBarOpen:boolean;
  
  setIsSideBarOpen:React.Dispatch<React.SetStateAction<boolean>>;
}
const Navbar = ({
  isSideBarOpen, setIsSideBarOpen
}:Props) => {
  const dispatch = useAppDispatch();
  const theme = useTheme() as  ThemeOptions;

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* Left side */}
        <FlexBetween>
          <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
       >
            <InputBase  placeholder="Search..."/>
            <IconButton>
                <Search/>
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
            <IconButton onClick={()=>{dispatch(setMode())}}
            >
                {theme.palette.mode === "dark"?(
                    <DarkModeOutlined sx={{fontSize :"25px"}}/>
                ):(
                    <LightModeOutlined sx={{fontSize :"25px"}}/>
                )}
            </IconButton>
            <IconButton>
                <SettingsOutlined/>
            </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
