









import React, { useState, useEffect } from "react";
import {
    Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogActions,
    DialogContent, DialogTitle, TextField, Paper, MenuItem, Typography, Stack
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const TieuChiComponent = () => {
    const [tieuChi, setTieuChi] = useState([]);
    const [danhMuc, setDanhMuc] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedTieuChi, setSelectedTieuChi] = useState(null);
    const [formData, setFormData] = useState({
        ten_tieu_chi: "",
        mo_ta: "",
        diem: 0,
        danh_muc_id: null,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [detailOpen, setDetailOpen] = useState(false);

    const filteredTieuChi = tieuChi.filter((tc) =>
        tc.ten_tieu_chi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tc.mo_ta.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetchTieuChi();
        fetchDanhMuc();
    }, []);

    const fetchTieuChi = async () => {
        try {
            const response = await axios.get("http://localhost:5093/api/TieuChi");
            setTieuChi(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách tiêu chí:", error);
        }
    };

    const fetchDanhMuc = async () => {
        try {
            const response = await axios.get("http://localhost:5093/api/DanhMucPVCongDong");
            setDanhMuc(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách danh mục:", error);
        }
    };

    const handleOpen = (tieuChi = null) => {
        setSelectedTieuChi(tieuChi);
        setEditMode(!!tieuChi);
        setFormData(
            tieuChi || { ten_tieu_chi: "", mo_ta: "", diem: 0, danh_muc_id: null }
        );
        setOpen(true);
    };

    const handleDetailOpen = (tieuChiItem) => {
        setSelectedTieuChi(tieuChiItem);
        setDetailOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({ ten_tieu_chi: "", mo_ta: "", diem: 0, danh_muc_id: null });
    };

    const handleDetailClose = () => {
        setDetailOpen(false);
        setSelectedTieuChi(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value === "" ? null : value });
    };

    const handleSubmit = async () => {
        try {
            if (editMode) {
                await axios.put(
                    `http://localhost:5093/api/TieuChi/${selectedTieuChi.tieu_chi_id}`,
                    formData
                );
            } else {
                await axios.post("http://localhost:5093/api/TieuChi", formData);
            }
            fetchTieuChi();
            handleClose();
        } catch (error) {
            console.error("Lỗi khi thêm/sửa tiêu chí:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tiêu chí này không?")) {
            try {
                await axios.delete(`http://localhost:5093/api/TieuChi/${id}`);
                fetchTieuChi();
            } catch (error) {
                console.error("Lỗi khi xóa tiêu chí:", error);
            }
        }
    };

    return (
        <Box sx={{ padding: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Quản lý Tiêu Chí
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <TextField
                        label="Tìm kiếm tiêu chí"
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
                        Thêm Tiêu Chí
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 200, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Tên Tiêu Chí</TableCell>
                            <TableCell sx={{ width: 300, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Mô Tả</TableCell>
                            <TableCell sx={{ width: 80, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Điểm</TableCell>
                            <TableCell sx={{ width: 150, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Tên Danh Mục</TableCell>
                            <TableCell sx={{ width: 100, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center" }}>Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTieuChi.map((tc) => (
                            <TableRow
                                key={tc.tieu_chi_id}
                                hover
                                onClick={() => handleDetailOpen(tc)}
                                sx={{ cursor: "pointer" }}
                            >
                                <TableCell sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={tc.ten_tieu_chi}>
                                    {tc.ten_tieu_chi}
                                </TableCell>
                                <TableCell sx={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={tc.mo_ta}>
                                    {tc.mo_ta}
                                </TableCell>
                                <TableCell sx={{ textAlign: "left" }}>{tc.diem}</TableCell>
                                <TableCell sx={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {danhMuc.find((dm) => dm.danh_muc_id === tc.danh_muc_id)?.ten_danh_muc || "Không có"}
                                </TableCell>
                                <TableCell onClick={(e) => e.stopPropagation()}>
                                    <Stack direction="row" spacing={-2} justifyContent="center">
                                        <Button
                                            color="warning"
                                            startIcon={<EditIcon />}
                                            onClick={() => handleOpen(tc)}
                                        />
                                        <Button
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDelete(tc.tieu_chi_id)}
                                        />
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? "Sửa Tiêu Chí" : "Thêm Tiêu Chí"}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Tên Tiêu Chí"
                        name="ten_tieu_chi"
                        value={formData.ten_tieu_chi}
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
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Điểm"
                        name="diem"
                        type="number"
                        value={formData.diem}
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        fullWidth
                        margin="dense"
                        label="Danh Mục"
                        name="danh_muc_id"
                        value={formData.danh_muc_id || ""}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Không có</MenuItem>
                        {danhMuc.map((dm) => (
                            <MenuItem key={dm.danh_muc_id} value={dm.danh_muc_id}>
                                {dm.ten_danh_muc}
                            </MenuItem>
                        ))}
                    </TextField>
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

            <Dialog
                open={detailOpen}
                onClose={handleDetailClose}
                PaperProps={{
                    sx: {
                        marginTop: "80px",
                        width: "700px",
                        maxWidth: "700px",
                        height: "400px",
                    },
                }}
                scroll="paper"
            >
                <DialogTitle sx={{ backgroundColor: "#1976d2", color: "white", padding: "16px 24px" }}>
                    Chi Tiết Tiêu Chí
                </DialogTitle>
                <DialogContent dividers>
                    {selectedTieuChi && (
                        <Box>


                            <Typography variant="subtitle1">
                                <strong>Tên Tiêu Chí:</strong> {selectedTieuChi.ten_tieu_chi}
                            </Typography>

                            <Typography variant="subtitle1">
                                <strong>Mô Tả:</strong> {selectedTieuChi.mo_ta}
                            </Typography>

                            <Typography variant="subtitle1">
                                <strong>Điểm:</strong> {selectedTieuChi.diem}
                            </Typography>

                            <Typography variant="subtitle1">
                                <strong>Tên Danh Mục:</strong> {danhMuc.find((dm) => dm.danh_muc_id === selectedTieuChi.danh_muc_id)?.ten_danh_muc || "Không có"}
                            </Typography>

                        </Box>
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

export default TieuChiComponent;