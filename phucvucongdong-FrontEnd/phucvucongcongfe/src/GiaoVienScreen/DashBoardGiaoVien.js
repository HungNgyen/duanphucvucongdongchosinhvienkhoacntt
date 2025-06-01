




import React, { useState } from "react";
import { AppBar, Toolbar, Button, Box, IconButton, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GiaoVienScreen from "./GiaoVienScreen";
import LichSuHoatDongGiaoVienScreen from "./LichSuHoatDongGiaoVienScreen";
import LopPhuTrach from "./LopPhuTrach";
import HoatDongCaNhanGiaoVien from "./HoatDongCaNhanGiaoVien";

const DashBoardGiaoVien = () => {
    const [currentTab, setCurrentTab] = useState("giaovien");
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const renderContent = () => {
        switch (currentTab) {
            case "lichsuhoatdonggiaovien":
                return <LichSuHoatDongGiaoVienScreen />;
            case "lopphutrach":
                return <LopPhuTrach />;
            case "giaovientaohoatdongcanhan":
                return <HoatDongCaNhanGiaoVien />;
            default:
                return <GiaoVienScreen />;
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
        handleMenuClose();
    };

    const handleChangePassword = () => {
        navigate("/changepassword");
        handleMenuClose();
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
                    <Button color="inherit" onClick={() => setCurrentTab("lopphutrach")}>
                        Lớp Phụ Trách
                    </Button>
                    <Button color="inherit" onClick={() => setCurrentTab("giaovien")}>
                        Hoạt Động
                    </Button>
                    <Button color="inherit" onClick={() => setCurrentTab("giaovientaohoatdongcanhan")}>
                        Tạo Hoạt Động Cá Nhân
                    </Button>
                    <Button color="inherit" onClick={() => setCurrentTab("lichsuhoatdonggiaovien")}>
                        Lịch Sử
                    </Button>
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
                        <MenuItem onClick={handleChangePassword}>Đổi mật khẩu</MenuItem>
                        <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                            Đăng xuất
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Nội dung + Footer nằm trong Box scroll */}
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ flexGrow: 1, padding: "20px", backgroundColor: "#f4f4f4", overflowY: "auto" }}>
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

export default DashBoardGiaoVien;