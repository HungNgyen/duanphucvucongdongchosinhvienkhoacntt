





import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Stack,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Cookies from "js-cookie";

const HoatDongDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hoatDong, setHoatDong] = useState(null);
    const [lopSinhViens, setLopSinhViens] = useState([]);
    const [sinhViens, setSinhViens] = useState([]);
    const [selectedLop, setSelectedLop] = useState("");
    const [hoatDongSinhVien, setHoatDongSinhVien] = useState([]);
    const [selectedSinhVien, setSelectedSinhVien] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [giaoViens, setGiaoViens] = useState([]);
    const [showGiaoVien, setShowGiaoVien] = useState(false);
    const [hoatDongGiaoVien, setHoatDongGiaoVien] = useState([]);
    const [selectedGiaoVien, setSelectedGiaoVien] = useState(null);
    const [openGVDialog, setOpenGVDialog] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Retrieve user from cookie
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
                setError("Không thể đọc thông tin người dùng. Vui lòng đăng nhập lại.");
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const nguoiDungId = user ? user.nguoi_dung_id : null;

    // Fetch data after user is loaded
    useEffect(() => {
        if (nguoiDungId) {
            fetchHoatDong();
            fetchDanhSachLop();
        }
    }, [nguoiDungId]);

    // Hàm fetch hoạt động
    const fetchHoatDong = async () => {
        try {
            setError("");
            const response = await axios.get(`http://localhost:5093/api/HoatDong/${id}`);
            setHoatDong(response.data);
        } catch (error) {
            console.error("Lỗi khi tải chi tiết hoạt động:", error);
            setError(" ");
        }
    };

    // Hàm fetch danh sách lớp sinh viên
    const fetchDanhSachLop = async () => {
        if (!nguoiDungId) {
            setError("Vui lòng đăng nhập để xem danh sách lớp.");
            return;
        }
        try {
            setError("");
            const response = await axios.get(`http://localhost:5093/api/GiaoVien/danh-sach-lop-sinh-vien`, {
                params: { nguoi_dung_id: nguoiDungId },
            });
            setLopSinhViens(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách lớp:", error);
            setError("Không thể tải danh sách lớp. Vui lòng thử lại.");
        }
    };

    // Hàm fetch sinh viên theo lớp
    const fetchSinhVienTheoLop = async (lop) => {
        setSelectedLop(lop);
        setSelectedSinhVien(null);
        setHoatDongSinhVien([]);
        try {
            setError("");
            const response = await axios.get(`http://localhost:5093/api/GiaoVien/danh-sach-sinh-vien-theo-lop`, {
                params: { lop },
            });
            setSinhViens(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách sinh viên theo lớp:", error);
            setError("Không thể tải danh sách sinh viên. Vui lòng thử lại.");
        }
    };

    // Hàm fetch hoạt động của sinh viên
    const fetchHoatDongSinhVien = async (sinhVienId) => {
        setSelectedSinhVien(sinhVienId);
        try {
            setError("");
            const response = await axios.get(`http://localhost:5093/api/SinhVien/${sinhVienId}/chitiethoatdongcuasinhvien`);
            setHoatDongSinhVien(response.data);
            setOpenDialog(true);
        } catch (error) {
            console.error("Lỗi khi tải hoạt động sinh viên:", error);
            setError("Không thể tải hoạt động của sinh viên. Vui lòng thử lại.");
        }
    };

    // Hàm fetch danh sách giáo viên
    const fetchDanhSachGiaoVien = async () => {
        if (!nguoiDungId) {
            setError("Vui lòng đăng nhập để xem danh sách giáo viên.");
            return;
        }
        try {
            setError("");
            const response = await axios.get(`http://localhost:5093/api/GiaoVien/danh-sach-giao-vien`, {
                params: { nguoi_dung_id: nguoiDungId },
            });
            setGiaoViens(response.data);
            setShowGiaoVien(true);
        } catch (error) {
            console.error("Lỗi khi tải danh sách giáo viên:", error);
            setError("Không thể tải danh sách giáo viên. Vui lòng thử lại.");
        }
    };

    // Hàm fetch hoạt động của giáo viên
    const fetchHoatDongCuaGiaoVien = async (giaoVienId) => {
        try {
            setError("");
            const response = await axios.get(`http://localhost:5093/api/GiaoVien/hoat-dong-giao-vien-tham-gia/${giaoVienId}`);
            setHoatDongGiaoVien(response.data);
            setSelectedGiaoVien(giaoVienId);
            setOpenGVDialog(true);
        } catch (error) {
            console.error("Lỗi khi tải hoạt động của giáo viên:", error);
            setError("Không thể tải hoạt động của giáo viên. Vui lòng thử lại.");
        }
    };

    if (loading) {
        return <Typography variant="h6">Đang tải...</Typography>;
    }

    if (!user || !nguoiDungId) {
        return (
            <Box sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h6" color="error" gutterBottom>
                    Vui lòng đăng nhập để tiếp tục.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
                    Đăng Nhập
                </Button>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>Chi Tiết Hoạt Động</Typography>
            {error && (
                <Typography variant="body1" color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {/* Hiển thị thông tin hoạt động */}
            {hoatDong && (
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Thông Tin Hoạt Động</Typography>
                    <Typography><strong>Tên:</strong> {hoatDong.ten_hoat_dong}</Typography>
                    <Typography><strong>Mô tả:</strong> {hoatDong.mo_ta}</Typography>
                    <Typography><strong>Ngày bắt đầu:</strong> {hoatDong.ngay_bat_dau.split("T")[0]}</Typography>
                    <Typography><strong>Ngày kết thúc:</strong> {hoatDong.ngay_ket_thuc.split("T")[0]}</Typography>
                    <Typography><strong>Điểm:</strong> {hoatDong.diem}</Typography>
                    <Typography><strong>Số lượng tham gia:</strong> {hoatDong.so_luong_nguoi_tham_gia}</Typography>
                    <Typography><strong>Số lượng nộp minh chứng:</strong> {hoatDong.so_luong_nguoi_nop_minh_chung}</Typography>
                </Paper>
            )}

            {/* Danh sách lớp */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Danh sách lớp:</Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                    {lopSinhViens.map((lop, index) => (
                        <Button
                            key={index}
                            variant={selectedLop === lop.lop ? "contained" : "outlined"}
                            onClick={() => fetchSinhVienTheoLop(lop.lop)}
                        >
                            {lop.lop}
                        </Button>
                    ))}
                </Stack>
            </Paper>

            {/* Danh sách sinh viên */}
            {selectedLop && (
                <Paper sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Danh sách sinh viên lớp {selectedLop}:</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Họ tên</TableCell>
                                    <TableCell>MSSV</TableCell>
                                    <TableCell>Ngành</TableCell>
                                    <TableCell>Điểm</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sinhViens.length > 0 ? (
                                    sinhViens.map((sv) => (
                                        <TableRow
                                            key={sv.sinh_vien_id}
                                            hover
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => fetchHoatDongSinhVien(sv.sinh_vien_id)}
                                        >
                                            <TableCell>{sv.ho_ten_sinh_vien}</TableCell>
                                            <TableCell>{sv.ma_so_sinh_vien}</TableCell>
                                            <TableCell>{sv.nganh}</TableCell>
                                            <TableCell>{sv.diem}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            Không có sinh viên trong lớp này.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}

            {/* Danh sách giáo viên */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Button variant="contained" onClick={fetchDanhSachGiaoVien}>
                    Tất cả giáo viên
                </Button>
                {showGiaoVien && (
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Mã số giáo viên</TableCell>
                                    <TableCell>Họ tên</TableCell>
                                    <TableCell>Chức vụ</TableCell>
                                    <TableCell>Lớp phụ trách</TableCell>
                                    <TableCell>Điểm</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {giaoViens.length > 0 ? (
                                    giaoViens.map((gv) => (
                                        <TableRow
                                            key={gv.giao_vien_id}
                                            hover
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => fetchHoatDongCuaGiaoVien(gv.giao_vien_id)}
                                        >
                                            <TableCell>{gv.ma_so_giao_vien}</TableCell>
                                            <TableCell>{gv.ho_ten_giao_vien}</TableCell>
                                            <TableCell>{gv.chuc_vu}</TableCell>
                                            <TableCell>{gv.lop_phu_trach}</TableCell>
                                            <TableCell>{gv.diem}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            Không có giáo viên nào.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>

            {/* Dialog hiển thị hoạt động của giáo viên */}
            <Dialog
                open={openGVDialog}
                onClose={() => setOpenGVDialog(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    Hoạt động của giáo viên ID {selectedGiaoVien}
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenGVDialog(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên hoạt động</TableCell>
                                    <TableCell>Mô tả</TableCell>
                                    <TableCell>Thời gian thực hiện</TableCell>
                                    <TableCell>Điểm</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hoatDongGiaoVien.length > 0 ? (
                                    hoatDongGiaoVien.map((hd, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{hd.ten_hoat_dong}</TableCell>
                                            <TableCell>{hd.mo_ta}</TableCell>
                                            <TableCell>{hd.thoi_gian_thuc_hien}</TableCell>
                                            <TableCell>{hd.diem}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            Không có hoạt động nào.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenGVDialog(false)}>Đóng</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog hiển thị hoạt động của sinh viên */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    Hoạt động của sinh viên ID {selectedSinhVien}
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenDialog(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên hoạt động</TableCell>
                                    <TableCell>Họ tên sinh viên</TableCell>
                                    <TableCell>Lớp</TableCell>
                                    <TableCell>Điểm</TableCell>
                                    <TableCell>Minh chứng</TableCell>
                                    <TableCell>Loại hành động</TableCell>
                                    <TableCell>Thời gian thực hiện</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hoatDongSinhVien.length > 0 ? (
                                    hoatDongSinhVien.map((hd, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{hd.ten_hoat_dong}</TableCell>
                                            <TableCell>{hd.ho_ten_sinh_vien}</TableCell>
                                            <TableCell>{hd.lop}</TableCell>
                                            <TableCell>{hd.diem}</TableCell>
                                            <TableCell>{hd.minh_chung ? "Đã nộp" : "Chưa nộp"}</TableCell>
                                            <TableCell>{hd.loai_hanh_dong}</TableCell>
                                            <TableCell>{hd.thoi_gian_thuc_hien}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            Không có hoạt động nào.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HoatDongDetail;














