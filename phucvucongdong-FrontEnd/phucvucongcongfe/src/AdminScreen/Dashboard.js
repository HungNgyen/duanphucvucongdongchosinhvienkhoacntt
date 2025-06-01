





import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Typography, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TeacherAccountScreen from "./TeacherAccountScreen";
import StudentAccountScreen from "./StudentAccountScreen";

const Dashboard = () => {
    const [content, setContent] = useState("Dashboard");
    const [openSidebar, setOpenSidebar] = useState(true); // Mặc định mở sidebar

    const renderContent = () => {
        switch (content) {
      
            case "TeacherAccount":
                return <TeacherAccountScreen />;
            case "StudentAccount":
                return <StudentAccountScreen />;
            default:
                return <StudentAccountScreen />;
        }
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            {/* Nút menu để mở sidebar */}
            <IconButton
                sx={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}
                onClick={() => setOpenSidebar(!openSidebar)}
            >
                {openSidebar ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            {/* Sidebar */}
            {openSidebar && (
                <Box
                    sx={{
                        width: "170px",
                        backgroundColor: "#1976d2",
                        padding: "40px",
                        transition: "0.3s",
                        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
                        height: "1500px"
                    }}
                >
                    <Typography variant="h6" sx={{ color: "#ffffff" }}>
                        ADMINISTRATOR
                    </Typography>
                    <List>
                        {/* <ListItem button onClick={() => setContent("Dashboard")}>
                            <DashboardIcon sx={{ marginLeft: "-40px", marginRight: "10px", color: "#ffffff" }} />
                            <ListItemText primary="Dashboard" sx={{ color: "#ffffff" }} />
                        </ListItem> */}
                        <ListItem button onClick={() => setContent("TeacherAccount")}>
                            <SchoolIcon sx={{ marginLeft: "-40px", marginRight: "10px", color: "#ffffff" }} />
                            <ListItemText primary="Tài khoản giáo viên" sx={{ "& .MuiListItemText-primary": { color: "#ffffff" } }} />
                        </ListItem>
                        <ListItem button onClick={() => setContent("StudentAccount")}>
                            <PeopleIcon sx={{ marginLeft: "-40px", marginRight: "10px", color: "#ffffff" }} />
                            <ListItemText primary="Tài khoản sinh viên" sx={{ "& .MuiListItemText-primary": { color: "#ffffff" } }} />
                        </ListItem>
                    </List>
                    <List>
                        <ListItem button onClick={() => window.location.href = "/"}>
                            <ExitToAppIcon sx={{ marginLeft: "-40px", marginRight: "10px", color: "#ffffff" }} />
                            <ListItemText primary="Đăng xuất" sx={{ "& .MuiListItemText-primary": { color: "#ffffff" } }} />
                        </ListItem>
                    </List>
                </Box>
            )}

            {/* Nội dung chính */}
            <Box sx={{ flex: 1, padding: "25px", backgroundColor: "#f4f6f8", transition: "0.3s" }}>
                {renderContent()}
            </Box>
        </Box>
    );
};

export default Dashboard;