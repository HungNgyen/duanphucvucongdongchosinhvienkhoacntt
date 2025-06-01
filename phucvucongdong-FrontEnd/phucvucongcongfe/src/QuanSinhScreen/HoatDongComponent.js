












// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow,
//     Paper,
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     MenuItem,
//     Alert,
//     Stack,
//     Accordion,
//     AccordionSummary,
//     AccordionDetails,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import axios from "axios";
// import Cookies from "js-cookie";

// const HoatDongComponent = () => {
//     const [sinhVienFiltered, setSinhVienFiltered] = useState([]);
//     const [giaoVienList, setGiaoVienList] = useState([]);
//     const [lopList, setLopList] = useState([]);
//     const [selectedGiaoVien, setSelectedGiaoVien] = useState("");
//     const [selectedLop, setSelectedLop] = useState("");
//     const [hoatDong, setHoatDong] = useState([]);
//     const [tieuChi, setTieuChi] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedHoatDong, setSelectedHoatDong] = useState(null);
//     const [formData, setFormData] = useState({
//         ten_hoat_dong: "",
//         mo_ta: "",
//         tieu_chi_id: "",
//         ngay_bat_dau: "",
//         ngay_ket_thuc: "",
//         diem: "",
//         so_luong_nguoi_tham_gia: "",
//         so_luong_nguoi_nop_minh_chung: "",
//         tong_so_nguoi_tham_gia: "",
//         nam_hoc: "",
//         hoc_ky: "",
//         is_hidden: "",
//     });
//     const [error, setError] = useState("");
//     const [detailOpen, setDetailOpen] = useState(false);
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [activeFilter, setActiveFilter] = useState("");
//     const [selectedClasses, setSelectedClasses] = useState([]);
//     const [openThemSinhVien, setOpenThemSinhVien] = useState(false);
//     const [lopInput, setLopInput] = useState("");
//     const [themSinhVienError, setThemSinhVienError] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [expanded, setExpanded] = useState("");

//     const filteredHoatDong = hoatDong.filter((hd) =>
//         hd.ten_hoat_dong.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         hd.mo_ta.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const groupedHoatDong = filteredHoatDong.reduce((acc, hd) => {
//         const namHoc = hd.nam_hoc || "Không xác định";
//         if (!acc[namHoc]) {
//             acc[namHoc] = [];
//         }
//         acc[namHoc].push(hd);
//         return acc;
//     }, {});

//     const sortedNamHoc = Object.keys(groupedHoatDong).sort((a, b) => {
//         if (a === "Không xác định") return 1;
//         if (b === "Không xác định") return -1;
//         return b.localeCompare(a);
//     });

//     const handleAccordionChange = (panel) => (event, isExpanded) => {
//         setExpanded(isExpanded ? panel : "");
//     };

//     const calculateNamHocAndHocKy = (ngayBatDau) => {
//         if (!ngayBatDau) return { nam_hoc: "", hoc_ky: "" };

//         const date = new Date(ngayBatDau);
//         const month = date.getMonth() + 1; // getMonth() returns 0-11
//         const year = date.getFullYear();

//         let nam_hoc = "";
//         let hoc_ky = "";

//         // Calculate nam_hoc
//         if (month >= 8) {
//             nam_hoc = `${year}-${year + 1}`;
//         } else {
//             nam_hoc = `${year - 1}-${year}`;
//         }

//         // Calculate hoc_ky
//         if (month >= 8 && month <= 12) {
//             hoc_ky = "1";
//         } else if (month >= 1 && month <= 5) {
//             hoc_ky = "2";
//         } else {
//             hoc_ky = "";
//         }

//         return { nam_hoc, hoc_ky };
//     };

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

//     const nguoiDungId = user ? user.nguoi_dung_id : null;

//     const fetchSinhVienByFilter = async () => {
//         if (!nguoiDungId) {
//             console.error("Không tìm thấy nguoi_dung_id. Vui lòng đăng nhập lại.");
//             return;
//         }

//         if (!selectedLop && lopList.length > 0) {
//             setSelectedLop(lopList[0].lop);
//             return;
//         }

//         if (!selectedLop || !selectedHoatDong) {
//             console.warn("Chưa có lớp hoặc hoạt động được chọn để lọc.");
//             return;
//         }

//         try {
//             const response = await axios.get("http://localhost:5093/api/GiaoVien/danh-sach-sinh-vien-theo-lop", {
//                 params: {
//                     hoat_dong_id: selectedHoatDong.hoat_dong_id,
//                     nguoi_dung_id: nguoiDungId,
//                     lop: selectedLop,
//                 },
//             });
//             const sinhVienWithMinhChung = await Promise.all(
//                 response.data.map(async (sv) => {
//                     try {
//                         const hoatDongRes = await axios.get(
//                             `http://localhost:5093/api/SinhVien/${sv.sinh_vien_id}/chitiethoatdongcuasinhvien`
//                         );
//                         const hoatDong = hoatDongRes.data.find(
//                             (hd) => hd.hoat_dong_id === selectedHoatDong.hoat_dong_id
//                         );
//                         const isParticipating = !!hoatDong || selectedClasses.includes(sv.lop);
//                         return {
//                             ...sv,
//                             minh_chung: hoatDong ? hoatDong.minh_chung : null,
//                             da_nop_minh_chung: hoatDong ? hoatDong.da_nop_minh_chung || false : false,
//                             isParticipating,
//                         };
//                     } catch (error) {
//                         console.error(`Lỗi khi lấy chi tiết hoạt động cho sinh viên ${sv.sinh_vien_id}:`, error);
//                         return {
//                             ...sv,
//                             minh_chung: null,
//                             da_nop_minh_chung: false,
//                             isParticipating: selectedClasses.includes(sv.lop),
//                         };
//                     }
//                 })
//             );
//             setSinhVienFiltered(sinhVienWithMinhChung);
//         } catch (error) {
//             console.error("Lỗi khi lọc sinh viên:", error);
//         }
//     };

//     const fetchDanhSachGiaoVien = async () => {
//         if (!nguoiDungId) {
//             console.error("Không tìm thấy nguoi_dung_id. Vui lòng đăng nhập lại.");
//             return;
//         }
//         try {
//             const response = await axios.get("http://localhost:5093/api/GiaoVien/danh-sach-giao-vien", {
//                 params: {
//                     hoat_dong_id: selectedHoatDong?.hoat_dong_id,
//                     nguoi_dung_id: nguoiDungId,
//                 },
//             });
//             const giaoVienWithParticipation = response.data.map((gv) => ({
//                 ...gv,
//                 isParticipating: gv.tham_gia_hoat_dong?.includes(selectedHoatDong?.hoat_dong_id) || false,
//             }));
//             setGiaoVienList(giaoVienWithParticipation);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách giáo viên:", error);
//         }
//     };

//     useEffect(() => {
//         if (selectedHoatDong && nguoiDungId && activeFilter === "student") {
//             fetchSinhVienByFilter();
//         }
//     }, [selectedLop, selectedHoatDong, nguoiDungId, activeFilter, selectedClasses]);

//     useEffect(() => {
//         if (selectedHoatDong && nguoiDungId && activeFilter === "teacher") {
//             fetchDanhSachGiaoVien();
//         }
//     }, [selectedGiaoVien, selectedHoatDong, nguoiDungId, activeFilter]);

