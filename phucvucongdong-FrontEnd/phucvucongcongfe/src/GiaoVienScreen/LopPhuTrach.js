







import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
    Box, Typography, Paper, CircularProgress, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";

const LopPhuTrach = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sinhVienList, setSinhVienList] = useState([]);
    const [lopPhuTrach, setLopPhuTrach] = useState("");
    const [showList, setShowList] = useState(false);
    const [giaoVienId, setGiaoVienId] = useState(null);
    const [selectedSinhVien, setSelectedSinhVien] = useState(null);
    const [chiTietHoatDong, setChiTietHoatDong] = useState([]);
    const [loadingHoatDong, setLoadingHoatDong] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const userCookie = Cookies.get("user");

            if (!userCookie) {
                setError("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập.");
                setLoading(false);
                return;
            }

            try {
                const parsedUser = JSON.parse(decodeURIComponent(userCookie));
                const giao_vien_id = parsedUser?.giao_vien_id;

                if (!giao_vien_id) {
                    setError("Không có ID giáo viên trong dữ liệu người dùng.");
                    setLoading(false);
                    return;
                }

                setGiaoVienId(giao_vien_id);

                const response = await axios.get(`http://localhost:5093/api/GiaoVien/${giao_vien_id}`);
                setLopPhuTrach(response.data?.lop_phu_trach || "Không rõ");

            } catch (err) {
                console.error("Lỗi khi lấy lớp phụ trách:", err);
                setError("Không thể lấy dữ liệu lớp phụ trách");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleClick = async () => {
        if (!giaoVienId) return;

        try {
            const response = await axios.get(`http://localhost:5093/api/SinhVien/danhsachsinhvien/${giaoVienId}`);
            setSinhVienList(response.data || []);
            setShowList(true);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách sinh viên:", err);
            setError("Không thể lấy danh sách sinh viên");
        }
    };

    const handleRowClick = async (sv) => {
        setSelectedSinhVien(sv);
        setLoadingHoatDong(true);
        try {
            const res = await axios.get(`http://localhost:5093/api/SinhVien/${sv.sinh_vien_id}/chitiethoatdongcuasinhvien`);
            setChiTietHoatDong(res.data || []);
        } catch (err) {
            console.error("Lỗi khi lấy chi tiết hoạt động:", err);
            setChiTietHoatDong([]);
        } finally {
            setLoadingHoatDong(false);
        }
    };

    const handleCloseDialog = () => {
        setSelectedSinhVien(null);
        setChiTietHoatDong([]);
    };

    // const handleXacNhanMinhChung = async (hoat_dong_id, xac_nhan) => {
    //     try {
    //         await axios.post("http://localhost:5093/api/GiaoVien/xacnhanminhchungcuasinhvien", {
    //             sinhVienId: selectedSinhVien.sinh_vien_id,
    //             hoatDongId: hoat_dong_id,
    //             xacNhan: xac_nhan
    //         });

    //         alert("Cập nhật minh chứng thành công!");

    //         // Reload hoạt động sau xác nhận
    //         const res = await axios.get(`http://localhost:5093/api/SinhVien/${selectedSinhVien.sinh_vien_id}/chitiethoatdongcuasinhvien`);
    //         setChiTietHoatDong(res.data || []);
    //     } catch (error) {
    //         console.error("Lỗi xác nhận minh chứng:", error);
    //         alert("Có lỗi xảy ra khi xác nhận minh chứng.");
    //     }
    // };

    const handleXacNhanMinhChung = async (hoat_dong_id, xac_nhan) => {
        try {
            await axios.post("http://localhost:5093/api/GiaoVien/xacnhanminhchungcuasinhvien", {
                sinh_vien_id: selectedSinhVien.sinh_vien_id,
                hoat_dong_id: hoat_dong_id,
                xac_nhan: xac_nhan
            });

            alert("Cập nhật minh chứng thành công!");

            // Lấy lại chi tiết hoạt động sau khi cập nhật
            const res = await axios.get(`http://localhost:5093/api/SinhVien/${selectedSinhVien.sinh_vien_id}/chitiethoatdongcuasinhvien`);
            setChiTietHoatDong(res.data || []);

            // Lấy lại thông tin sinh viên để cập nhật điểm mới
            const svRes = await axios.get(`http://localhost:5093/api/SinhVien/${selectedSinhVien.sinh_vien_id}`);
            setSelectedSinhVien(svRes.data); // Cập nhật điểm mới
        } catch (error) {
            console.error("Lỗi xác nhận minh chứng:", error);
            alert("Có lỗi xảy ra khi xác nhận minh chứng.");
        }
    };



    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Lớp Phụ Trách Của Giáo Viên
            </Typography>

            <Paper sx={{ padding: "20px", width: "100%" }}>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                            Xem sinh viên lớp: {lopPhuTrach}
                        </Button>

                        {showList && (
                            <Box mt={4}>
                                <Typography variant="h6" gutterBottom>
                                    Danh sách sinh viên lớp {lopPhuTrach}:
                                </Typography>

                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><strong>Mã số SV</strong></TableCell>
                                                <TableCell><strong>Họ tên</strong></TableCell>
                                                <TableCell><strong>Ngành</strong></TableCell>
                                                <TableCell><strong>Lớp</strong></TableCell>
                                                <TableCell><strong>Điểm</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {sinhVienList.map((sv, index) => (
                                                <TableRow
                                                    key={index}
                                                    hover
                                                    sx={{ cursor: "pointer" }}
                                                    onClick={() => handleRowClick(sv)}
                                                >
                                                    <TableCell>{sv.ma_so_sinh_vien}</TableCell>
                                                    <TableCell>{sv.ho_ten_sinh_vien}</TableCell>
                                                    <TableCell>{sv.nganh}</TableCell>
                                                    <TableCell>{sv.lop}</TableCell>
                                                    <TableCell>{sv.diem}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        )}
                    </>
                )}
            </Paper>

            {/* Dialog chi tiết sinh viên + hoạt động */}
            <Dialog open={!!selectedSinhVien} onClose={handleCloseDialog} fullWidth maxWidth="md">
                <DialogTitle>Chi Tiết Sinh Viên</DialogTitle>
                <DialogContent>
                    {selectedSinhVien && (
                        <>
                            <Typography gutterBottom><strong>Mã số sinh viên:</strong> {selectedSinhVien.ma_so_sinh_vien}</Typography>
                            <Typography gutterBottom><strong>Họ tên:</strong> {selectedSinhVien.ho_ten_sinh_vien}</Typography>
                            <Typography gutterBottom><strong>Ngành:</strong> {selectedSinhVien.nganh}</Typography>
                            <Typography gutterBottom><strong>Lớp:</strong> {selectedSinhVien.lop}</Typography>
                            <Typography gutterBottom><strong>Điểm:</strong> {selectedSinhVien.diem}</Typography>

                            <Typography variant="h6" mt={3}>Chi tiết hoạt động:</Typography>
                            {loadingHoatDong ? (
                                <CircularProgress />
                            ) : chiTietHoatDong.length === 0 ? (
                                <Typography>Không có hoạt động nào.</Typography>
                            ) : (
                                <Table sx={{ mt: 2 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Tên hoạt động</strong></TableCell>
                                            <TableCell><strong>Loại hành động</strong></TableCell>
                                            <TableCell><strong>Minh chứng</strong></TableCell>
                                            <TableCell><strong>Thời gian</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {chiTietHoatDong.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.ten_hoat_dong}</TableCell>
                                                <TableCell>{item.loai_hanh_dong}</TableCell>
                                                <TableCell>
                                                    {item.minh_chung ? (
                                                        <>
                                                            <a href={item.minh_chung} target="_blank" rel="noopener noreferrer">
                                                                Xem minh chứng
                                                            </a>
                                                            <Box mt={1}>
                                                                <Button
                                                                    size="small"
                                                                    color="success"
                                                                    variant="contained"
                                                                    onClick={() => handleXacNhanMinhChung(item.hoat_dong_id, true)}
                                                                    sx={{ mr: 1 }}
                                                                >
                                                                    ✅ Xác nhận
                                                                </Button>
                                                                <Button
                                                                    size="small"
                                                                    color="error"
                                                                    variant="contained"
                                                                    onClick={() => handleXacNhanMinhChung(item.hoat_dong_id, false)}
                                                                >
                                                                    ❌ Từ chối
                                                                </Button>
                                                            </Box>
                                                        </>
                                                    ) : (
                                                        <Typography>Không có minh chứng</Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>{new Date(item.thoi_gian_thuc_hien).toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LopPhuTrach;
