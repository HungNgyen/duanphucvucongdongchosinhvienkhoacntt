







// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Grid,
//     Card,
//     CardContent,
//     Typography,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Button,
//     InputBase
// } from "@mui/material";
// import axios from "axios";
// import Cookies from "js-cookie";
// import Loader from "../Loader";
// import FilterListIcon from "@mui/icons-material/FilterList";

// const HoatDongComponent = () => {
//     const [activities, setActivities] = useState([]);
//     const [selectedActivity, setSelectedActivity] = useState(null);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         const fetchActivities = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5093/api/HoatDong/danhsachtatcahoatdong");
//                 setActivities(response.data);
//             } catch (error) {
//                 console.error("Lỗi khi tải danh sách hoạt động:", error);
//             }
//         };
//         fetchActivities();
//     }, []);

//     useEffect(() => {
//         const userCookie = Cookies.get("user");
//         if (userCookie) {
//             try {
//                 const decodedUser = decodeURIComponent(userCookie);
//                 const parsedUser = JSON.parse(decodedUser);
//                 setUser(parsedUser);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Lỗi khi phân tích dữ liệu từ cookie:", error);
//                 setLoading(false);
//             }
//         } else {
//             setLoading(false);
//         }
//     }, []);

//     const handleOpenDialog = (activity) => {
//         setSelectedActivity(activity);
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setSelectedActivity(null);
//     };

//     const handleRegister = async () => {
//         if (!selectedActivity || !user || !user.nguoi_dung_id) {
//             alert("Thông tin không hợp lệ! Vui lòng đăng nhập lại.");
//             return;
//         }

//         if (getActivityStatus(selectedActivity.ngay_ket_thuc) === "Hết hạn") {
//             alert("Hoạt động này đã hết hạn, không thể đăng ký!");
//             return;
//         }

//         try {
//             const payload = {
//                 sinh_vien_id: user.sinh_vien_id,
//                 hoat_dong_id: selectedActivity.hoat_dong_id,
//                 trang_thai: "Chua hoàn thành",
//                 minh_chung: "",
//             };

//             const response = await axios.post("http://localhost:5093/api/ThamGiaSinhVien/dang-ky", payload);
//             const message = response.data?.message || "Đăng ký thành công!";
//             alert(message);
//             handleCloseDialog();
//         } catch (error) {
//             if (error.response) {
//                 const errorMsg = error.response.data.message || "Có lỗi xảy ra, vui lòng thử lại!";
//                 alert(errorMsg);
//             } else {
//                 alert("Không thể kết nối đến server. Vui lòng kiểm tra mạng!");
//             }
//         }
//     };

//     const getActivityStatus = (endDate) => {
//         return new Date(endDate) >= new Date() ? "Còn hạn" : "Hết hạn";
//     };

//     const filteredActivities = activities.filter((activity) =>
//         activity.ten_hoat_dong.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const activeActivities = filteredActivities.filter(
//         (activity) => getActivityStatus(activity.ngay_ket_thuc) === "Còn hạn"
//     );
//     const expiredActivities = filteredActivities.filter(
//         (activity) => getActivityStatus(activity.ngay_ket_thuc) === "Hết hạn"
//     );

//     return (
//         <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", p: 3 }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                 {loading ? (
//                     <Loader />
//                 ) : user ? (
//                     <Typography variant="h6">
//                         Xin chào, {user.ho_ten_sinh_vien || "Người dùng"}! Tổng điểm: {user.diem}
//                     </Typography>
//                 ) : (
//                     <Typography variant="h6">Chào mừng đến với hệ thống!</Typography>
//                 )}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <InputBase
//                         placeholder="Tìm kiếm hoạt động..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         sx={{
//                             padding: "6px 12px",
//                             border: "1px solid #ccc",
//                             borderRadius: "5px",
//                             fontSize: "14px",
//                             width: "250px",
//                             backgroundColor: "#fff",
//                         }}
//                     />
//                     <Button variant="outlined" startIcon={<FilterListIcon />}>
//                         Filter
//                     </Button>
//                 </Box>
//             </Box>

