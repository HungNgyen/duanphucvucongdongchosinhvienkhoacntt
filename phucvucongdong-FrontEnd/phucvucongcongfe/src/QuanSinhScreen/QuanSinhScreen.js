








import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CategoryIcon from "@mui/icons-material/Category";
import MenuIcon from "@mui/icons-material/Menu";
import HoatDongComponent from "./HoatDongComponent";
import TieuChiComponent from "./TieuChiComponent";
import DanhMucComponent from "./DanhMucComponent";
import HoatDongDetail from "./HoatDongDetail";
import { useNavigate } from "react-router-dom";
import ThongKe from "./ThongKe";
const QuanSinhScreen = () => {
    const [currentTab, setCurrentTab] = useState("hoatdong");
    const [openMenu, setOpenMenu] = useState(true);
    const navigate = useNavigate();
    const renderContent = () => {
        switch (currentTab) {
            case "hoatdong":
                return <HoatDongComponent />;
            case "tieuchi":
                return <TieuChiComponent />;
            case "danhmuc":
                return <DanhMucComponent />;
            case "quanlylopkhoa":
                return <HoatDongDetail />;
            case "thongke":
                return <ThongKe />;
            default:
                return <HoatDongComponent />;
        }
    };

    const handleLogout = () => {
        // Thực hiện các thao tác đăng xuất nếu cần
        navigate("/"); // Điều hướng đến màn hình đăng nhập
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <a >
                            <img
                                src="/Assets/LHULogoVN.png"
                                alt="Lac Hong University Logo"
                                style={{ width: "60px", marginRight: "20px" }}
                            />
                        </a>
                    </Box>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => setOpenMenu(!openMenu)}
                        sx={{ display: { xs: "block", md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: openMenu ? "flex" : "none", md: "flex" }, gap: 2 }}>
                        <Button color="inherit" startIcon={<DashboardIcon />} onClick={() => setCurrentTab("thongke")}>
                            Thống kê
                        </Button>
                        <Button color="inherit" startIcon={<DashboardIcon />} onClick={() => setCurrentTab("quanlylopkhoa")}>
                            Quản lý Lớp, Khoa
                        </Button>
                        <Button color="inherit" startIcon={<DashboardIcon />} onClick={() => setCurrentTab("hoatdong")}>
                            Hoạt Động
                        </Button>
                        <Button color="inherit" startIcon={<ListAltIcon />} onClick={() => setCurrentTab("tieuchi")}>
                            Tiêu Chí
                        </Button>
                        <Button color="inherit" startIcon={<CategoryIcon />} onClick={() => setCurrentTab("danhmuc")}>
                            Danh Mục
                        </Button>
                        <Button color="inherit" onClick={handleLogout}>
                            Thoát
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Nội dung chính */}
            <Box sx={{ flex: 1, padding: "30px", backgroundColor: "#f4f6f8" }}>
                {renderContent()}
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    textAlign: "center",
                    padding: "10px 0"
                }}
            >
                <Typography variant="body2">
                    © 2025 Hệ Thống Quản Lý Phục Vụ Cộng Đồng.
                </Typography>
            </Box>
        </Box>
    );
};

export default QuanSinhScreen;