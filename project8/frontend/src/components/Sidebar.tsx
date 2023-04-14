import React, {useState, useEffect} from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettings,
  TrendingUpOutlined,
  PieChartOutlined,
  AdminPanelSettingsOutlined 
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from '../assets/profile.png'
interface Props {
    drawerWidth:string;
    isSideBarOpen:boolean;
    isNoneMobile:boolean;
    setIsSideBarOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Client Facing",
      icon: null,
    },
    {
      text: "Products",
      icon: <ShoppingCartOutlined />,
    },
    {
      text: "Customers",
      icon: <Groups2Outlined />,
    },
    {
      text: "Transactions",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "Geography",
      icon: <PublicOutlined />,
    },
    {
      text: "Sales",
      icon: null,
    },
    {
      text: "Overview",
      icon: <PointOfSaleOutlined />,
    },
    {
      text: "Daily",
      icon: <TodayOutlined />,
    },
    {
      text: "Monthly",
      icon: <CalendarMonthOutlined />,
    },
    {
      text: "Breakdown",
      icon: <PieChartOutlined />,
    },
    {
      text: "Management",
      icon: null,
    },
    {
      text: "Admin",
      icon: <AdminPanelSettingsOutlined />,
    },
    {
      text: "Performance",
      icon: <TrendingUpOutlined />,
    },
  ];
const Sidebar = ({drawerWidth, isSideBarOpen, setIsSideBarOpen, isNoneMobile}:Props) => {

    const {pathname } = useLocation();
    //to determine the path we are on
    const [ active, setActive] = useState("")

    const navigate = useNavigate()

    const theme:any = useTheme()

    //everytime we have the pathname changing we are going to set the active value to the active page we are on
    useEffect(()=>{
        setActive(pathname.substring(1))
    },[pathname])



  return(
    <Box
    component="nav">
        {isSideBarOpen && (
            <Drawer
            open={isSideBarOpen}
            onClose={()=>setIsSideBarOpen(false)}
            variant = 'persistent'
            anchor="left"
            sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper":{
                    color: theme.palette.secondary[200],
                    backgroundColor:theme.palette.background.alt,
                    boxSizing:'border-box',
                    borderWidth: isNoneMobile ? 0 : "2px",
                    width: drawerWidth
                }
            }}
            >
                <Box width="100%">
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween color={theme.palette.secondary.main}>
                            <Box display='flex' alignItems="center" gap="0.5rem">
                                <Typography variant="h4" fontWeight="bold">
                                    ECOMVISION
                                </Typography>
                            </Box>
                            {!isNoneMobile && (
                                <IconButton onClick={()=>setIsSideBarOpen(!isSideBarOpen)}>
                                    <ChevronLeft/>
                                </IconButton>
                            )}
                        </FlexBetween>
                    </Box>
                    <List>
                       {navItems.map(({text, icon})=>{
                        if(!icon){
                            return (
                                <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                {text}
                              </Typography>
                            )
                        }
                        const lcText = text.toLowerCase();
                        return (
                            <ListItem key={text} disablePadding>
                              <ListItemButton
                                onClick={() => {
                                  navigate(`/${lcText}`);
                                  setActive(lcText);
                                }}
                                sx={{
                                  backgroundColor:
                                    active === lcText
                                      ? theme.palette.secondary[300]
                                      : "transparent",
                                  color:
                                    active === lcText
                                      ? theme.palette.primary[600]
                                      : theme.palette.secondary[100],
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    ml: "2rem",
                                    color:
                                      active === lcText
                                        ? theme.palette.primary[600]
                                        : theme.palette.secondary[200],
                                  }}
                                >
                                  {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                     );
                       })} 
                    </List>
                </Box>
            </Drawer>
        )}
    </Box>
  )
};

export default Sidebar;