//             <Box sx={{ flexGrow: 1, padding: "20px", backgroundColor: "#f4f4f4" }}>
//                 {loading ? (
//                     <Loader />
//                 ) : (
//                     <>
//                         <Typography variant="h5" gutterBottom>
//                             Hoạt Động Còn Hạn
//                         </Typography>
//                         <Grid container spacing={7} justifyContent="center" sx={{ mb: 4 }}>
//                             {activeActivities.length > 0 ? (
//                                 activeActivities.map((activity) => (
//                                     <Grid item xs={12} sm={6} md={4} key={activity.id} display="flex" justifyContent="center">
//                                         <Card
//                                             sx={{
//                                                 cursor: "pointer",
//                                                 backgroundColor: "#e0e0e0",
//                                                 position: "relative",
//                                                 minWidth: 400,
//                                                 maxWidth: 340,
//                                                 minHeight: 220,
//                                                 display: "flex",
//                                                 flexDirection: "column",
//                                                 justifyContent: "space-between",
//                                                 boxShadow: 3,
//                                                 transition: "all 0.3s ease",
//                                                 "&:hover": {
//                                                     boxShadow: 6,
//                                                     backgroundColor: "#d6d6d6",
//                                                     transform: "scale(1.02)",
//                                                 },
//                                             }}
//                                             onClick={() => handleOpenDialog(activity)}
//                                         >
//                                             <Box sx={{ position: "absolute", top: 8, right: 8 }}>
//                                                 <Typography variant="body2" sx={{ color: "green" }}>
//                                                     Còn hạn
//                                                 </Typography>
//                                             </Box>
//                                             <CardContent sx={{ flexGrow: 1 }}>
//                                                 <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
//                                                     {activity.ten_hoat_dong}
//                                                 </Typography>
//                                                 <Typography variant="body2">Ngày bắt đầu: {activity.ngay_bat_dau}</Typography>
//                                                 <Typography variant="body2">Ngày kết thúc: {activity.ngay_ket_thuc}</Typography>
//                                                 <Typography variant="body2">Điểm: {activity.diem}</Typography>
//                                             </CardContent>
//                                         </Card>
//                                     </Grid>
//                                 ))
//                             ) : (
//                                 <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
//                                     Không có hoạt động còn hạn.
//                                 </Typography>
//                             )}
//                         </Grid>

//                         <Typography variant="h5" gutterBottom>
//                             Hoạt Động Đã Hết Hạn
//                         </Typography>
//                         <Grid container spacing={7} justifyContent="center">
//                             {expiredActivities.length > 0 ? (
//                                 expiredActivities.map((activity) => (
//                                     <Grid item xs={12} sm={6} md={4} key={activity.id} display="flex" justifyContent="center">
//                                         <Card
//                                             sx={{
//                                                 cursor: "pointer",
//                                                 backgroundColor: "#e0e0e0",
//                                                 position: "relative",
//                                                 minWidth: 400,
//                                                 maxWidth: 340,
//                                                 minHeight: 220,
//                                                 display: "flex",
//                                                 flexDirection: "column",
//                                                 justifyContent: "space-between",
//                                                 boxShadow: 3,
//                                                 transition: "all 0.3s ease",
//                                                 "&:hover": {
//                                                     boxShadow: 6,
//                                                     backgroundColor: "#d6d6d6",
//                                                     transform: "scale(1.02)",
//                                                 },
//                                             }}
//                                             onClick={() => handleOpenDialog(activity)}
//                                         >
//                                             <Box sx={{ position: "absolute", top: 8, right: 8 }}>
//                                                 <Typography variant="body2" sx={{ color: "red" }}>
//                                                     Hết hạn
//                                                 </Typography>
//                                             </Box>
//                                             <CardContent sx={{ flexGrow: 1 }}>
//                                                 <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
//                                                     {activity.ten_hoat_dong}
//                                                 </Typography>
//                                                 <Typography variant="body2">Ngày bắt đầu: {activity.ngay_bat_dau}</Typography>
//                                                 <Typography variant="body2">Ngày kết thúc: {activity.ngay_ket_thuc}</Typography>
//                                                 <Typography variant="body2">Điểm: {activity.diem}</Typography>
//                                             </CardContent>
//                                         </Card>
//                                     </Grid>
//                                 ))
//                             ) : (
//                                 <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
//                                     Không có hoạt động hết hạn.
//                                 </Typography>
//                             )}
//                         </Grid>
//                     </>
//                 )}
//             </Box>

