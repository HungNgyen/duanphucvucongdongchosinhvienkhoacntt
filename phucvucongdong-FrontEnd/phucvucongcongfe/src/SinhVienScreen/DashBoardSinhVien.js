







import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SinhVienScreen from "./SinhVienScreen";
import LichSuScreen from "./LichSuScreen";
import MinhChungHoatDongScreen from "./MinhChungHoatDongScreen";
import HoatDongCaNhanSinhVien from "./HoatDongCaNhanSinhVien";

const DashBoardSinhVien = () => {
    const [currentTab, setCurrentTab] = useState("sinhvien");
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const renderContent = () => {
        switch (currentTab) {
            case "lichsu":
                return <LichSuScreen />;
            case "minhchung":
                return <MinhChungHoatDongScreen />;
            case "hoatdongcanhansinhvien":
                return <HoatDongCaNhanSinhVien />;
            default:
                return <SinhVienScreen />;
        }
    };

    const handleLogout = () => {
        navigate("/");
    };

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {

        navigate("/profile");
        // Xử lý điều hướng đến trang Profile nếu cần
    };

    const handleChangepassword = () => {

        navigate("/changepassword");
        // Xử lý điều hướng đến trang Profile nếu cần
    };


    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <AppBar position="static" sx={{ backgroundColor: "#007bff" }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <a>
                            <img
                                src="/Assets/LHULogoVN.png"
                                alt="Lac Hong University Logo"
                                style={{ width: "60px", marginRight: "20px" }}
                            />
                        </a>
                    </Box>
                    <Button color="inherit" onClick={() => setCurrentTab("sinhvien")}>
                        Hoạt Động
                    </Button>
                    <Button color="inherit" onClick={() => setCurrentTab("lichsu")}>
                        Lịch Sử
                    </Button>
                    <Button color="inherit" onClick={() => setCurrentTab("hoatdongcanhansinhvien")}>
                        Tạo Hoạt Động Cá Nhân
                    </Button>
                    {/* <Button color="inherit" onClick={handleLogout}>
                        Thoát
                    </Button> */}

                    {/* Avatar + Menu */}
                    <IconButton onClick={handleAvatarClick} sx={{ ml: 2 }}>
                        <Avatar alt="User Avatar" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: {
                                backgroundColor: "#333",
                                color: "#fff",
                                mt: 1,
                            },
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem onClick={handleProfileClick}>Thông tin cá nhân</MenuItem>
                        <MenuItem onClick={handleChangepassword}>Đổi mật khẩu</MenuItem>
                        {/* <MenuItem onClick={handleMenuClose}>Messages</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Preferences</MenuItem> */}
                        <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                            Đăng xuất
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Nội dung + Footer nằm trong Box scroll */}
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ flexGrow: 1, padding: "20px", backgroundColor: "#f4f4f4" }}>
                    {renderContent()}
                </Box>

                {/* Footer */}
                <Box component="footer" sx={{ backgroundColor: "#007bff", color: "#fff", textAlign: "center", py: 2 }}>
                    <Typography variant="body2">
                        © 2025 Hệ Thống Quản Lý Phục Vụ Cộng Đồng.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default DashBoardSinhVien;
