// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Typography,
//     Grid,
//     Card,
//     CardContent,
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     AppBar,
//     Toolbar,
//     IconButton,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const MinhChungHoatDongScreen = () => {
//     const [activities, setActivities] = useState([]);
//     const [selectedActivity, setSelectedActivity] = useState(null);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [file, setFile] = useState(null);
//     const [description, setDescription] = useState("");
//     const navigate = useNavigate();

//     // Fetch danh sách hoạt động mà sinh viên đã tham gia
//     useEffect(() => {
//         const fetchActivities = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5093/api/ThamGiaSinhVien");
//                 const formattedActivities = response.data.map((activity) => ({
//                     id: activity.hoat_dong_id,
//                     name: activity.ten_hoat_dong,
//                     startDate: activity.ngay_bat_dau,
//                     endDate: activity.ngay_ket_thuc,
//                 }));
//                 setActivities(formattedActivities);
//             } catch (error) {
//                 console.error("Lỗi khi tải danh sách hoạt động:", error);
//                 alert("Không thể tải danh sách hoạt động. Vui lòng thử lại sau.");
//             }
//         };

//         fetchActivities();
//     }, []);

//     // Mở dialog nộp minh chứng
//     const handleOpenDialog = (activity) => {
//         setSelectedActivity(activity);
//         setOpenDialog(true);
//     };

//     // Đóng dialog nộp minh chứng
//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setSelectedActivity(null);
//         setFile(null);
//         setDescription("");
//     };

//     // Xử lý chọn tệp
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     // Xử lý nộp minh chứng
//     const handleSubmitProof = async () => {
//         if (!file || !description) {
//             alert("Vui lòng điền đầy đủ thông tin và chọn tệp minh chứng.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("description", description);
//         formData.append("activityId", selectedActivity.id);

//         try {
//             await axios.post("http://localhost:5093/api/MinhChung", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             alert("Nộp minh chứng thành công!");
//             handleCloseDialog();
//         } catch (error) {
//             console.error("Lỗi khi nộp minh chứng:", error);
//             alert("Có lỗi xảy ra khi nộp minh chứng. Vui lòng thử lại.");
//         }
//     };

//     return (
//         <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//             {/* Thanh menu trên cùng */}
//             <AppBar position="static" sx={{ backgroundColor: "#007bff" }}>
//                 <Toolbar>
//                     <Typography variant="h6" sx={{ flexGrow: 1 }}>
//                         Nộp Minh Chứng
//                     </Typography>
//                     <Button color="inherit" onClick={() => navigate("/")}>
//                         Quay lại
//                     </Button>
//                 </Toolbar>
//             </AppBar>

//             {/* Nội dung chính */}
//             <Box sx={{ flexGrow: 1, padding: "20px", backgroundColor: "#f4f4f4" }}>
//                 <Grid container spacing={3}>
//                     {activities.map((activity, index) => (
//                         <Grid item xs={12} sm={6} md={4} key={index}>
//                             <Card
//                                 sx={{
//                                     backgroundColor: "#d3d3d3",
//                                     position: "relative",
//                                     cursor: "pointer",
//                                 }}
//                                 onClick={() => handleOpenDialog(activity)}
//                             >
//                                 <CardContent>
//                                     <Typography variant="h6">{activity.name}</Typography>
//                                     <Typography variant="body2">
//                                         {activity.startDate} - {activity.endDate}
//                                     </Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>

//             {/* Footer */}
//             <Box sx={{ backgroundColor: "#007bff", color: "#fff", textAlign: "center", padding: "10px" }}>
//                 <Typography variant="body2">
//                     © 2024 Khoa Công Nghệ Thông Tin - Đại Học Lạc Hồng
//                 </Typography>
//             </Box>

//             {/* Dialog nộp minh chứng */}
//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>Nộp Minh Chứng</DialogTitle>
//                 <DialogContent>
//                     {selectedActivity && (
//                         <>
//                             <Typography variant="h6" gutterBottom>
//                                 {selectedActivity.name}
//                             </Typography>
//                             <Typography variant="body2" gutterBottom>
//                                 Thời gian: {selectedActivity.startDate} - {selectedActivity.endDate}
//                             </Typography>
//                             <TextField
//                                 fullWidth
//                                 margin="dense"
//                                 label="Mô tả minh chứng"
//                                 multiline
//                                 rows={3}
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 placeholder="Nhập mô tả minh chứng..."
//                             />
//                             <Button
//                                 variant="outlined"
//                                 component="label"
//                                 fullWidth
//                                 sx={{ marginTop: "10px" }}
//                             >
//                                 Chọn tệp minh chứng
//                                 <input type="file" hidden onChange={handleFileChange} />
//                             </Button>
//                             {file && (
//                                 <Typography variant="body2" sx={{ marginTop: "10px" }}>
//                                     Tệp đã chọn: {file.name}
//                                 </Typography>
//                             )}
//                         </>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDialog} color="secondary">
//                         Hủy
//                     </Button>
//                     <Button onClick={handleSubmitProof} color="primary">
//                         Nộp Minh Chứng
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default MinhChungHoatDongScreen;






import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import axios from "axios";

const MinhChungHoatDongScreen = () => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Vui lòng chọn tệp minh chứng.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", description);

        try {
            await axios.post("http://localhost:5093/api/minhchung", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Nộp minh chứng thành công!");
            setFile(null);
            setDescription("");
        } catch (error) {
            console.error("Lỗi khi nộp minh chứng:", error);
            alert("Lỗi khi nộp minh chứng. Vui lòng thử lại!");
        }
    };

    return (
        <Box sx={{ padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
            <Typography variant="h5" gutterBottom>
                Nộp Minh Chứng Hoạt Động
            </Typography>
            <TextField
                fullWidth
                label="Mô tả"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ marginBottom: "10px" }}
            />
            <input type="file" onChange={handleFileChange} />
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: "10px" }}>
                Nộp Minh Chứng
            </Button>
        </Box>
    );
};

export default MinhChungHoatDongScreen;