//             {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>Chi Tiết Hoạt Động</DialogTitle>
//                 <DialogContent>
//                     {selectedActivity && (
//                         <>
//                             <Typography variant="h6">{selectedActivity.ten_hoat_dong}</Typography>
//                             <Typography variant="body2">
//                                 <strong>Thời gian:</strong> {selectedActivity.ngay_bat_dau} - {selectedActivity.ngay_ket_thuc}
//                             </Typography>
//                             <Typography variant="body2">
//                                 <strong>Mô tả:</strong> {selectedActivity.mo_ta || "Không có mô tả"}
//                             </Typography>
//                             <Typography
//                                 variant="body2"
//                                 sx={{ color: getActivityStatus(selectedActivity.ngay_ket_thuc) === "Còn hạn" ? "green" : "red" }}
//                             >
//                                 <strong>Tình trạng:</strong> {getActivityStatus(selectedActivity.ngay_ket_thuc)}
//                             </Typography>
//                         </>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleRegister} color="primary" disabled={loading || !user}>
//                         Đăng Ký
//                     </Button>
//                     <Button onClick={handleCloseDialog} color="secondary">
//                         Đóng
//                     </Button>
//                 </DialogActions>
//             </Dialog> */}
//             <Dialog
//                 open={openDialog}
//                 onClose={handleCloseDialog}
//                 PaperProps={{
//                     sx: {
//                         width: '500px',
//                         height: '400px',
//                     },
//                 }}
//             >
//                 <DialogTitle>Chi Tiết Hoạt Động</DialogTitle>
//                 <DialogContent sx={{ overflow: "auto" }}>
//                     {selectedActivity && (
//                         <>
//                             <Typography variant="h6">{selectedActivity.ten_hoat_dong}</Typography>
//                             <Typography variant="body2">
//                                 <strong>Thời gian:</strong> {selectedActivity.ngay_bat_dau} - {selectedActivity.ngay_ket_thuc}
//                             </Typography>
//                             <Typography variant="body2">
//                                 <strong>Mô tả:</strong> {selectedActivity.mo_ta || "Không có mô tả"}
//                             </Typography>
//                             <Typography
//                                 variant="body2"
//                                 sx={{
//                                     color: getActivityStatus(selectedActivity.ngay_ket_thuc) === "Còn hạn" ? "green" : "red",
//                                 }}
//                             >
//                                 <strong>Tình trạng:</strong> {getActivityStatus(selectedActivity.ngay_ket_thuc)}
//                             </Typography>
//                         </>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleRegister} color="primary" disabled={loading || !user}>
//                         Đăng Ký
//                     </Button>
//                     <Button onClick={handleCloseDialog} color="secondary">
//                         Đóng
//                     </Button>
//                 </DialogActions>
//             </Dialog>


//         </Box>
//     );
// };

// export default HoatDongComponent; ///////////////////////////11052025 chỉnh sửa lại giao diện cho đẹp hơn























import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    InputBase
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../Loader";
import FilterListIcon from "@mui/icons-material/FilterList";

import axiosInstance from "../Screen/axiosConfig";