//     const fetchDanhSachLop = async () => {
//         if (!nguoiDungId) {
//             console.error("Không tìm thấy nguoi_dung_id. Vui lòng đăng nhập lại.");
//             return;
//         }
//         try {
//             const response = await axios.get("http://localhost:5093/api/GiaoVien/danh-sach-lop-sinh-vien", {
//                 params: { nguoi_dung_id: nguoiDungId },
//             });
//             setLopList(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách lớp sinh viên:", error);
//         }
//     };

//     const fetchHoatDong = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/HoatDong/danhsachtatcahoatdong");
//             setHoatDong(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách hoạt động:", error);
//         }
//     };

//     const fetchTieuChi = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TieuChi");
//             setTieuChi(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tiêu chí:", error);
//         }
//     };

//     useEffect(() => {
//         if (!nguoiDungId) {
//             return;
//         }
//         fetchHoatDong();
//         fetchTieuChi();
//         fetchDanhSachGiaoVien();
//         fetchDanhSachLop();
//     }, [nguoiDungId]);

//     const handleOpen = (hoatDong = null) => {
//         setSelectedHoatDong(hoatDong);
//         setEditMode(!!hoatDong);
//         setError("");
//         setFormData(
//             hoatDong
//                 ? {
//                     ten_hoat_dong: hoatDong.ten_hoat_dong || "",
//                     mo_ta: hoatDong.mo_ta || "",
//                     tieu_chi_id: hoatDong.tieu_chi_id || "",
//                     ngay_bat_dau: hoatDong.ngay_bat_dau
//                         ? new Date(hoatDong.ngay_bat_dau).toISOString().slice(0, 16)
//                         : "",
//                     ngay_ket_thuc: hoatDong.ngay_ket_thuc
//                         ? new Date(hoatDong.ngay_ket_thuc).toISOString().slice(0, 16)
//                         : "",
//                     diem: hoatDong.diem || "",
//                     tong_so_nguoi_tham_gia: hoatDong.tong_so_nguoi_tham_gia || "",
//                     nam_hoc: hoatDong.nam_hoc || "",
//                     hoc_ky: hoatDong.hoc_ky || "",
//                     is_hidden: hoatDong.is_hidden ? "true" : "false",
//                 }
//                 : {
//                     ten_hoat_dong: "",
//                     mo_ta: "",
//                     tieu_chi_id: "",
//                     ngay_bat_dau: "",
//                     ngay_ket_thuc: "",
//                     diem: "",
//                     tong_so_nguoi_tham_gia: "",
//                     nam_hoc: "",
//                     hoc_ky: "",
//                     is_hidden: "true",
//                 }
//         );
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setFormData({
//             ten_hoat_dong: "",
//             mo_ta: "",
//             tieu_chi_id: "",
//             ngay_bat_dau: "",
//             ngay_ket_thuc: "",
//             diem: "",
//             tong_so_nguoi_tham_gia: "",
//             nam_hoc: "",
//             hoc_ky: "",
//             is_hidden: "true",
//         });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "tieu_chi_id") {
//             const selectedTieuChi = tieuChi.find((tc) => tc.tieu_chi_id === value);
//             setFormData({ ...formData, [name]: value, diem: selectedTieuChi ? selectedTieuChi.diem : "" });
//         } else if (name === "ngay_bat_dau") {
//             const { nam_hoc, hoc_ky } = calculateNamHocAndHocKy(value);
//             setFormData({
//                 ...formData,
//                 [name]: value,
//                 nam_hoc: editMode ? formData.nam_hoc : nam_hoc,
//                 hoc_ky: editMode ? formData.hoc_ky : hoc_ky,
//             });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSubmit = async () => {
//         if (!formData.ten_hoat_dong.trim()) {
//             setError("Tên hoạt động không được để trống.");
//             return;
//         }
//         if (!formData.mo_ta.trim()) {
//             setError("Mô tả không được để trống.");
//             return;
//         }
//         if (!formData.nam_hoc.trim()) {
//             setError("Năm học không được để trống.");
//             return;
//         }
//         if (!formData.hoc_ky) {
//             setError("Học kỳ không được để trống.");
//             return;
//         }

//         const submitData = {
//             ...formData,
//             ngay_bat_dau: formData.ngay_bat_dau ? new Date(formData.ngay_bat_dau).toISOString() : null,
//             ngay_ket_thuc: formData.ngay_ket_thuc ? new Date(formData.ngay_ket_thuc).toISOString() : null,
//             tieu_chi_id: formData.tieu_chi_id || null,
//             tong_so_nguoi_tham_gia: formData.tong_so_nguoi_tham_gia || null,
//             nam_hoc: formData.nam_hoc,
//             hoc_ky: formData.hoc_ky,
//             is_hidden: formData.is_hidden === "true",
//         };

//         try {
//             if (editMode) {
//                 await axios.put(`http://localhost:5093/api/HoatDong/${selectedHoatDong.hoat_dong_id}`, submitData);
//             } else {
//                 await axios.post("http://localhost:5093/api/HoatDong", submitData);
//             }
//             fetchHoatDong();
//             handleClose();
//         } catch (error) {
//             console.error("Lỗi khi thêm/sửa hoạt động:", error);
//             setError("Đã xảy ra lỗi khi lưu hoạt động. Vui lòng thử lại.");
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa hoạt động này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/HoatDong/${id}`);
//                 fetchHoatDong();
//             } catch (error) {
//                 console.error("Lỗi khi xóa hoạt động:", error);
//             }
//         }
//     };

//     const handleToggleHide = async (hoatDong) => {
//         try {
//             await axios.put(`http://localhost:5093/api/HoatDong/${hoatDong.hoat_dong_id}`, {
//                 ...hoatDong,
//                 is_hidden: !hoatDong.is_hidden,
//             });
//             fetchHoatDong();
//         } catch (error) {
//             console.error("Lỗi khi ẩn/hiện hoạt động:", error);
//         }
//     };

//     const handleRowClick = (hoatDong) => {
//         setSelectedHoatDong(hoatDong);
//         setDetailOpen(true);
//     };

//     const handleDetailClose = () => {
//         setSelectedHoatDong(null);
//         setDetailOpen(false);
//         setActiveFilter("");
//         setSelectedGiaoVien("");
//         setSelectedLop("");
//         setSelectedClasses([]);
//     };

//     const handleConfirmMinhChung = async (xac_nhan, sinhVien) => {
//         if (!sinhVien || !selectedHoatDong) {
//             setError("Không tìm thấy thông tin sinh viên hoặc hoạt động.");
//             return;
//         }

//         try {
//             await axios.post("http://localhost:5093/api/GiaoVien/xacnhanminhchungcuasinhvien", {
//                 hoat_dong_id: selectedHoatDong.hoat_dong_id,
//                 sinh_vien_id: sinhVien.sinh_vien_id,
//                 xac_nhan: xac_nhan,
//             });

//             await fetchSinhVienByFilter();
//             await fetchHoatDong();

//             alert(xac_nhan ? "Xác nhận minh chứng thành công!" : "Từ chối minh chứng thành công!");
//         } catch (error) {
//             console.error("Lỗi khi xử lý minh chứng:", error);
//             setError("Không thể xử lý minh chứng. Vui lòng thử lại.");
//         }
//     };

//     const handleOpenThemSinhVien = () => {
//         setLopInput("");
//         setThemSinhVienError("");
//         setOpenThemSinhVien(true);
//     };

//     const handleCloseThemSinhVien = () => {
//         setOpenThemSinhVien(false);
//         setLopInput("");
//         setThemSinhVienError("");
//     };

//     const handleThemSinhVien = async () => {
//         if (!lopInput.trim()) {
//             setThemSinhVienError("Vui lòng nhập danh sách lớp.");
//             return;
//         }

//         try {
//             await axios.post("http://localhost:5093/api/HoatDong/themsinhvienbatbuoc", {
//                 hoat_dong_id: selectedHoatDong.hoat_dong_id,
//                 lop: lopInput,
//             });

//             const classes = lopInput.split(",").map((lop) => lop.trim());
//             setSelectedClasses((prev) => [...new Set([...prev, ...classes])]);

//             await fetchSinhVienByFilter();
//             await fetchHoatDong();

//             alert("Thêm sinh viên tự động thành công!");
//             handleCloseThemSinhVien();
//         } catch (error) {
//             console.error("Lỗi khi thêm sinh viên:", error);
//             setThemSinhVienError(error.response?.data?.message || "Đã xảy ra lỗi khi thêm sinh viên.");
//         }
//     };

//     if (loading) {
//         return <Typography variant="h6">Đang tải...</Typography>;
//     }

//     if (!user || !nguoiDungId) {
//         return (
//             <Box>
//                 <Typography variant="h6" color="error">
//                     Vui lòng đăng nhập để tiếp tục.
//                 </Typography>
//                 <Button variant="contained" color="primary" onClick={() => (window.location.href = "/")}>
//                     Đăng Nhập
//                 </Button>
//             </Box>
//         );
//     }

//     return (
//         <Box>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                 <Typography variant="h4" gutterBottom>
//                     Quản lý Hoạt Động
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <TextField
//                         label="Tìm kiếm hoạt động"
//                         variant="outlined"
//                         size="small"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         sx={{ width: 300 }}
//                     />
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         startIcon={<AddIcon />}
//                         onClick={() => handleOpen()}
//                     >
//                         Thêm Hoạt Động
//                     </Button>
//                 </Box>
//             </Box>
//             {sortedNamHoc.length > 0 ? (
//                 sortedNamHoc.map((namHoc) => (
//                     <Accordion
//                         key={namHoc}
//                         expanded={expanded === namHoc}
//                         onChange={handleAccordionChange(namHoc)}
//                         sx={{ mb: 2 }}
//                     >
//                         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                             <Typography variant="h6">Năm học: {namHoc} ({groupedHoatDong[namHoc].length} hoạt động)</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ width: 200, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Tên Hoạt Động</TableCell>
//                                             <TableCell sx={{ width: 250, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Mô Tả</TableCell>
//                                             <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center" }}>Ngày Bắt Đầu</TableCell>
//                                             <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center" }}>Ngày Kết Thúc</TableCell>
//                                             <TableCell sx={{ width: 150, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Tiêu Chí</TableCell>
//                                             <TableCell sx={{ width: 80, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Điểm</TableCell>
//                                             <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Người Tham Gia</TableCell>
//                                             <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Nộp Minh Chứng</TableCell>
//                                             <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center" }}>Thao Tác</TableCell>
//                                             <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center" }}>Ẩn/Hiện</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {groupedHoatDong[namHoc].map((hd) => (
//                                             <TableRow
//                                                 key={hd.hoat_dong_id}
//                                                 hover
//                                                 onClick={() => handleRowClick(hd)}
//                                                 sx={{ cursor: "pointer", opacity: hd.is_hidden ? 0.5 : 1 }}
//                                             >
//                                                 <TableCell sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={hd.ten_hoat_dong}>
//                                                     {hd.ten_hoat_dong}
//                                                 </TableCell>
//                                                 <TableCell sx={{ maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={hd.mo_ta}>
//                                                     {hd.mo_ta}
//                                                 </TableCell>
//                                                 <TableCell sx={{ textAlign: "left" }}>{hd.ngay_bat_dau.split("T")[0]}</TableCell>
//                                                 <TableCell sx={{ textAlign: "left" }}>{hd.ngay_ket_thuc.split("T")[0]}</TableCell>
//                                                 <TableCell sx={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                                                     {tieuChi.find((tc) => tc.tieu_chi_id === hd.tieu_chi_id)?.ten_tieu_chi || "Không có"}
//                                                 </TableCell>
//                                                 <TableCell sx={{ textAlign: "left" }}>{hd.diem}</TableCell>
//                                                 <TableCell sx={{ textAlign: "left" }}>{hd.so_luong_nguoi_tham_gia}/{hd.tong_so_nguoi_tham_gia}</TableCell>
//                                                 <TableCell sx={{ textAlign: "left" }}>{hd.so_luong_nguoi_nop_minh_chung}/{hd.tong_so_nguoi_tham_gia}</TableCell>
//                                                 <TableCell sx={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
//                                                     <Stack direction="row" spacing={-2} justifyContent="center">
//                                                         <Button color="success" startIcon={<EditIcon />} onClick={() => handleOpen(hd)} />
//                                                         <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(hd.hoat_dong_id)} />
//                                                     </Stack>
//                                                 </TableCell>
//                                                 <TableCell sx={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
//                                                     <Button
//                                                         color={hd.is_hidden ? "primary" : "warning"}
//                                                         startIcon={hd.is_hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
//                                                         onClick={() => handleToggleHide(hd)}
//                                                     >
//                                                         {hd.is_hidden ? "Hiện" : "Ẩn"}
//                                                     </Button>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </Paper>
//                         </AccordionDetails>
//                     </Accordion>
//                 ))
//             ) : (
//                 <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
//                     Không tìm thấy hoạt động nào.
//                 </Typography>
//             )}

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa Hoạt Động" : "Thêm Hoạt Động"}</DialogTitle>
//                 <DialogContent>
//                     {error && (
//                         <Alert severity="error" sx={{ marginBottom: "10px" }}>
//                             {error}
//                         </Alert>
//                     )}
//                     <TextField
//                         fullWidth
//                         margin="dense"
//                         label="Tên Hoạt Động"
//                         name="ten_hoat_dong"
//                         value={formData.ten_hoat_dong}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         fullWidth
//                         margin="dense"
//                         label="Mô Tả"
//                         name="mo_ta"
//                         value={formData.mo_ta}
//                         onChange={handleChange}
//                     />
//                     <Box sx={{ display: "flex", gap: 2, marginTop: "8px" }}>
//                         <TextField
//                             fullWidth
//                             margin="dense"
//                             label="Năm Học"
//                             name="nam_hoc"
//                             value={formData.nam_hoc}
//                             onChange={handleChange}
//                             placeholder="Ví dụ: 2023-2024"
//                         />
//                         <TextField
//                             select
//                             fullWidth
//                             margin="dense"
//                             label="Học Kỳ"
//                             name="hoc_ky"
//                             value={formData.hoc_ky || ""}
//                             onChange={handleChange}
//                         >
//                             <MenuItem value="">Chọn học kỳ</MenuItem>
//                             <MenuItem value="1">Học kỳ 1</MenuItem>
//                             <MenuItem value="2">Học kỳ 2</MenuItem>
//                         </TextField>
//                         <TextField
//                             select
//                             fullWidth
//                             margin="dense"
//                             label="Ẩn/Hiện"
//                             name="is_hidden"
//                             value={formData.is_hidden}
//                             onChange={handleChange}
//                         >
//                             <MenuItem value="false">Hiện</MenuItem>
//                             <MenuItem value="true">Ẩn</MenuItem>
//                         </TextField>
//                     </Box>
//                     <TextField
//                         fullWidth
//                         margin="dense"
//                         label="Số người tham gia"
//                         name="tong_so_nguoi_tham_gia"
//                         value={formData.tong_so_nguoi_tham_gia}
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         fullWidth
//                         margin="dense"
//                         type="datetime-local"
//                         label="Ngày Bắt Đầu"
//                         name="ngay_bat_dau"
//                         value={formData.ngay_bat_dau}
//                         onChange={handleChange}
//                         InputLabelProps={{ shrink: true }}
//                     />
//                     <TextField
//                         fullWidth
//                         margin="dense"
//                         type="datetime-local"
//                         label="Ngày Kết Thúc"
//                         name="ngay_ket_thuc"
//                         value={formData.ngay_ket_thuc}
//                         onChange={handleChange}
//                         InputLabelProps={{ shrink: true }}
//                     />
//                     <TextField
//                         select
//                         fullWidth
//                         margin="dense"
//                         label="Tiêu Chí"
//                         name="tieu_chi_id"
//                         value={formData.tieu_chi_id}
//                         onChange={handleChange}
//                     >
//                         <MenuItem value="">Không có</MenuItem>
//                         {tieuChi.map((tc) => (
//                             <MenuItem key={tc.tieu_chi_id} value={tc.tieu_chi_id}>
//                                 {tc.ten_tieu_chi}
//                             </MenuItem>
//                         ))}
//                     </TextField>
//                     <TextField
//                         fullWidth
//                         margin="dense"
//                         label="Điểm"
//                         name="diem"
//                         value={formData.diem}
//                         InputProps={{ readOnly: true }}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">
//                         Hủy
//                     </Button>
//                     <Button onClick={handleSubmit} color="primary">
//                         {editMode ? "Cập Nhật" : "Thêm Mới"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog
//                 open={detailOpen}
//                 onClose={handleDetailClose}
//                 PaperProps={{
//                     sx: {
//                         marginTop: "80px",
//                         width: "90vw",
//                         maxWidth: "1200px",
//                         height: "80vh",
//                     },
//                 }}
//                 scroll="paper"
//             >
//                 <DialogTitle sx={{ backgroundColor: "#1976d2", color: "white", padding: "16px 24px" }}>
//                     Chi Tiết Hoạt Động
//                 </DialogTitle>
//                 <DialogContent dividers>
//                     {selectedHoatDong && (
//                         <Box>
//                             <Typography variant="subtitle1">
//                                 <strong>Tên:</strong> {selectedHoatDong.ten_hoat_dong}
//                             </Typography>
//                             <Typography variant="subtitle1">
//                                 <strong>Mô tả:</strong> {selectedHoatDong.mo_ta}
//                             </Typography>
//                             <Typography variant="subtitle1">
//                                 <strong>Năm học:</strong> {selectedHoatDong.nam_hoc || "Không xác định"}
//                             </Typography>
//                             <Typography variant="subtitle1">
//                                 <strong>Học kỳ:</strong> {selectedHoatDong.hoc_ky || "Không xác định"}
//                             </Typography>
//                             <Typography variant="subtitle1">
//                                 <strong>Ngày bắt đầu:</strong> {selectedHoatDong.ngay_bat_dau.split("T")[0]}
//                             </Typography>
//                             <Typography variant="subtitle1">
//                                 <strong>Ngày kết thúc:</strong> {selectedHoatDong.ngay_ket_thuc.split("T")[0]}
//                             </Typography>
//                             <Typography variant="subtitle1">
//                                 <strong>Tiêu chí:</strong>
//                                 {tieuChi.find((tc) => tc.tieu_chi_id === selectedHoatDong.tieu_chi_id)?.ten_tieu_chi ||
//                                     "Không có"}
//                             </Typography>
//                             <Typography variant="subtitle1">
//                                 <strong>Điểm:</strong> {selectedHoatDong.diem}
//                             </Typography>
//                             <Typography variant="subtitle1">
//                                 <strong>Số lượng người tham gia:</strong>
//                                 - {selectedHoatDong.so_luong_nguoi_tham_gia}/{selectedHoatDong.tong_so_nguoi_tham_gia}
//                             </Typography>
//                             <Typography variant="subtitle1">
//                                 <strong>Số người nộp minh chứng:</strong>{" "}
//                                 {selectedHoatDong.so_luong_nguoi_nop_minh_chung}/{selectedHoatDong.tong_so_nguoi_tham_gia}
//                             </Typography>
//                             <Box sx={{ mt: 2 }}>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     startIcon={<AddIcon />}
//                                     onClick={handleOpenThemSinhVien}
//                                 >
//                                     Thêm Sinh Viên Tự Động
//                                 </Button>
//                             </Box>
//                         </Box>
//                     )}

//                     <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//                         <TextField
//                             select
//                             label="Lọc theo Giáo Viên"
//                             value={selectedGiaoVien}
//                             onChange={(e) => {
//                                 setSelectedGiaoVien(e.target.value);
//                                 setActiveFilter("teacher");
//                                 setSelectedLop("");
//                             }}
//                             sx={{ minWidth: 200 }}
//                         >
//                             <MenuItem value="">Tất cả giáo viên</MenuItem>
//                             {giaoVienList.map((gv) => (
//                                 <MenuItem key={gv.giao_vien_id} value={gv.giao_vien_id}>
//                                     {gv.ho_ten_giao_vien}
//                                 </MenuItem>
//                             ))}
//                         </TextField>

//                         <TextField
//                             select
//                             label="Lọc theo Lớp"
//                             value={selectedLop}
//                             onChange={(e) => {
//                                 setSelectedLop(e.target.value);
//                                 setActiveFilter("student");
//                                 setSelectedGiaoVien("");
//                             }}
//                             sx={{ minWidth: 200 }}
//                         >
//                             <MenuItem value="">Tất cả lớp</MenuItem>
//                             {lopList.map((lop) => (
//                                 <MenuItem key={lop.lop} value={lop.lop}>
//                                     {lop.lop}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                     </Box>

//                     {activeFilter === "student" && (
//                         <>
//                             <Typography variant="h6">Danh sách sinh viên lọc theo lớp:</Typography>
//                             <Table>
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Lớp</TableCell>
//                                         <TableCell>MSSV</TableCell>
//                                         <TableCell>Họ tên</TableCell>
//                                         <TableCell>Điểm</TableCell>
//                                         <TableCell>Minh Chứng</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {sinhVienFiltered.map((sv) => (
//                                         <TableRow
//                                             key={sv.sinh_vien_id}
//                                             hover
//                                             sx={{
//                                                 cursor: "pointer",
//                                                 backgroundColor: sv.isParticipating ? "rgba(0, 255, 0, 0.1)" : "inherit",
//                                             }}
//                                         >
//                                             <TableCell>{sv.lop}</TableCell>
//                                             <TableCell>{sv.ma_so_sinh_vien}</TableCell>
//                                             <TableCell>{sv.ho_ten_sinh_vien}</TableCell>
//                                             <TableCell>{sv.diem}</TableCell>
//                                             <TableCell>
//                                                 {sv.minh_chung ? (
//                                                     <>
//                                                         <a href={sv.minh_chung} target="_blank" rel="noopener noreferrer">
//                                                             Xem minh chứng
//                                                         </a>
//                                                         <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
//                                                             <Button
//                                                                 size="small"
//                                                                 color="success"
//                                                                 variant="contained"
//                                                                 onClick={(e) => {
//                                                                     e.stopPropagation();
//                                                                     handleConfirmMinhChung(true, sv);
//                                                                 }}
//                                                                 disabled={sv.da_nop_minh_chung}
//                                                             >
//                                                                 ✅ Xác nhận
//                                                             </Button>
//                                                             <Button
//                                                                 size="small"
//                                                                 color="error"
//                                                                 variant="contained"
//                                                                 onClick={(e) => {
//                                                                     e.stopPropagation();
//                                                                     handleConfirmMinhChung(false, sv);
//                                                                 }}
//                                                                 disabled={sv.da_nop_minh_chung}
//                                                             >
//                                                                 ❌ Từ chối
//                                                             </Button>
//                                                         </Box>
//                                                     </>
//                                                 ) : (
//                                                     <Typography>Không có minh chứng</Typography>
//                                                 )}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </>
//                     )}

//                     {activeFilter === "teacher" && (
//                         <>
//                             <Typography variant="h6">Danh sách giáo viên:</Typography>
//                             <Table>
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Lớp phụ trách</TableCell>
//                                         <TableCell>MSGV</TableCell>
//                                         <TableCell>Họ tên</TableCell>
//                                         <TableCell>Điểm</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {giaoVienList.map((gv) => (
//                                         <TableRow
//                                             key={gv.giao_vien_id}
//                                             sx={{
//                                                 backgroundColor: gv.isParticipating ? "rgba(0, 255, 0, 0.1)" : "inherit",
//                                             }}
//                                         >
//                                             <TableCell>{gv.lop_phu_trach}</TableCell>
//                                             <TableCell>{gv.ma_so_giao_vien}</TableCell>
//                                             <TableCell>{gv.ho_ten_giao_vien}</TableCell>
//                                             <TableCell>{gv.diem}</TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleDetailClose} color="primary">
//                         Đóng
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={openThemSinhVien} onClose={handleCloseThemSinhVien}>
//                 <DialogTitle>Thêm Sinh Viên Tự Động</DialogTitle>
//                 <DialogContent>
//                     {themSinhVienError && (
//                         <Alert severity="error" sx={{ marginBottom: "10px" }}>
//                             {themSinhVienError}
//                         </Alert>
//                     )}
//                     <TextField
//                         fullWidth
//                         margin="dense"
//                         label="Danh sách lớp (cách nhau bằng dấu phẩy)"
//                         value={lopInput}
//                         onChange={(e) => setLopInput(e.target.value)}
//                         placeholder="Ví dụ: 21CT111,21CT112"
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseThemSinhVien} color="secondary">
//                         Hủy
//                     </Button>
//                     <Button onClick={handleThemSinhVien} color="primary">
//                         Xác Nhận
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default HoatDongComponent; //////////////////01062025 sửa timezone gốc































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
    MenuItem,
    Alert,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Cookies from "js-cookie";
import { format, parseISO } from "date-fns";

const HoatDongComponent = () => {
    const [sinhVienFiltered, setSinhVienFiltered] = useState([]);
    const [giaoVienList, setGiaoVienList] = useState([]);
    const [lopList, setLopList] = useState([]);
    const [selectedGiaoVien, setSelectedGiaoVien] = useState("");
    const [selectedLop, setSelectedLop] = useState("");
    const [hoatDong, setHoatDong] = useState([]);
    const [tieuChi, setTieuChi] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedHoatDong, setSelectedHoatDong] = useState(null);
    const [formData, setFormData] = useState({
        ten_hoat_dong: "",
        mo_ta: "",
        tieu_chi_id: "",
        ngay_bat_dau: "",
        ngay_ket_thuc: "",
        diem: "",
        so_luong_nguoi_tham_gia: "",
        so_luong_nguoi_nop_minh_chung: "",
        tong_so_nguoi_tham_gia: "",
        nam_hoc: "",
        hoc_ky: "",
        is_hidden: "",
    });
    const [error, setError] = useState("");
    const [detailOpen, setDetailOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("");
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [openThemSinhVien, setOpenThemSinhVien] = useState(false);
    const [lopInput, setLopInput] = useState("");
    const [themSinhVienError, setThemSinhVienError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [expanded, setExpanded] = useState("");

    const filteredHoatDong = hoatDong.filter((hd) =>
        hd.ten_hoat_dong.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hd.mo_ta.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedHoatDong = filteredHoatDong.reduce((acc, hd) => {
        const namHoc = hd.nam_hoc || "Không xác định";
        if (!acc[namHoc]) {
            acc[namHoc] = [];
        }
        acc[namHoc].push(hd);
        return acc;
    }, {});

    const sortedNamHoc = Object.keys(groupedHoatDong).sort((a, b) => {
        if (a === "Không xác định") return 1;
        if (b === "Không xác định") return -1;
        return b.localeCompare(a);
    });

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : "");
    };

    const calculateNamHocAndHocKy = (ngayBatDau) => {
        if (!ngayBatDau) return { nam_hoc: "", hoc_ky: "" };

        const date = parseISO(ngayBatDau);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        let nam_hoc = "";
        let hoc_ky = "";

        if (month >= 8) {
            nam_hoc = `${year}-${year + 1}`;
        } else {
            nam_hoc = `${year - 1}-${year}`;
        }

        if (month >= 8 && month <= 12) {
            hoc_ky = "1";
        } else if (month >= 1 && month <= 5) {
            hoc_ky = "2";
        } else {
            hoc_ky = "";
        }

        return { nam_hoc, hoc_ky };
    };

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

    const nguoiDungId = user ? user.nguoi_dung_id : null;

    const fetchSinhVienByFilter = async () => {
        if (!nguoiDungId) {
            console.error("Không tìm thấy nguoi_dung_id. Vui lòng đăng nhập lại.");
            return;
        }

        if (!selectedLop && lopList.length > 0) {
            setSelectedLop(lopList[0].lop);
            return;
        }

        if (!selectedLop || !selectedHoatDong) {
            console.warn("Chưa có lớp hoặc hoạt động được chọn để lọc.");
            return;
        }

        try {
            const response = await axios.get("http://localhost:5093/api/GiaoVien/danh-sach-sinh-vien-theo-lop", {
                params: {
                    hoat_dong_id: selectedHoatDong.hoat_dong_id,
                    nguoi_dung_id: nguoiDungId,
                    lop: selectedLop,
                },
            });
            const sinhVienWithMinhChung = await Promise.all(
                response.data.map(async (sv) => {
                    try {
                        const hoatDongRes = await axios.get(
                            `http://localhost:5093/api/SinhVien/${sv.sinh_vien_id}/chitiethoatdongcuasinhvien`
                        );
                        const hoatDong = hoatDongRes.data.find(
                            (hd) => hd.hoat_dong_id === selectedHoatDong.hoat_dong_id
                        );
                        const isParticipating = !!hoatDong || selectedClasses.includes(sv.lop);
                        return {
                            ...sv,
                            minh_chung: hoatDong ? hoatDong.minh_chung : null,
                            da_nop_minh_chung: hoatDong ? hoatDong.da_nop_minh_chung || false : false,
                            isParticipating,
                        };
                    } catch (error) {
                        console.error(`Lỗi khi lấy chi tiết hoạt động cho sinh viên ${sv.sinh_vien_id}:`, error);
                        return {
                            ...sv,
                            minh_chung: null,
                            da_nop_minh_chung: false,
                            isParticipating: selectedClasses.includes(sv.lop),
                        };
                    }
                })
            );
            setSinhVienFiltered(sinhVienWithMinhChung);
        } catch (error) {
            console.error("Lỗi khi lọc sinh viên:", error);
        }
    };

    const fetchDanhSachGiaoVien = async () => {
        if (!nguoiDungId) {
            console.error("Không tìm thấy nguoi_dung_id. Vui lòng đăng nhập lại.");
            return;
        }
        try {
            const response = await axios.get("http://localhost:5093/api/GiaoVien/danh-sach-giao-vien", {
                params: {
                    hoat_dong_id: selectedHoatDong?.hoat_dong_id,
                    nguoi_dung_id: nguoiDungId,
                },
            });
            const giaoVienWithParticipation = response.data.map((gv) => ({
                ...gv,
                isParticipating: gv.tham_gia_hoat_dong?.includes(selectedHoatDong?.hoat_dong_id) || false,
            }));
            setGiaoVienList(giaoVienWithParticipation);
        } catch (error) {
            console.error("Lỗi khi tải danh sách giáo viên:", error);
        }
    };

    useEffect(() => {
        if (selectedHoatDong && nguoiDungId && activeFilter === "student") {
            fetchSinhVienByFilter();
        }
    }, [selectedLop, selectedHoatDong, nguoiDungId, activeFilter, selectedClasses]);

    useEffect(() => {
        if (selectedHoatDong && nguoiDungId && activeFilter === "teacher") {
            fetchDanhSachGiaoVien();
        }
    }, [selectedGiaoVien, selectedHoatDong, nguoiDungId, activeFilter]);

    const fetchDanhSachLop = async () => {
        if (!nguoiDungId) {
            console.error("Không tìm thấy nguoi_dung_id. Vui lòng đăng nhập lại.");
            return;
        }
        try {
            const response = await axios.get("http://localhost:5093/api/GiaoVien/danh-sach-lop-sinh-vien", {
                params: { nguoi_dung_id: nguoiDungId },
            });
            setLopList(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách lớp sinh viên:", error);
        }
    };

    const fetchHoatDong = async () => {
        try {
            const response = await axios.get("http://localhost:5093/api/HoatDong/danhsachtatcahoatdong");
            setHoatDong(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách hoạt động:", error);
        }
    };

    const fetchTieuChi = async () => {
        try {
            const response = await axios.get("http://localhost:5093/api/TieuChi");
            setTieuChi(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách tiêu chí:", error);
        }
    };

    useEffect(() => {
        if (!nguoiDungId) {
            return;
        }
        fetchHoatDong();
        fetchTieuChi();
        fetchDanhSachGiaoVien();
        fetchDanhSachLop();
    }, [nguoiDungId]);

    const handleOpen = (hoatDong = null) => {
        setSelectedHoatDong(hoatDong);
        setEditMode(!!hoatDong);
        setError("");
        setFormData(
            hoatDong
                ? {
                    ten_hoat_dong: hoatDong.ten_hoat_dong || "",
                    mo_ta: hoatDong.mo_ta || "",
                    tieu_chi_id: hoatDong.tieu_chi_id || "",
                    ngay_bat_dau: hoatDong.ngay_bat_dau
                        ? format(parseISO(hoatDong.ngay_bat_dau), "yyyy-MM-dd'T'HH:mm")
                        : "",
                    ngay_ket_thuc: hoatDong.ngay_ket_thuc
                        ? format(parseISO(hoatDong.ngay_ket_thuc), "yyyy-MM-dd'T'HH:mm")
                        : "",
                    diem: hoatDong.diem || "",
                    tong_so_nguoi_tham_gia: hoatDong.tong_so_nguoi_tham_gia || "",
                    nam_hoc: hoatDong.nam_hoc || "",
                    hoc_ky: hoatDong.hoc_ky || "",
                    is_hidden: hoatDong.is_hidden ? "true" : "false",
                }
                : {
                    ten_hoat_dong: "",
                    mo_ta: "",
                    tieu_chi_id: "",
                    ngay_bat_dau: "",
                    ngay_ket_thuc: "",
                    diem: "",
                    tong_so_nguoi_tham_gia: "",
                    nam_hoc: "",
                    hoc_ky: "",
                    is_hidden: "true",
                }
        );
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            ten_hoat_dong: "",
            mo_ta: "",
            tieu_chi_id: "",
            ngay_bat_dau: "",
            ngay_ket_thuc: "",
            diem: "",
            tong_so_nguoi_tham_gia: "",
            nam_hoc: "",
            hoc_ky: "",
            is_hidden: "true",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "tieu_chi_id") {
            const selectedTieuChi = tieuChi.find((tc) => tc.tieu_chi_id === value);
            setFormData({
                ...formData,
                [name]: value,
                diem: selectedTieuChi ? selectedTieuChi.diem : "",
            });
        } else if (name === "ngay_bat_dau") {
            const { nam_hoc, hoc_ky } = calculateNamHocAndHocKy(value);
            setFormData({
                ...formData,
                [name]: value,
                nam_hoc: editMode ? formData.nam_hoc : nam_hoc,
                hoc_ky: editMode ? formData.hoc_ky : hoc_ky,
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async () => {
        if (!formData.ten_hoat_dong.trim()) {
            setError("Tên hoạt động không được để trống.");
            return;
        }
        if (!formData.mo_ta.trim()) {
            setError("Mô tả không được để trống.");
            return;
        }
        if (!formData.nam_hoc.trim()) {
            setError("Năm học không được để trống.");
            return;
        }
        if (!formData.hoc_ky) {
            setError("Học kỳ không được để trống.");
            return;
        }

        const submitData = {
            ...formData,
            ngay_bat_dau: formData.ngay_bat_dau || null,
            ngay_ket_thuc: formData.ngay_ket_thuc || null,
            tieu_chi_id: formData.tieu_chi_id || null,
            tong_so_nguoi_tham_gia: formData.tong_so_nguoi_tham_gia || null,
            nam_hoc: formData.nam_hoc,
            hoc_ky: formData.hoc_ky,
            is_hidden: formData.is_hidden === "true",
        };

        try {
            if (editMode) {
                await axios.put(`http://localhost:5093/api/HoatDong/${selectedHoatDong.hoat_dong_id}`, submitData);
            } else {
                await axios.post("http://localhost:5093/api/HoatDong", submitData);
            }
            fetchHoatDong();
            handleClose();
        } catch (error) {
            console.error("Lỗi khi thêm/sửa hoạt động:", error);
            setError("Đã xảy ra lỗi khi lưu hoạt động. Vui lòng thử lại.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa hoạt động này không?")) {
            try {
                await axios.delete(`http://localhost:5093/api/HoatDong/${id}`);
                fetchHoatDong();
            } catch (error) {
                console.error("Lỗi khi xóa hoạt động:", error);
            }
        }
    };

    const handleToggleHide = async (hoatDong) => {
        try {
            await axios.put(`http://localhost:5093/api/HoatDong/${hoatDong.hoat_dong_id}`, {
                ...hoatDong,
                is_hidden: !hoatDong.is_hidden,
            });
            fetchHoatDong();
        } catch (error) {
            console.error("Lỗi khi ẩn/hiện hoạt động:", error);
        }
    };

    const handleRowClick = (hoatDong) => {
        setSelectedHoatDong(hoatDong);
        setDetailOpen(true);
    };

    const handleDetailClose = () => {
        setSelectedHoatDong(null);
        setDetailOpen(false);
        setActiveFilter("");
        setSelectedGiaoVien("");
        setSelectedLop("");
        setSelectedClasses([]);
    };

    const handleConfirmMinhChung = async (xac_nhan, sinhVien) => {
        if (!sinhVien || !selectedHoatDong) {
            setError("Không tìm thấy thông tin sinh viên hoặc hoạt động.");
            return;
        }

        try {
            await axios.post("http://localhost:5093/api/GiaoVien/xacnhanminhchungcuasinhvien", {
                hoat_dong_id: selectedHoatDong.hoat_dong_id,
                sinh_vien_id: sinhVien.sinh_vien_id,
                xac_nhan: xac_nhan,
            });

            await fetchSinhVienByFilter();
            await fetchHoatDong();

            alert(xac_nhan ? "Xác nhận minh chứng thành công!" : "Từ chối minh chứng thành công!");
        } catch (error) {
            console.error("Lỗi khi xử lý minh chứng:", error);
            setError("Không thể xử lý minh chứng. Vui lòng thử lại.");
        }
    };

    const handleOpenThemSinhVien = () => {
        setLopInput("");
        setThemSinhVienError("");
        setOpenThemSinhVien(true);
    };

    const handleCloseThemSinhVien = () => {
        setOpenThemSinhVien(false);
        setLopInput("");
        setThemSinhVienError("");
    };

    const handleThemSinhVien = async () => {
        if (!lopInput.trim()) {
            setThemSinhVienError("Vui lòng nhập danh sách lớp.");
            return;
        }

        try {
            await axios.post("http://localhost:5093/api/HoatDong/themsinhvienbatbuoc", {
                hoat_dong_id: selectedHoatDong.hoat_dong_id,
                lop: lopInput,
            });

            const classes = lopInput.split(",").map((lop) => lop.trim());
            setSelectedClasses((prev) => [...new Set([...prev, ...classes])]);

            await fetchSinhVienByFilter();
            await fetchHoatDong();

            alert("Thêm sinh viên tự động thành công!");
            handleCloseThemSinhVien();
        } catch (error) {
            console.error("Lỗi khi thêm sinh viên:", error);
            setThemSinhVienError(error.response?.data?.message || "Đã xảy ra lỗi khi thêm sinh viên.");
        }
    };

    if (loading) {
        return <Typography variant="h6">Đang tải...</Typography>;
    }

    if (!user || !nguoiDungId) {
        return (
            <Box>
                <Typography variant="h6" color="error">
                    Vui lòng đăng nhập để tiếp tục.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => (window.location.href = "/")}>
                    Đăng Nhập
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Quản lý Hoạt Động
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <TextField
                        label="Tìm kiếm hoạt động"
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
                        Thêm Hoạt Động
                    </Button>
                </Box>
            </Box>
            {sortedNamHoc.length > 0 ? (
                sortedNamHoc.map((namHoc) => (
                    <Accordion
                        key={namHoc}
                        expanded={expanded === namHoc}
                        onChange={handleAccordionChange(namHoc)}
                        sx={{ mb: 2 }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Năm học: {namHoc} ({groupedHoatDong[namHoc].length} hoạt động)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: 200, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Tên Hoạt Động</TableCell>
                                            <TableCell sx={{ width: 250, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Mô Tả</TableCell>
                                            <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center" }}>Ngày Bắt Đầu</TableCell>
                                            <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center" }}>Ngày Kết Thúc</TableCell>
                                            <TableCell sx={{ width: 150, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Tiêu Chí</TableCell>
                                            <TableCell sx={{ width: 80, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Điểm</TableCell>
                                            <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Người Tham Gia</TableCell>
                                            <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "left" }}>Nộp Minh Chứng</TableCell>
                                            <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center" }}>Thao Tác</TableCell>
                                            <TableCell sx={{ width: 120, whiteSpace: "nowrap", textOverflow: "ellipsis", textAlign: "center" }}>Ẩn/Hiện</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groupedHoatDong[namHoc].map((hd) => (
                                            <TableRow
                                                key={hd.hoat_dong_id}
                                                hover
                                                onClick={() => handleRowClick(hd)}
                                                sx={{ cursor: "pointer", opacity: hd.is_hidden ? 0.5 : 1 }}
                                            >
                                                <TableCell sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={hd.ten_hoat_dong}>
                                                    {hd.ten_hoat_dong}
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={hd.mo_ta}>
                                                    {hd.mo_ta}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "left" }}>
                                                    {format(parseISO(hd.ngay_bat_dau), "yyyy-MM-dd")}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "left" }}>
                                                    {format(parseISO(hd.ngay_ket_thuc), "yyyy-MM-dd")}
                                                </TableCell>
                                                <TableCell sx={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                    {tieuChi.find((tc) => tc.tieu_chi_id === hd.tieu_chi_id)?.ten_tieu_chi || "Không có"}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "left" }}>{hd.diem}</TableCell>
                                                <TableCell sx={{ textAlign: "left" }}>{hd.so_luong_nguoi_tham_gia}/{hd.tong_so_nguoi_tham_gia}</TableCell>
                                                <TableCell sx={{ textAlign: "left" }}>{hd.so_luong_nguoi_nop_minh_chung}/{hd.tong_so_nguoi_tham_gia}</TableCell>
                                                <TableCell sx={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                                                    <Stack direction="row" spacing={-2} justifyContent="center">
                                                        <Button color="success" startIcon={<EditIcon />} onClick={() => handleOpen(hd)} />
                                                        <Button color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(hd.hoat_dong_id)} />
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                                                    <Button
                                                        color={hd.is_hidden ? "primary" : "warning"}
                                                        startIcon={hd.is_hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                        onClick={() => handleToggleHide(hd)}
                                                    >
                                                        {hd.is_hidden ? "Hiện" : "Ẩn"}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </AccordionDetails>
                    </Accordion>
                ))
            ) : (
                <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                    Không tìm thấy hoạt động nào.
                </Typography>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? "Sửa Hoạt Động" : "Thêm Hoạt Động"}</DialogTitle>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ marginBottom: "10px" }}>
                            {error}
                        </Alert>
                    )}
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Tên Hoạt Động"
                        name="ten_hoat_dong"
                        value={formData.ten_hoat_dong}
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
                    <Box sx={{ display: "flex", gap: 2, marginTop: "8px" }}>
                        <TextField
                            fullWidth
                            margin="dense"
                            label="Năm Học"
                            name="nam_hoc"
                            value={formData.nam_hoc}
                            onChange={handleChange}
                            placeholder="Ví dụ: 2023-2024"
                        />
                        <TextField
                            select
                            fullWidth
                            margin="dense"
                            label="Học Kỳ"
                            name="hoc_ky"
                            value={formData.hoc_ky || ""}
                            onChange={handleChange}
                        >
                            <MenuItem value="">Chọn học kỳ</MenuItem>
                            <MenuItem value="1">Học kỳ 1</MenuItem>
                            <MenuItem value="2">Học kỳ 2</MenuItem>
                        </TextField>
                        <TextField
                            select
                            fullWidth
                            margin="dense"
                            label="Ẩn/Hiện"
                            name="is_hidden"
                            value={formData.is_hidden}
                            onChange={handleChange}
                        >
                            <MenuItem value="false">Hiện</MenuItem>
                            <MenuItem value="true">Ẩn</MenuItem>
                        </TextField>
                    </Box>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Số người tham gia"
                        name="tong_so_nguoi_tham_gia"
                        value={formData.tong_so_nguoi_tham_gia}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        type="datetime-local"
                        label="Ngày Bắt Đầu"
                        name="ngay_bat_dau"
                        value={formData.ngay_bat_dau}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        type="datetime-local"
                        label="Ngày Kết Thúc"
                        name="ngay_ket_thuc"
                        value={formData.ngay_ket_thuc}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        select
                        fullWidth
                        margin="dense"
                        label="Tiêu Chí"
                        name="tieu_chi_id"
                        value={formData.tieu_chi_id}
                        onChange={handleChange}
                    >
                        <MenuItem value="">Không có</MenuItem>
                        {tieuChi.map((tc) => (
                            <MenuItem key={tc.tieu_chi_id} value={tc.tieu_chi_id}>
                                {tc.ten_tieu_chi}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Điểm"
                        name="diem"
                        value={formData.diem}
                        InputProps={{ readOnly: true }}
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

            <Dialog
                open={detailOpen}
                onClose={handleDetailClose}
                PaperProps={{
                    sx: {
                        marginTop: "80px",
                        width: "90vw",
                        maxWidth: "1200px",
                        height: "80vh",
                    },
                }}
                scroll="paper"
            >
                <DialogTitle sx={{ backgroundColor: "#1976d2", color: "white", padding: "16px 24px" }}>
                    Chi Tiết Hoạt Động
                </DialogTitle>
                <DialogContent dividers>
                    {selectedHoatDong && (
                        <Box>
                            <Typography variant="subtitle1">
                                <strong>Tên:</strong> {selectedHoatDong.ten_hoat_dong}
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Mô tả:</strong> {selectedHoatDong.mo_ta}
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Năm học:</strong> {selectedHoatDong.nam_hoc || "Không xác định"}
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Học kỳ:</strong> {selectedHoatDong.hoc_ky || "Không xác định"}
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Ngày bắt đầu:</strong>{" "}
                                {format(parseISO(selectedHoatDong.ngay_bat_dau), "yyyy-MM-dd HH:mm")}
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Ngày kết thúc:</strong>{" "}
                                {format(parseISO(selectedHoatDong.ngay_ket_thuc), "yyyy-MM-dd HH:mm")}
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Tiêu chí:</strong>
                                {tieuChi.find((tc) => tc.tieu_chi_id === selectedHoatDong.tieu_chi_id)?.ten_tieu_chi ||
                                    "Không có"}
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Điểm:</strong> {selectedHoatDong.diem}
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Số lượng người tham gia:</strong>{" "}
                                {selectedHoatDong.so_luong_nguoi_tham_gia}/{selectedHoatDong.tong_so_nguoi_tham_gia}
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Số người nộp minh chứng:</strong>{" "}
                                {selectedHoatDong.so_luong_nguoi_nop_minh_chung}/{selectedHoatDong.tong_so_nguoi_tham_gia}
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleOpenThemSinhVien}
                                >
                                    Thêm Sinh Viên Tự Động
                                </Button>
                            </Box>
                        </Box>
                    )}

                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <TextField
                            select
                            label="Lọc theo Giáo Viên"
                            value={selectedGiaoVien}
                            onChange={(e) => {
                                setSelectedGiaoVien(e.target.value);
                                setActiveFilter("teacher");
                                setSelectedLop("");
                            }}
                            sx={{ minWidth: 200 }}
                        >
                            <MenuItem value="">Tất cả giáo viên</MenuItem>
                            {giaoVienList.map((gv) => (
                                <MenuItem key={gv.giao_vien_id} value={gv.giao_vien_id}>
                                    {gv.ho_ten_giao_vien}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Lọc theo Lớp"
                            value={selectedLop}
                            onChange={(e) => {
                                setSelectedLop(e.target.value);
                                setActiveFilter("student");
                                setSelectedGiaoVien("");
                            }}
                            sx={{ minWidth: 200 }}
                        >
                            <MenuItem value="">Tất cả lớp</MenuItem>
                            {lopList.map((lop) => (
                                <MenuItem key={lop.lop} value={lop.lop}>
                                    {lop.lop}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {activeFilter === "student" && (
                        <>
                            <Typography variant="h6">Danh sách sinh viên lọc theo lớp:</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Lớp</TableCell>
                                        <TableCell>MSSV</TableCell>
                                        <TableCell>Họ tên</TableCell>
                                        <TableCell>Điểm</TableCell>
                                        <TableCell>Minh Chứng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sinhVienFiltered.map((sv) => (
                                        <TableRow
                                            key={sv.sinh_vien_id}
                                            hover
                                            sx={{
                                                cursor: "pointer",
                                                backgroundColor: sv.isParticipating ? "rgba(0, 255, 0, 0.1)" : "inherit",
                                            }}
                                        >
                                            <TableCell>{sv.lop}</TableCell>
                                            <TableCell>{sv.ma_so_sinh_vien}</TableCell>
                                            <TableCell>{sv.ho_ten_sinh_vien}</TableCell>
                                            <TableCell>{sv.diem}</TableCell>
                                            <TableCell>
                                                {sv.minh_chung ? (
                                                    <>
                                                        <a href={sv.minh_chung} target="_blank" rel="noopener noreferrer">
                                                            Xem minh chứng
                                                        </a>
                                                        <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                                                            <Button
                                                                size="small"
                                                                color="success"
                                                                variant="contained"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleConfirmMinhChung(true, sv);
                                                                }}
                                                                disabled={sv.da_nop_minh_chung}
                                                            >
                                                                ✅ Xác nhận
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                color="error"
                                                                variant="contained"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleConfirmMinhChung(false, sv);
                                                                }}
                                                                disabled={sv.da_nop_minh_chung}
                                                            >
                                                                ❌ Từ chối
                                                            </Button>
                                                        </Box>
                                                    </>
                                                ) : (
                                                    <Typography>Không có minh chứng</Typography>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    )}

                    {activeFilter === "teacher" && (
                        <>
                            <Typography variant="h6">Danh sách giáo viên:</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Lớp phụ trách</TableCell>
                                        <TableCell>MSGV</TableCell>
                                        <TableCell>Họ tên</TableCell>
                                        <TableCell>Điểm</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {giaoVienList.map((gv) => (
                                        <TableRow
                                            key={gv.giao_vien_id}
                                            sx={{
                                                backgroundColor: gv.isParticipating ? "rgba(0, 255, 0, 0.1)" : "inherit",
                                            }}
                                        >
                                            <TableCell>{gv.lop_phu_trach}</TableCell>
                                            <TableCell>{gv.ma_so_giao_vien}</TableCell>
                                            <TableCell>{gv.ho_ten_giao_vien}</TableCell>
                                            <TableCell>{gv.diem}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDetailClose} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openThemSinhVien} onClose={handleCloseThemSinhVien}>
                <DialogTitle>Thêm Sinh Viên Tự Động</DialogTitle>
                <DialogContent>
                    {themSinhVienError && (
                        <Alert severity="error" sx={{ marginBottom: "10px" }}>
                            {themSinhVienError}
                        </Alert>
                    )}
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Danh sách lớp (cách nhau bằng dấu phẩy)"
                        value={lopInput}
                        onChange={(e) => setLopInput(e.target.value)}
                        placeholder="Ví dụ: 21CT111,21CT112"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseThemSinhVien} color="secondary">
                        Hủy
                    </Button>
                    <Button onClick={handleThemSinhVien} color="primary">
                        Xác Nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default HoatDongComponent;
