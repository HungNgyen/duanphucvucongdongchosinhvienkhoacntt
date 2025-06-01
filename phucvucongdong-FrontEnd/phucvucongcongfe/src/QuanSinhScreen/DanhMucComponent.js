







import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const DanhMucComponent = () => {
    const [danhMuc, setDanhMuc] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedDanhMuc, setSelectedDanhMuc] = useState(null);
    const [formData, setFormData] = useState({
        ten_danh_muc: "",
        mo_ta: "",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [detailOpen, setDetailOpen] = useState(false);

    const filteredDanhMuc = danhMuc.filter((dm) =>
        dm.ten_danh_muc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dm.mo_ta.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetchDanhMuc();
    }, []);

    const fetchDanhMuc = async () => {
        try {
            const response = await axios.get("http://localhost:5093/api/DanhMucPVCongDong");
            setDanhMuc(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách danh mục:", error);
        }
    };

    const handleOpen = (danhMucItem = null) => {
        setSelectedDanhMuc(danhMucItem);
        setEditMode(!!danhMucItem);
        setFormData(danhMucItem || { ten_danh_muc: "", mo_ta: "" });
        setOpen(true);
    };

    const handleDetailOpen = (danhMucItem) => {
        setSelectedDanhMuc(danhMucItem);
        setDetailOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ ten_danh_muc: "", mo_ta: "" });
    };

    const handleDetailClose = () => {
        setDetailOpen(false);
        setSelectedDanhMuc(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            if (editMode) {
                await axios.put(
                    `http://localhost:5093/api/DanhMucPVCongDong/${selectedDanhMuc.danh_muc_id}`,
                    formData
                );
            } else {
                await axios.post("http://localhost:5093/api/DanhMucPVCongDong", formData);
            }
            fetchDanhMuc();
            handleClose();
        } catch (error) {
            console.error("Lỗi khi thêm/sửa danh mục:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
            try {
                await axios.delete(`http://localhost:5093/api/DanhMucPVCongDong/${id}`);
                fetchDanhMuc();
            } catch (error) {
                console.error("Lỗi khi xóa danh mục:", error);
            }
        }
    };

    return (
        <Box sx={{ padding: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Quản lý Danh Mục
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <TextField
                        label="Tìm kiếm danh mục"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ width: 300 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpen()}
                    >
                        Thêm Danh Mục
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên Danh Mục</TableCell>
                            <TableCell>Mô Tả</TableCell>
                            <TableCell>Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDanhMuc.map((dm) => (
                            <TableRow
                                key={dm.danh_muc_id}
                                hover
                                onClick={() => handleDetailOpen(dm)}
                                sx={{ cursor: "pointer" }}
                            >
                                <TableCell>{dm.ten_danh_muc}</TableCell>
                                <TableCell>{dm.mo_ta}</TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <Button
                                        color="warning"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleOpen(dm)}
                                    />
                                    <Button
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDelete(dm.danh_muc_id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? "Sửa Danh Mục" : "Thêm Danh Mục"}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Tên Danh Mục"
                        name="ten_danh_muc"
                        value={formData.ten_danh_muc}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Mô Tả"
                        name="mo_ta"
                        value={formData.mo_ta}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editMode ? "Cập Nhật" : "Thêm Mới"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={detailOpen} onClose={handleDetailClose}>
                <DialogTitle sx={{ backgroundColor: "#1976d2", color: "white", minwidth: '800px, padding: "16px 24px"' }}>Chi Tiết Danh Mục</DialogTitle>
                <DialogContent>
                    {selectedDanhMuc && (
                        <>
                            <Typography variant="subtitle1">
                                <strong>Tên Danh Mục:</strong> {selectedDanhMuc.ten_danh_muc}
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Mô Tả:</strong> {selectedDanhMuc.mo_ta}
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDetailClose} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DanhMucComponent;