const HoatDongComponent = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Utility function to format date to dd/mm/yyyy hh:mm:ss
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axiosInstance.get("http://localhost:5093/api/HoatDong/danhsachtatcahoatdongsv");
                setActivities(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách hoạt động:", error);
            }
        };
        fetchActivities();
    }, []);

    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            try {
                const decodedUser = decodeURIComponent(userCookie);
                const parsedUser = JSON.parse(decodedUser);
                setUser(parsedUser);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi phân tích dữ liệu từ cookie:", error);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const handleOpenDialog = (activity) => {
        setSelectedActivity(activity);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedActivity(null);
    };

    const handleRegister = async () => {
        if (!selectedActivity || !user || !user.nguoi_dung_id) {
            alert("Thông tin không hợp lệ! Vui lòng đăng nhập lại.");
            return;
        }

        if (getActivityStatus(selectedActivity.ngay_ket_thuc) === "Hết hạn") {
            alert("Hoạt động này đã hết hạn, không thể đăng ký!");
            return;
        }

        try {
            const payload = {
                sinh_vien_id: user.sinh_vien_id,
                hoat_dong_id: selectedActivity.hoat_dong_id,
                trang_thai: "Chua hoàn thành",
                minh_chung: "",
            };

            const response = await axios.post("http://localhost:5093/api/ThamGiaSinhVien/dang-ky", payload);
            const message = response.data?.message || "Đăng ký thành công!";
            alert(message);
            handleCloseDialog();
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.message || "Có lỗi xảy ra, vui lòng thử lại!";
                alert(errorMsg);
            } else {
                alert("Không thể kết nối đến server. Vui lòng kiểm tra mạng!");
            }
        }
    };

    const getActivityStatus = (endDate) => {
        return new Date(endDate) >= new Date() ? "Còn hạn" : "Hết hạn";
    };

    const filteredActivities = activities.filter((activity) =>
        activity.ten_hoat_dong.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const activeActivities = filteredActivities.filter(
        (activity) => getActivityStatus(activity.ngay_ket_thuc) === "Còn hạn"
    );
    const expiredActivities = filteredActivities.filter(
        (activity) => getActivityStatus(activity.ngay_ket_thuc) === "Hết hạn"
    );

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                {loading ? (
                    <Loader />
                ) : user ? (
                    <Typography variant="h6">
                        Xin chào, {user.ho_ten_sinh_vien || "Người dùng"}! Tổng điểm: {user.diem}
                    </Typography>
                ) : (
                    <Typography variant="h6">Chào mừng đến với hệ thống!</Typography>
                )}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <InputBase
                        placeholder="Tìm kiếm hoạt động..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            padding: "6px 12px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            fontSize: "14px",
                            width: "250px",
                            backgroundColor: "#fff",
                        }}
                    />
                    <Button variant="outlined" startIcon={<FilterListIcon />}>
                        Filter
                    </Button>
                </Box>
            </Box>

            <Box sx={{ flexGrow: 1, padding: "20px", backgroundColor: "#f4f4f4" }}>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Hoạt Động Còn Hạn
                        </Typography>
                        <Grid container spacing={7} justifyContent="center" sx={{ mb: 4 }}>
                            {activeActivities.length > 0 ? (
                                activeActivities.map((activity) => (
                                    <Grid item xs={12} sm={6} md={4} key={activity.id} display="flex" justifyContent="center">
                                        <Card
                                            sx={{
                                                cursor: "pointer",
                                                backgroundColor: "#e0e0e0",
                                                position: "relative",
                                                minWidth: 400,
                                                maxWidth: 340,
                                                minHeight: 220,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                boxShadow: 3,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    boxShadow: 6,
                                                    backgroundColor: "#d6d6d6",
                                                    transform: "scale(1.02)",
                                                },
                                            }}
                                            onClick={() => handleOpenDialog(activity)}
                                        >
                                            <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                                                <Typography variant="body2" sx={{ color: "green" }}>
                                                    Còn hạn
                                                </Typography>
                                            </Box>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                                    {activity.ten_hoat_dong}
                                                </Typography>
                                                <Typography variant="body2">Bắt đầu: {formatDate(activity.ngay_bat_dau)}</Typography>
                                                <Typography variant="body2">Kết thúc: {formatDate(activity.ngay_ket_thuc)}</Typography>
                                                <Typography variant="body2">Điểm: {activity.diem}</Typography>
                                                <Typography variant="body2">So luong tham gia: {activity.so_luong_nguoi_tham_gia}/{activity.tong_so_nguoi_tham_gia}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
                                    Không có hoạt động còn hạn.
                                </Typography>
                            )}
                        </Grid>

                        <Typography variant="h5" gutterBottom>
                            Hoạt Động Đã Hết Hạn
                        </Typography>
                        <Grid container spacing={7} justifyContent="center">
                            {expiredActivities.length > 0 ? (
                                expiredActivities.map((activity) => (
                                    <Grid item xs={12} sm={6} md={4} key={activity.id} display="flex" justifyContent="center">
                                        <Card
                                            sx={{
                                                cursor: "pointer",
                                                backgroundColor: "#e0e0e0",
                                                position: "relative",
                                                minWidth: 400,
                                                maxWidth: 340,
                                                minHeight: 220,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                boxShadow: 3,
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    boxShadow: 6,
                                                    backgroundColor: "#d6d6d6",
                                                    transform: "scale(1.02)",
                                                },
                                            }}
                                            onClick={() => handleOpenDialog(activity)}
                                        >
                                            <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                                                <Typography variant="body2" sx={{ color: "red" }}>
                                                    Hết hạn
                                                </Typography>
                                            </Box>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                                    {activity.ten_hoat_dong}
                                                </Typography>
                                                <Typography variant="body2">Bắt đầu: {formatDate(activity.ngay_bat_dau)}</Typography>
                                                <Typography variant="body2">Kết thúc: {formatDate(activity.ngay_ket_thuc)}</Typography>
                                                <Typography variant="body2">Điểm: {activity.diem}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
                                    Không có hoạt động hết hạn.
                                </Typography>
                            )}
                        </Grid>
                    </>
                )}
            </Box>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    sx: {
                        width: '500px',
                        height: '400px',
                    },
                }}
            >
                <DialogTitle>Chi Tiết Hoạt Động</DialogTitle>
                <DialogContent sx={{ overflow: "auto" }}>
                    {selectedActivity && (
                        <>
                            <Typography variant="h6">{selectedActivity.ten_hoat_dong}</Typography>
                            <Typography compressor="body2">
                                <strong>Thời gian:</strong> {formatDate(selectedActivity.ngay_bat_dau)} - {formatDate(selectedActivity.ngay_ket_thuc)}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Mô tả:</strong> {selectedActivity.mo_ta || "Không có mô tả"}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: getActivityStatus(selectedActivity.ngay_ket_thuc) === "Còn hạn" ? "green" : "red",
                                }}
                            >
                                <strong>Tình trạng:</strong> {getActivityStatus(selectedActivity.ngay_ket_thuc)}
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRegister} color="primary" disabled={loading || !user}>
                        Đăng Ký
                    </Button>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HoatDongComponent; //////gốc 15052025





