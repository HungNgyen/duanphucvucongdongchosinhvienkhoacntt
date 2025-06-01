









import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Button, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, InputAdornment, IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const GiaoVienScreen = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const [teacherData, setTeacherData] = useState({
        ma_so_giao_vien: "", ho_ten_giao_vien: "", chuc_vu: "", ten_dang_nhap: "", mat_khau: "",
        phan_quyen: "", trang_thai: "1", vai_tro: "", phong_ban: "", thong_tin_lien_he: ""
    });

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get("http://localhost:5093/api/GiaoVien");
            const data = response.data || [];
            setTeachers(data);
            setFilteredTeachers(data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách giáo viên:", error);
            setTeachers([]);
            setFilteredTeachers([]);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filtered = teachers.filter((teacher) =>
            teacher.ma_so_giao_vien.toLowerCase().includes(term.toLowerCase()) ||
            teacher.ho_ten_giao_vien.toLowerCase().includes(term.toLowerCase()) ||
            teacher.chuc_vu.toLowerCase().includes(term.toLowerCase()) ||
            teacher.ten_dang_nhap.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredTeachers(filtered);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setFilteredTeachers(teachers);
    };

    const handleInputChange = (e) => {
        setTeacherData({
            ...teacherData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddOrUpdateTeacher = async () => {
        try {
            let updatedData = { ...teacherData };
            if (editMode && !updatedData.mat_khau) {
                delete updatedData.mat_khau;
            }
            console.log("Giá trị vai_tro gửi lên:", `'${teacherData.vai_tro}'`);
            console.log("Dữ liệu gửi lên:", updatedData);

            if (editMode) {
                await axios.put(`http://localhost:5093/api/GiaoVien/${selectedTeacher.giao_vien_id}`, updatedData);
                alert("Cập nhật giáo viên thành công!");
                console.log(teacherData.vai_tro);
            } else {
                await axios.post("http://localhost:5093/api/GiaoVien/add-giaovien", teacherData);
                alert("Thêm giáo viên thành công!");
            }

            fetchTeachers();
            handleCloseDialog();
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
            alert(error.response?.data?.message || "Lỗi không xác định!");
        }
    };

    const handleEditClick = (teacher) => {
        setEditMode(true);
        setSelectedTeacher(teacher);
        setTeacherData({ ...teacher, mat_khau: "" });
        setOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa giáo viên này không?")) {
            try {
                await axios.delete(`http://localhost:5093/api/GiaoVien/${id}`);
                alert("Xóa giáo viên thành công!");
                fetchTeachers();
            } catch (error) {
                console.error("Lỗi khi xóa giáo viên:", error);
                alert("Xóa giáo viên thất bại!");
            }
        }
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedTeacher(null);
        setTeacherData({
            ma_so_giao_vien: "", ho_ten_giao_vien: "", chuc_vu: "", ten_dang_nhap: "", mat_khau: "",
            phan_quyen: "", trang_thai: "1", vai_tro: "", phong_ban: "", thong_tin_lien_he: ""
        });
    };

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Danh sách Giáo Viên
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px", gap: "10px" }}>
                <TextField
                    label="Tìm kiếm"
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{
                        width: "300px",
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "25px",
                            backgroundColor: "#f5f5f5",
                            "&:hover": {
                                backgroundColor: "#e0e0e0",
                            },
                            "&.Mui-focused": {
                                backgroundColor: "#ffffff",
                                boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
                            },
                        },
                        "& .MuiInputLabel-root": {
                            color: "#555",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#1976d2",
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "#1976d2" }} />
                            </InputAdornment>
                        ),
                        endAdornment: searchTerm && (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClearSearch}>
                                    <ClearIcon sx={{ color: "#1976d2" }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                >
                    Thêm Giáo Viên
                </Button>
            </Box>

            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>{editMode ? "Cập nhật Giáo Viên" : "Thêm Giáo Viên"}</DialogTitle>
                <DialogContent>
                    <TextField label="MSGV" name="ma_so_giao_vien" fullWidth margin="dense" value={teacherData.ma_so_giao_vien} onChange={handleInputChange} required />
                    <TextField label="Họ tên" name="ho_ten_giao_vien" fullWidth margin="dense" value={teacherData.ho_ten_giao_vien} onChange={handleInputChange} required />
                    <TextField label="Chức vụ" name="chuc_vu" fullWidth margin="dense" value={teacherData.chuc_vu} onChange={handleInputChange} required />
                    <TextField label="Tên đăng nhập" name="ten_dang_nhap" fullWidth margin="dense" value={teacherData.ten_dang_nhap} onChange={handleInputChange} required />
                    <TextField
                        label="Mật khẩu"
                        type="password"
                        name="mat_khau"
                        fullWidth
                        margin="dense"
                        value={teacherData.mat_khau}
                        onChange={handleInputChange}
                        placeholder={editMode ? "Để trống nếu không đổi" : ""}
                    />
                    <TextField label="Vai Trò" name="vai_tro" fullWidth margin="dense" value={teacherData.vai_tro} onChange={handleInputChange} required />
                    <TextField label="Phân Quyền" name="phan_quyen" fullWidth margin="dense" value={teacherData.phan_quyen} onChange={handleInputChange} required />
                    <TextField label="Phòng ban" name="phong_ban" fullWidth margin="dense" value={teacherData.phong_ban} onChange={handleInputChange} />
                    <TextField label="Thông tin liên hệ" name="thong_tin_lien_he" fullWidth margin="dense" value={teacherData.thong_tin_lien_he} onChange={handleInputChange} />
                    <TextField label="Trạng thái" name="trang_thai" fullWidth margin="dense" value={teacherData.trang_thai} onChange={handleInputChange} required />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
                    <Button onClick={handleAddOrUpdateTeacher} color="primary">{editMode ? "Cập nhật" : "Thêm"}</Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>MSGV</TableCell>
                            <TableCell>Họ Tên</TableCell>
                            <TableCell>Chức vụ</TableCell>
                            <TableCell>Tên Đăng Nhập</TableCell>
                            <TableCell>Trạng Thái</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTeachers.map((teacher) => (
                            <TableRow key={teacher.giao_vien_id}>
                                <TableCell>{teacher.ma_so_giao_vien}</TableCell>
                                <TableCell>{teacher.ho_ten_giao_vien}</TableCell>
                                <TableCell>{teacher.chuc_vu}</TableCell>
                                <TableCell>{teacher.ten_dang_nhap}</TableCell>
                                <TableCell>{teacher.trang_thai}</TableCell>
                                <TableCell>
                                    <Button
                                        color="success"
                                        startIcon={<EditIcon />}
                                        size="small"
                                        sx={{ marginLeft: "100px" }}
                                        onClick={() => handleEditClick(teacher)}
                                    />
                                    <Button
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        size="small"
                                        sx={{ marginLeft: "0px" }}
                                        onClick={() => handleDeleteClick(teacher.giao_vien_id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default GiaoVienScreen;