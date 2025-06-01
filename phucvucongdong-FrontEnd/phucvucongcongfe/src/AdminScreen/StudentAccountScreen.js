








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

const SinhVienScreen = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [studentData, setStudentData] = useState({
        ho_ten_sinh_vien: "", lop: "", nganh: "", ten_dang_nhap: "", mat_khau: "",
        phan_quyen: "", trang_thai: "1", vai_tro: "", phong_ban: "", thong_tin_lien_he: "", ma_so_sinh_vien: ""
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5093/api/SinhVien");
            const data = response.data || [];
            setStudents(data);
            setFilteredStudents(data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách sinh viên:", error);
            setStudents([]);
            setFilteredStudents([]);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filtered = students.filter((student) =>
            student.ma_so_sinh_vien.toLowerCase().includes(term.toLowerCase()) ||
            student.ho_ten_sinh_vien.toLowerCase().includes(term.toLowerCase()) ||
            student.lop.toLowerCase().includes(term.toLowerCase()) ||
            student.ten_dang_nhap.toLowerCase().includes(term.toLowerCase()) ||
            student.nganh.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredStudents(filtered);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setFilteredStudents(students);
    };

    const handleInputChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddOrUpdateStudent = async () => {
        try {
            let updatedData = { ...studentData };

            if (editMode) {
                if (!updatedData.mat_khau) {
                    delete updatedData.mat_khau;
                }
                await axios.put(`http://localhost:5093/api/SinhVien/${selectedStudent.sinh_vien_id}`, updatedData);
                alert("Cập nhật sinh viên thành công!");
            } else {
                await axios.post("http://localhost:5093/api/SinhVien/add-sinhvien", studentData);
                alert("Thêm sinh viên thành công!");
            }

            fetchStudents();
            handleCloseDialog();
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu:", error);
            let errorMessage = "Thao tác thất bại!";
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                errorMessage = Object.values(errors).flat().join("\n");
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            alert(errorMessage);
        }
    };

    const handleEditClick = (student) => {
        setEditMode(true);
        setSelectedStudent(student);
        setStudentData({ ...student, mat_khau: "" });
        setOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
            try {
                await axios.delete(`http://localhost:5093/api/SinhVien/${id}`);
                alert("Xóa sinh viên thành công!");
                fetchStudents();
            } catch (error) {
                console.error("Lỗi khi xóa sinh viên:", error);
                alert("Xóa sinh viên thất bại!");
            }
        }
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedStudent(null);
        setStudentData({
            ho_ten_sinh_vien: "", lop: "", nganh: "", ten_dang_nhap: "", mat_khau: "",
            phan_quyen: "", trang_thai: "1", vai_tro: "", phong_ban: "", thong_tin_lien_he: "", ma_so_sinh_vien: ""
        });
    };

    return (
        <Box sx={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Danh sách Sinh Viên
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
                    Thêm Sinh Viên
                </Button>
            </Box>

            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>{editMode ? "Cập nhật Sinh Viên" : "Thêm Sinh Viên"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="MSSV"
                        name="ma_so_sinh_vien"
                        fullWidth
                        margin="dense"
                        value={studentData.ma_so_sinh_vien}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Họ tên"
                        name="ho_ten_sinh_vien"
                        fullWidth
                        margin="dense"
                        value={studentData.ho_ten_sinh_vien}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Lớp"
                        name="lop"
                        fullWidth
                        margin="dense"
                        value={studentData.lop}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Ngành"
                        name="nganh"
                        fullWidth
                        margin="dense"
                        value={studentData.nganh}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Tên đăng nhập"
                        name="ten_dang_nhap"
                        fullWidth
                        margin="dense"
                        value={studentData.ten_dang_nhap}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Mật khẩu"
                        type="password"
                        name="mat_khau"
                        fullWidth
                        margin="dense"
                        value={studentData.mat_khau}
                        onChange={handleInputChange}
                        placeholder={editMode ? "Để trống nếu không đổi" : ""}
                    />
                    <TextField
                        label="Vai Trò"
                        name="vai_tro"
                        fullWidth
                        margin="dense"
                        value={studentData.vai_tro}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Phân Quyền"
                        name="phan_quyen"
                        fullWidth
                        margin="dense"
                        value={studentData.phan_quyen}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Phòng ban"
                        name="phong_ban"
                        fullWidth
                        margin="dense"
                        value={studentData.phong_ban}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Thông tin liên hệ"
                        name="thong_tin_lien_he"
                        fullWidth
                        margin="dense"
                        value={studentData.thong_tin_lien_he}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Trạng thái"
                        name="trang_thai"
                        fullWidth
                        margin="dense"
                        value={studentData.trang_thai}
                        onChange={handleInputChange}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Hủy</Button>
                    <Button onClick={handleAddOrUpdateStudent} color="primary">{editMode ? "Cập nhật" : "Thêm"}</Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Lớp</TableCell>
                            <TableCell>MSSV</TableCell>
                            <TableCell>Họ Tên</TableCell>
                            <TableCell>Ngành</TableCell>
                            <TableCell>Tên Đăng Nhập</TableCell>
                            <TableCell>Trạng Thái</TableCell>
                            <TableCell sx={{ textAlign: "center" }}>Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudents.map((student) => (
                            <TableRow key={student.sinh_vien_id}>
                                <TableCell>{student.lop}</TableCell>
                                <TableCell>{student.ma_so_sinh_vien}</TableCell>
                                <TableCell>{student.ho_ten_sinh_vien}</TableCell>
                                <TableCell>{student.nganh}</TableCell>
                                <TableCell>{student.ten_dang_nhap}</TableCell>
                                <TableCell>{student.trang_thai}</TableCell>
                                <TableCell>
                                    <Button
                                        color="success"
                                        startIcon={<EditIcon />}
                                        size="small"
                                        sx={{ marginLeft: "50px" }}
                                        onClick={() => handleEditClick(student)}
                                    />
                                    <Button
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        size="small"
                                        sx={{ marginLeft: "0px" }}
                                        onClick={() => handleDeleteClick(student.sinh_vien_id)}
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

export default SinhVienScreen;