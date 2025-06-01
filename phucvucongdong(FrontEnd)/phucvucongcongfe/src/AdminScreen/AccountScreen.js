// import React, { useState, useEffect } from "react";
// import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);

//     useEffect(() => {
//         // Lấy dữ liệu từ API
//         const fetchAccounts = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5093/api/TaiKhoan"); // Thay URL bằng API của bạn
//                 setAccounts(response.data);
//             } catch (error) {
//                 console.error("Lỗi khi tải danh sách tài khoản:", error);
//             }
//         };

//         fetchAccounts();
//     }, []);

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//         </Box>
//     );
// };

// export default AccountScreen;







// import React, { useState, useEffect } from "react";
// import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);

//     useEffect(() => {
//         // Gọi API mới để lấy danh sách tài khoản
//         const fetchAccounts = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5093/api/TaiKhoan/view"); // API mới
//                 setAccounts(response.data);
//             } catch (error) {
//                 console.error("Lỗi khi tải danh sách tài khoản:", error);
//             }
//         };

//         fetchAccounts();
//     }, []);

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Vai Trò</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//         </Box>
//     );
// };

// export default AccountScreen;





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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false); // true nếu chỉnh sửa, false nếu thêm mới
//     const [selectedAccount, setSelectedAccount] = useState(null); // Tài khoản được chọn để chỉnh sửa
//     const [formData, setFormData] = useState({
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//         vai_tro: "",
//     });

//     // Fetch dữ liệu tài khoản
//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     // Xử lý mở dialog
//     const handleOpen = (account = null) => {
//         setSelectedAccount(account);
//         setEditMode(!!account); // Nếu có account => chỉnh sửa, nếu không => thêm mới
//         setFormData(account || { ten_dang_nhap: "", mat_khau: "", phan_quyen: "", trang_thai: "", vai_tro: "" });
//         setOpen(true);
//     };

//     // Xử lý đóng dialog
//     const handleClose = () => {
//         setOpen(false);
//         setFormData({ ten_dang_nhap: "", mat_khau: "", phan_quyen: "", trang_thai: "", vai_tro: "" });
//     };

//     // Xử lý thay đổi form
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Xử lý thêm/sửa tài khoản
//     const handleSubmit = async () => {
//         if (editMode) {
//             // Cập nhật tài khoản
//             try {
//                 await axios.put(`http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`, formData);
//                 fetchAccounts();
//                 handleClose();
//             } catch (error) {
//                 console.error("Lỗi khi cập nhật tài khoản:", error);
//             }
//         } else {
//             // Thêm mới tài khoản
//             try {
//                 await axios.post("http://localhost:5093/api/TaiKhoan/add", formData);
//                 fetchAccounts();
//                 handleClose();
//             } catch (error) {
//                 console.error("Lỗi khi thêm tài khoản:", error);
//             }
//         }
//     };

//     // Xử lý xóa tài khoản
//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts();
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: "10px" }}>
//                 Thêm tài khoản
//             </Button>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Vai Trò</TableCell>
//                             <TableCell>Hành động</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account)} sx={{ marginRight: "5px" }}>
//                                         Sửa
//                                     </Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>
//                                         Xóa
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             {/* Dialog thêm/sửa tài khoản */}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa tài khoản" : "Thêm tài khoản"}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         margin="dense"
//                         label="Tên đăng nhập"
//                         name="ten_dang_nhap"
//                         value={formData.ten_dang_nhap}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Mật khẩu"
//                         name="mat_khau"
//                         value={formData.mat_khau}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Phân quyền"
//                         name="phan_quyen"
//                         value={formData.phan_quyen}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Trạng thái"
//                         name="trang_thai"
//                         value={formData.trang_thai}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField
//                         margin="dense"
//                         label="Vai trò"
//                         name="vai_tro"
//                         value={formData.vai_tro}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">
//                         Hủy
//                     </Button>
//                     <Button onClick={handleSubmit} color="primary">
//                         {editMode ? "Cập nhật" : "Thêm mới"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AccountScreen;











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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//     });

//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     const handleOpen = (account = null) => {
//         setSelectedAccount(account);
//         setEditMode(!!account);
//         setFormData(
//             account || {
//                 ho_ten: "",
//                 vai_tro: "",
//                 phong_ban: "",
//                 thong_tin_lien_he: "",
//                 ten_dang_nhap: "",
//                 mat_khau: "",
//                 phan_quyen: "",
//                 trang_thai: "",
//             }
//         );
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setFormData({
//             ho_ten: "",
//             vai_tro: "",
//             phong_ban: "",
//             thong_tin_lien_he: "",
//             ten_dang_nhap: "",
//             mat_khau: "",
//             phan_quyen: "",
//             trang_thai: "",
//         });
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         if (editMode) {
//             try {
//                 await axios.put(`http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`, formData);
//                 fetchAccounts();
//                 handleClose();
//             } catch (error) {
//                 console.error("Lỗi khi cập nhật tài khoản:", error);
//             }
//         } else {
//             try {
//                 await axios.post("http://localhost:5093/api/TaiKhoan/add", formData);
//                 fetchAccounts();
//                 handleClose();
//             } catch (error) {
//                 console.error("Lỗi khi thêm tài khoản:", error);
//             }
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts();
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: "10px" }}>
//                 Thêm tài khoản
//             </Button>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Hành động</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account)} sx={{ marginRight: "5px" }}>
//                                         Sửa
//                                     </Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>
//                                         Xóa
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             {/* Dialog thêm/sửa tài khoản */}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa tài khoản" : "Thêm tài khoản"}</DialogTitle>
//                 <DialogContent>
//                     <TextField margin="dense" label="Họ tên" name="ho_ten" value={formData.ho_ten} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Vai trò" name="vai_tro" value={formData.vai_tro} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Phòng ban" name="phong_ban" value={formData.phong_ban} onChange={handleChange} fullWidth />
//                     <TextField
//                         margin="dense"
//                         label="Thông tin liên hệ"
//                         name="thong_tin_lien_he"
//                         value={formData.thong_tin_lien_he}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField margin="dense" label="Tên đăng nhập" name="ten_dang_nhap" value={formData.ten_dang_nhap} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Mật khẩu" name="mat_khau" value={formData.mat_khau} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Phân quyền" name="phan_quyen" value={formData.phan_quyen} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Trạng thái" name="trang_thai" value={formData.trang_thai} onChange={handleChange} fullWidth />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">
//                         Hủy
//                     </Button>
//                     <Button onClick={handleSubmit} color="primary">
//                         {editMode ? "Cập nhật" : "Thêm mới"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AccountScreen;









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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//     });

//     // Fetch danh sách tài khoản từ API
//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     // Xử lý mở dialog
//     const handleOpen = (account = null) => {
//         setSelectedAccount(account);
//         setEditMode(!!account); // Nếu có tài khoản => chế độ sửa, nếu không => thêm mới

//         setFormData(
//             account
//                 ? {
//                     ho_ten: account.ho_ten || "",
//                     vai_tro: account.vai_tro || "",
//                     phong_ban: account.phong_ban || "",
//                     thong_tin_lien_he: account.thong_tin_lien_he || "",
//                     ten_dang_nhap: account.ten_dang_nhap || "",
//                     mat_khau: account.mat_khau || "",
//                     phan_quyen: account.phan_quyen || "",
//                     trang_thai: account.trang_thai || "",
//                 }
//                 : {
//                     ho_ten: "",
//                     vai_tro: "",
//                     phong_ban: "",
//                     thong_tin_lien_he: "",
//                     ten_dang_nhap: "",
//                     mat_khau: "",
//                     phan_quyen: "",
//                     trang_thai: "",
//                 }
//         );
//         setOpen(true);
//     };

//     // Xử lý đóng dialog
//     const handleClose = () => {
//         setOpen(false);
//         setFormData({
//             ho_ten: "",
//             vai_tro: "",
//             phong_ban: "",
//             thong_tin_lien_he: "",
//             ten_dang_nhap: "",
//             mat_khau: "",
//             phan_quyen: "",
//             trang_thai: "",
//         });
//     };

//     // Xử lý thay đổi form
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Xử lý thêm mới hoặc cập nhật tài khoản
//     const handleSubmit = async () => {
//         if (editMode) {
//             try {
//                 await axios.put(`http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`, formData);
//                 fetchAccounts(); // Reload danh sách tài khoản
//                 handleClose(); // Đóng dialog
//             } catch (error) {
//                 console.error("Lỗi khi cập nhật tài khoản:", error);
//             }
//         } else {
//             try {
//                 await axios.post("http://localhost:5093/api/TaiKhoan/add", formData);
//                 fetchAccounts(); // Reload danh sách tài khoản
//                 handleClose(); // Đóng dialog
//             } catch (error) {
//                 console.error("Lỗi khi thêm tài khoản:", error);
//             }
//         }
//     };

//     // Xử lý xóa tài khoản
//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts(); // Reload danh sách tài khoản
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: "10px" }}>
//                 Thêm tài khoản
//             </Button>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Hành động</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account)} sx={{ marginRight: "5px" }}>
//                                         Sửa
//                                     </Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>
//                                         Xóa
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             {/* Dialog thêm/sửa tài khoản */}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa tài khoản" : "Thêm tài khoản"}</DialogTitle>
//                 <DialogContent>
//                     <TextField margin="dense" label="Họ tên" name="ho_ten" value={formData.ho_ten} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Vai trò" name="vai_tro" value={formData.vai_tro} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Phòng ban" name="phong_ban" value={formData.phong_ban} onChange={handleChange} fullWidth />
//                     <TextField
//                         margin="dense"
//                         label="Thông tin liên hệ"
//                         name="thong_tin_lien_he"
//                         value={formData.thong_tin_lien_he}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField margin="dense" label="Tên đăng nhập" name="ten_dang_nhap" value={formData.ten_dang_nhap} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Mật khẩu" name="mat_khau" value={formData.mat_khau} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Phân quyền" name="phan_quyen" value={formData.phan_quyen} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Trạng thái" name="trang_thai" value={formData.trang_thai} onChange={handleChange} fullWidth />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">
//                         Hủy
//                     </Button>
//                     <Button onClick={handleSubmit} color="primary">
//                         {editMode ? "Cập nhật" : "Thêm mới"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AccountScreen;









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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//     });

//     // Fetch danh sách tài khoản từ API
//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     // Mở dialog: Thêm mới hoặc chỉnh sửa
//     const handleOpen = (account = null) => {
//         setSelectedAccount(account); // Gán tài khoản được chọn
//         setEditMode(!!account); // true nếu chỉnh sửa, false nếu thêm mới

//         // Nếu có tài khoản, điền thông tin vào formData, nếu không để trống
//         setFormData(
//             account
//                 ? {
//                     ho_ten: account.ho_ten || "",
//                     vai_tro: account.vai_tro || "",
//                     phong_ban: account.phong_ban || "",
//                     thong_tin_lien_he: account.thong_tin_lien_he || "",
//                     ten_dang_nhap: account.ten_dang_nhap || "",
//                     mat_khau: account.mat_khau || "",
//                     phan_quyen: account.phan_quyen || "",
//                     trang_thai: account.trang_thai || "",
//                 }
//                 : {
//                     ho_ten: "",
//                     vai_tro: "",
//                     phong_ban: "",
//                     thong_tin_lien_he: "",
//                     ten_dang_nhap: "",
//                     mat_khau: "",
//                     phan_quyen: "",
//                     trang_thai: "",
//                 }
//         );
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedAccount(null);
//         setFormData({
//             ho_ten: "",
//             vai_tro: "",
//             phong_ban: "",
//             thong_tin_lien_he: "",
//             ten_dang_nhap: "",
//             mat_khau: "",
//             phan_quyen: "",
//             trang_thai: "",
//         });
//     };

//     // Cập nhật dữ liệu trong form khi người dùng nhập
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         if (editMode) {
//             // Cập nhật tài khoản
//             try {
//                 await axios.put(`http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`, formData);
//                 fetchAccounts(); // Tải lại danh sách
//                 handleClose(); // Đóng dialog
//             } catch (error) {
//                 console.error("Lỗi khi cập nhật tài khoản:", error);
//             }
//         } else {
//             // Thêm mới tài khoản
//             try {
//                 await axios.post("http://localhost:5093/api/TaiKhoan/add", formData);
//                 fetchAccounts(); // Tải lại danh sách
//                 handleClose(); // Đóng dialog
//             } catch (error) {
//                 console.error("Lỗi khi thêm tài khoản:", error);
//             }
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts();
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: "10px" }}>
//                 Thêm tài khoản
//             </Button>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Thao tác</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account)} sx={{ marginRight: "5px" }}>
//                                         Sửa
//                                     </Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>
//                                         Xóa
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa tài khoản" : "Thêm tài khoản"}</DialogTitle>
//                 <DialogContent>
//                     <TextField margin="dense" label="Họ tên" name="ho_ten" value={formData.ho_ten} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Vai trò" name="vai_tro" value={formData.vai_tro} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Phòng ban" name="phong_ban" value={formData.phong_ban} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Thông tin liên hệ" name="thong_tin_lien_he" value={formData.thong_tin_lien_he} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Tên đăng nhập" name="ten_dang_nhap" value={formData.ten_dang_nhap} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Mật khẩu" name="mat_khau" value={formData.mat_khau} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Phân quyền" name="phan_quyen" value={formData.phan_quyen} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Trạng thái" name="trang_thai" value={formData.trang_thai} onChange={handleChange} fullWidth />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">
//                         Hủy
//                     </Button>
//                     <Button onClick={handleSubmit} color="primary">
//                         {editMode ? "Cập nhật" : "Thêm mới"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AccountScreen;

//////////////////////////////////////////////////////////////// lỗi phần sửa gốc



















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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [role, setRole] = useState("");
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//         lop: "",
//         nganh: "",
//         chuc_vu: "",
//     });

//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     const handleOpen = (type, account = null) => {
//         setSelectedAccount(account);
//         setEditMode(!!account);
//         setRole(type);

//         setFormData(
//             account
//                 ? {
//                     ho_ten: account.ho_ten || "",
//                     vai_tro: account.vai_tro || "",
//                     phong_ban: account.phong_ban || "",
//                     thong_tin_lien_he: account.thong_tin_lien_he || "",
//                     ten_dang_nhap: account.ten_dang_nhap || "",
//                     mat_khau: account.mat_khau || "",
//                     phan_quyen: account.phan_quyen || "",
//                     trang_thai: account.trang_thai || "",
//                     lop: account.lop || "",
//                     nganh: account.nganh || "",
//                     chuc_vu: account.chuc_vu || "",
//                 }
//                 : {
//                     ho_ten: "",
//                     vai_tro: type === "sinhvien" ? "Sinh viên" : "Giáo viên",
//                     phong_ban: "",
//                     thong_tin_lien_he: "",
//                     ten_dang_nhap: "",
//                     mat_khau: "",
//                     phan_quyen: "",
//                     trang_thai: "",
//                     lop: "",
//                     nganh: "",
//                     chuc_vu: "",
//                 }
//         );
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedAccount(null);
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         try {
//             if (editMode) {
//                 await axios.put(`http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`, formData);
//             } else {
//                 await axios.post("http://localhost:5093/api/TaiKhoan/add", formData);
//             }
//             fetchAccounts();
//             handleClose();
//         } catch (error) {
//             console.error("Lỗi khi lưu tài khoản:", error);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts();
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen("sinhvien")} sx={{ marginRight: "10px" }}>
//                 Thêm sinh viên
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => handleOpen("giaovien")}>
//                 Thêm giáo viên
//             </Button>
//             <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Thao tác</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account.vai_tro.toLowerCase(), account)} sx={{ marginRight: "5px" }}>
//                                         Sửa
//                                     </Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>
//                                         Xóa
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa tài khoản" : `Thêm ${role === "sinhvien" ? "sinh viên" : "giáo viên"}`}</DialogTitle>
//                 <DialogContent>
//                     <TextField margin="dense" label="Họ tên" name="ho_ten" value={formData.ho_ten} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Tên đăng nhập" name="ten_dang_nhap" value={formData.ten_dang_nhap} onChange={handleChange} fullWidth />
//                     {role === "sinhvien" && (
//                         <>
//                             <TextField margin="dense" label="Lớp" name="lop" value={formData.lop} onChange={handleChange} fullWidth />
//                             <TextField margin="dense" label="Ngành" name="nganh" value={formData.nganh} onChange={handleChange} fullWidth />
//                         </>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </Box>
//     );
// };

// export default AccountScreen;

























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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [role, setRole] = useState("");
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//         lop: "",
//         nganh: "",
//         chuc_vu: "",
//     });

//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     const handleOpen = (type, account = null) => {
//         setSelectedAccount(account);
//         setEditMode(!!account);
//         setRole(type);

//         setFormData(
//             account
//                 ? { ...account }
//                 : {
//                     ho_ten: "",
//                     vai_tro: type === "sinhvien" ? "Sinh viên" : "Giáo viên",
//                     phong_ban: "",
//                     thong_tin_lien_he: "",
//                     ten_dang_nhap: "",
//                     mat_khau: "",
//                     phan_quyen: "",
//                     trang_thai: "",
//                     lop: "",
//                     nganh: "",
//                     chuc_vu: "",
//                 }
//         );
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedAccount(null);
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         try {
//             if (editMode) {
//                 await axios.put(`http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`, formData);
//             } else {
//                 await axios.post("http://localhost:5093/api/TaiKhoan/add", formData);
//             }
//             fetchAccounts();
//             handleClose();
//         } catch (error) {
//             console.error("Lỗi khi lưu tài khoản:", error);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts();
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen("sinhvien")} sx={{ marginRight: "10px" }}>
//                 Thêm sinh viên
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => handleOpen("giaovien")}>Thêm giáo viên</Button>
//             <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Thao tác</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account.vai_tro.toLowerCase(), account)} sx={{ marginRight: "5px" }}>Sửa</Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>Xóa</Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa tài khoản" : `Thêm ${role === "sinhvien" ? "sinh viên" : "giáo viên"}`}</DialogTitle>
//                 <DialogContent>
//                     <TextField margin="dense" label="Họ tên" name="ho_ten" value={formData.ho_ten} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Tên đăng nhập" name="ten_dang_nhap" value={formData.ten_dang_nhap} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Mật khẩu" name="mat_khau" type="password" value={formData.mat_khau} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Phân quyền" name="phan_quyen" value={formData.phan_quyen} onChange={handleChange} fullWidth />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">Hủy</Button>
//                     <Button onClick={handleSubmit} color="primary" variant="contained">Lưu</Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AccountScreen;
































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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [isStudent, setIsStudent] = useState(true);
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//         lop: "",
//         nganh: "",
//         chuc_vu: ""
//     });

//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     const handleOpen = (student = true, account = null) => {
//         setIsStudent(student);
//         setSelectedAccount(account);
//         setEditMode(!!account);
//         setFormData(account || {
//             ho_ten: "",
//             vai_tro: student ? "Sinh viên" : "Giáo viên",
//             phong_ban: "",
//             thong_tin_lien_he: "",
//             ten_dang_nhap: "",
//             mat_khau: "",
//             phan_quyen: "",
//             trang_thai: "",
//             lop: "",
//             nganh: "",
//             chuc_vu: ""
//         });
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedAccount(null);
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         try {
//             const endpoint = editMode
//                 ? `http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`
//                 : "http://localhost:5093/api/TaiKhoan/add";
//             const method = editMode ? "put" : "post";
            
//             await axios[method](endpoint, formData);
//             fetchAccounts();
//             handleClose();
//         } catch (error) {
//             console.error("Lỗi khi xử lý tài khoản:", error);
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen(true)} sx={{ marginRight: "10px" }}>
//                 Thêm sinh viên
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => handleOpen(false)}>
//                 Thêm giáo viên
//             </Button>
//             <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa tài khoản" : isStudent ? "Thêm sinh viên" : "Thêm giáo viên"}</DialogTitle>
//                 <DialogContent>
//                     <TextField label="Họ tên" name="ho_ten" value={formData.ho_ten} onChange={handleChange} fullWidth margin="dense" />
//                     <TextField label="Tên đăng nhập" name="ten_dang_nhap" value={formData.ten_dang_nhap} onChange={handleChange} fullWidth margin="dense" />
//                     <TextField label="Mật khẩu" name="mat_khau" value={formData.mat_khau} onChange={handleChange} fullWidth margin="dense" type="password" />
//                     <TextField label="Phân quyền" name="phan_quyen" value={formData.phan_quyen} onChange={handleChange} fullWidth margin="dense" />
//                     <TextField label="Trạng thái" name="trang_thai" value={formData.trang_thai} onChange={handleChange} fullWidth margin="dense" />
//                     {isStudent ? (
//                         <>
//                             <TextField label="Lớp" name="lop" value={formData.lop} onChange={handleChange} fullWidth margin="dense" />
//                             <TextField label="Ngành" name="nganh" value={formData.nganh} onChange={handleChange} fullWidth margin="dense" />
//                         </>
//                     ) : (
//                         <TextField label="Chức vụ" name="chuc_vu" value={formData.chuc_vu} onChange={handleChange} fullWidth margin="dense" />
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">Hủy</Button>
//                     <Button onClick={handleSubmit} color="primary">{editMode ? "Cập nhật" : "Thêm mới"}</Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AccountScreen;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////27022025





















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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formType, setFormType] = useState(null); // 'sinhvien' hoặc 'giaovien'
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//         lop: "",
//         nganh: "",
//         chuc_vu: ""
//     });

//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     const handleOpen = (type, account = null) => {
//         setFormType(type);
//         setSelectedAccount(account);
//         setEditMode(!!account);
//         setFormData(account ? { ...account } : {
//             ho_ten: "",
//             vai_tro: type === 'sinhvien' ? "Sinh viên" : "Giáo viên",
//             phong_ban: "",
//             thong_tin_lien_he: "",
//             ten_dang_nhap: "",
//             mat_khau: "",
//             phan_quyen: "",
//             trang_thai: "",
//             lop: "",
//             nganh: "",
//             chuc_vu: ""
//         });
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedAccount(null);
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         try {
//             if (editMode) {
//                 await axios.put(`http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`, formData);
//             } else {
//                 await axios.post("http://localhost:5093/api/TaiKhoan/add", formData);
//             }
//             fetchAccounts();
//             handleClose();
//         } catch (error) {
//             console.error("Lỗi khi lưu tài khoản:", error);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts();
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen("sinhvien")} sx={{ marginRight: "10px" }}>
//                 Thêm sinh viên
//             </Button>
//             <Button variant="contained" color="secondary" onClick={() => handleOpen("giaovien")}>
//                 Thêm giáo viên
//             </Button>
//             <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Thao tác</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account.vai_tro.toLowerCase(), account)} sx={{ marginRight: "5px" }}>
//                                         Sửa
//                                     </Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>
//                                         Xóa
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa tài khoản" : formType === "sinhvien" ? "Thêm sinh viên" : "Thêm giáo viên"}</DialogTitle>
//                 <DialogContent>
//                     <TextField margin="dense" label="Họ tên" name="ho_ten" value={formData.ho_ten} onChange={handleChange} fullWidth />
//                     {formType === "sinhvien" && <>
//                         <TextField margin="dense" label="Lớp" name="lop" value={formData.lop} onChange={handleChange} fullWidth />
//                         <TextField margin="dense" label="Ngành" name="nganh" value={formData.nganh} onChange={handleChange} fullWidth />
//                     </>}
//                     {formType === "giaovien" && <TextField margin="dense" label="Chức vụ" name="chuc_vu" value={formData.chuc_vu} onChange={handleChange} fullWidth />}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">Hủy</Button>
//                     <Button onClick={handleSubmit} color="primary">{editMode ? "Cập nhật" : "Thêm mới"}</Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AccountScreen;
//////////////////////////////////////////////////////////////////////////////////////////////////////27/02/2025






















// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const AccountScreen = () => {
//     const navigate = useNavigate();

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ marginRight: "10px" }}
//                 onClick={() => navigate("/add-teacher")}
//             >
//                 Thêm tài khoản giáo viên
//             </Button>
//             <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={() => navigate("/add-student")}
//             >
//                 Thêm tài khoản sinh viên
//             </Button>
//         </Box>
//     );
// };

// export default AccountScreen;












// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// const AccountScreen = ({ role }) => {
//     const [accounts, setAccounts] = useState([]);

//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5093/api/TaiKhoan/view?role=${role}`);
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản {role}
//             </Typography>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ Tên</TableCell>
//                             <TableCell>Vai Trò</TableCell>
//                             <TableCell>Phòng Ban</TableCell>
//                             <TableCell>Thông Tin Liên Hệ</TableCell>
//                             {role === "Sinh viên" && (
//                                 <>
//                                     <TableCell>Lớp</TableCell>
//                                     <TableCell>Ngành</TableCell>
//                                 </>
//                             )}
//                             {role === "Giáo viên" && <TableCell>Chức Vụ</TableCell>}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.nguoi_dung_id}>
//                                 <TableCell>{account.nguoi_dung_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 {role === "Sinh viên" && (
//                                     <>
//                                         <TableCell>{account.lop || "N/A"}</TableCell>
//                                         <TableCell>{account.nganh || "N/A"}</TableCell>
//                                     </>
//                                 )}
//                                 {role === "Giáo viên" && <TableCell>{account.chuc_vu || "N/A"}</TableCell>}
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// };

// export default AccountScreen;
///////////////////////////////////////////////////////////////////////////////////////////////////ngày 27/02/2025















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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//     });

//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     const handleOpen = (account = null) => {
//         setSelectedAccount(account);
//         setEditMode(!!account);
//         setFormData(
//             account
//                 ? {
//                     ho_ten: account.ho_ten || "",
//                     vai_tro: account.vai_tro || "",
//                     phong_ban: account.phong_ban || "",
//                     thong_tin_lien_he: account.thong_tin_lien_he || "",
//                     ten_dang_nhap: account.ten_dang_nhap || "",
//                     mat_khau: account.mat_khau || "",
//                     phan_quyen: account.phan_quyen || "",
//                     trang_thai: account.trang_thai || "",
//                 }
//                 : {
//                     ho_ten: "",
//                     vai_tro: "",
//                     phong_ban: "",
//                     thong_tin_lien_he: "",
//                     ten_dang_nhap: "",
//                     mat_khau: "",
//                     phan_quyen: "",
//                     trang_thai: "",
//                 }
//         );
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedAccount(null);
//         setFormData({
//             ho_ten: "",
//             vai_tro: "",
//             phong_ban: "",
//             thong_tin_lien_he: "",
//             ten_dang_nhap: "",
//             mat_khau: "",
//             phan_quyen: "",
//             trang_thai: "",
//         });
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         try {
//             if (editMode) {
//                 await axios.put(`http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`, formData);
//             } else {
//                 await axios.post("http://localhost:5093/api/TaiKhoan/add", formData);
//             }
//             fetchAccounts();
//             handleClose();
//         } catch (error) {
//             console.error("Lỗi khi lưu tài khoản:", error);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts();
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: "10px" }}>
//                 Thêm tài khoản
//             </Button>

//             {/* Bọc bảng trong Paper có overflowX để tạo thanh cuộn ngang */}
//             <Paper sx={{ width: "100%", overflowX: "auto" }}>
//                 <Table sx={{ minWidth: 1200 }}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Hành động</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account)} sx={{ marginRight: "5px" }}>
//                                         Sửa
//                                     </Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>
//                                         Xóa
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa tài khoản" : "Thêm tài khoản"}</DialogTitle>
//                 <DialogContent>
//                     {["ho_ten", "vai_tro", "phong_ban", "thong_tin_lien_he", "ten_dang_nhap", "mat_khau", "phan_quyen", "trang_thai"].map((field) => (
//                         <TextField
//                             key={field}
//                             margin="dense"
//                             label={field.replace("_", " ").toUpperCase()}
//                             name={field}
//                             value={formData[field]}
//                             onChange={handleChange}
//                             fullWidth
//                         />
//                     ))}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">
//                         Hủy
//                     </Button>
//                     <Button onClick={handleSubmit} color="primary">
//                         {editMode ? "Cập nhật" : "Thêm mới"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AccountScreen;
//  có thanh cuộn ngang dưới màn hình

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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//     });

//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     const handleOpen = (account = null) => {
//         setSelectedAccount(account);
//         setEditMode(!!account);

//         // Nếu có tài khoản, điền dữ liệu từ tài khoản vào formData
//         setFormData(
//             account
//                 ? {
//                     ho_ten: account.ho_ten || "",
//                     vai_tro: account.vai_tro || "",
//                     phong_ban: account.phong_ban || "",
//                     thong_tin_lien_he: account.thong_tin_lien_he || "",
//                     ten_dang_nhap: account.ten_dang_nhap || "",
//                     mat_khau: account.mat_khau || "", // Hiển thị mật khẩu (nếu cần)
//                     phan_quyen: account.phan_quyen || "",
//                     trang_thai: account.trang_thai || "",
//                 }
//                 : {
//                     ho_ten: "",
//                     vai_tro: "",
//                     phong_ban: "",
//                     thong_tin_lien_he: "",
//                     ten_dang_nhap: "",
//                     mat_khau: "",
//                     phan_quyen: "",
//                     trang_thai: "",
//                 }
//         );
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedAccount(null);
//         setFormData({
//             ho_ten: "",
//             vai_tro: "",
//             phong_ban: "",
//             thong_tin_lien_he: "",
//             ten_dang_nhap: "",
//             mat_khau: "",
//             phan_quyen: "",
//             trang_thai: "",
//         });
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         if (editMode) {
//             try {
//                 await axios.put(`http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`, formData);
//                 fetchAccounts();
//                 handleClose();
//             } catch (error) {
//                 console.error("Lỗi khi cập nhật tài khoản:", error);
//             }
//         } else {
//             try {
//                 await axios.post("http://localhost:5093/api/TaiKhoan/add", formData);
//                 fetchAccounts();
//                 handleClose();
//             } catch (error) {
//                 console.error("Lỗi khi thêm tài khoản:", error);
//             }
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts();
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: "10px" }}>
//                 Thêm tài khoản
//             </Button>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Hành động</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account)} sx={{ marginRight: "5px" }}>
//                                         Sửa
//                                     </Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>
//                                         Xóa
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             {/* Dialog thêm/sửa tài khoản */}
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa tài khoản" : "Thêm tài khoản"}</DialogTitle>
//                 <DialogContent>
//                     <TextField margin="dense" label="Họ tên" name="ho_ten" value={formData.ho_ten} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Vai trò" name="vai_tro" value={formData.vai_tro} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Phòng ban" name="phong_ban" value={formData.phong_ban} onChange={handleChange} fullWidth />
//                     <TextField
//                         margin="dense"
//                         label="Thông tin liên hệ"
//                         name="thong_tin_lien_he"
//                         value={formData.thong_tin_lien_he}
//                         onChange={handleChange}
//                         fullWidth
//                     />
//                     <TextField margin="dense" label="Tên đăng nhập" name="ten_dang_nhap" value={formData.ten_dang_nhap} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Mật khẩu" name="mat_khau" value={formData.mat_khau} onChange={handleChange} fullWidth type="password" />
//                     <TextField margin="dense" label="Phân quyền" name="phan_quyen" value={formData.phan_quyen} onChange={handleChange} fullWidth />
//                     <TextField margin="dense" label="Trạng thái" name="trang_thai" value={formData.trang_thai} onChange={handleChange} fullWidth />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">
//                         Hủy
//                     </Button>
//                     <Button onClick={handleSubmit} color="primary">
//                         {editMode ? "Cập nhật" : "Thêm mới"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AccountScreen;

//////////////////////////////////////////////////////////////////////////////// lỗi phần sửa




// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false); // true nếu chỉnh sửa, false nếu thêm mới
//   const [selectedAccount, setSelectedAccount] = useState(null); // Tài khoản được chọn để chỉnh sửa
//   const [formData, setFormData] = useState({
//     ho_ten: "",
//     vai_tro: "",
//     phong_ban: "",
//     thong_tin_lien_he: "",
//     ten_dang_nhap: "",
//     mat_khau: "",
//     phan_quyen: "",
//     trang_thai: "",
//   });

//   // Fetch dữ liệu tài khoản
//   useEffect(() => {
//     fetchAccounts();
//   }, []);

//   const fetchAccounts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//       setAccounts(response.data);
//     } catch (error) {
//       console.error("Lỗi khi tải danh sách tài khoản:", error);
//     }
//   };

//   // Xử lý mở dialog
//   const handleOpen = (account = null) => {
//     setSelectedAccount(account);
//     setEditMode(!!account); // Nếu có account => chỉnh sửa, nếu không => thêm mới
//     setFormData(
//       account || {
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//       }
//     );
//     setOpen(true);
//   };

//   // Xử lý đóng dialog
//   const handleClose = () => {
//     setOpen(false);
//     setFormData({
//       ho_ten: "",
//       vai_tro: "",
//       phong_ban: "",
//       thong_tin_lien_he: "",
//       ten_dang_nhap: "",
//       mat_khau: "",
//       phan_quyen: "",
//       trang_thai: "",
//     });
//   };

//   // Xử lý thay đổi form
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Xử lý thêm/sửa tài khoản
//   const handleSubmit = async () => {
//     if (editMode) {
//       // Cập nhật tài khoản
//       try {
//         await axios.put(
//           `http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`,
//           formData
//         );
//         fetchAccounts();
//         handleClose();
//       } catch (error) {
//         console.error("Lỗi khi cập nhật tài khoản:", error);
//       }
//     } else {
//       // Thêm mới tài khoản
//       try {
//         await axios.post("http://localhost:5093/api/TaiKhoan/add", formData);
//         fetchAccounts();
//         handleClose();
//       } catch (error) {
//         console.error("Lỗi khi thêm tài khoản:", error);
//       }
//     }
//   };

//   return (
//     <Box sx={{ padding: "20px" }}>
//       <Typography variant="h4" gutterBottom>
//         Danh sách tài khoản
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => handleOpen()}
//         sx={{ marginBottom: "10px" }}
//       >
//         Thêm tài khoản
//       </Button>
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Tên đăng nhập</TableCell>
//               <TableCell>Phân quyền</TableCell>
//               <TableCell>Trạng thái</TableCell>
//               <TableCell>Vai trò</TableCell>
//               <TableCell>Hành động</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {accounts.map((account) => (
//               <TableRow key={account.tai_khoan_id}>
//                 <TableCell>{account.tai_khoan_id}</TableCell>
//                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                 <TableCell>{account.phan_quyen}</TableCell>
//                 <TableCell>{account.trang_thai}</TableCell>
//                 <TableCell>{account.vai_tro}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="warning"
//                     onClick={() => handleOpen(account)}
//                     sx={{ marginRight: "5px" }}
//                   >
//                     Sửa
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() =>
//                       window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?") &&
//                       axios
//                         .delete(`http://localhost:5093/api/TaiKhoan/${account.tai_khoan_id}`)
//                         .then(fetchAccounts)
//                         .catch(console.error)
//                     }
//                   >
//                     Xóa
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* Dialog thêm/sửa tài khoản */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{editMode ? "Sửa tài khoản" : "Thêm tài khoản"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Họ tên"
//             name="ho_ten"
//             value={formData.ho_ten}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Vai trò"
//             name="vai_tro"
//             value={formData.vai_tro}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Phòng ban"
//             name="phong_ban"
//             value={formData.phong_ban}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Thông tin liên hệ"
//             name="thong_tin_lien_he"
//             value={formData.thong_tin_lien_he}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Tên đăng nhập"
//             name="ten_dang_nhap"
//             value={formData.ten_dang_nhap}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Mật khẩu"
//             name="mat_khau"
//             value={formData.mat_khau}
//             onChange={handleChange}
//             fullWidth
//             type="password"
//           />
//           <TextField
//             margin="dense"
//             label="Phân quyền"
//             name="phan_quyen"
//             value={formData.phan_quyen}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Trạng thái"
//             name="trang_thai"
//             value={formData.trang_thai}
//             onChange={handleChange}
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="secondary">
//             Hủy
//           </Button>
//           <Button onClick={handleSubmit} color="primary">
//             {editMode ? "Cập nhật" : "Thêm mới"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AccountScreen;
//////////////////////////////////////////////////////////// lỗi phần sửa










































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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//     });

//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     const handleOpen = (account = null) => {
//         setSelectedAccount(account);
//         setEditMode(!!account);
//         setFormData(
//             account ? { ...account } : {
//                 ho_ten: "",
//                 vai_tro: "",
//                 phong_ban: "",
//                 thong_tin_lien_he: "",
//                 ten_dang_nhap: "",
//                 mat_khau: "",
//                 phan_quyen: "",
//                 trang_thai: "",
//             }
//         );
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedAccount(null);
//         setFormData({
//             ho_ten: "",
//             vai_tro: "",
//             phong_ban: "",
//             thong_tin_lien_he: "",
//             ten_dang_nhap: "",
//             mat_khau: "",
//             phan_quyen: "",
//             trang_thai: "",
//         });
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         try {
//             if (editMode) {
//                 await axios.put(`http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`, formData);
//             } else {
//                 const response = await axios.post("http://localhost:5093/api/TaiKhoan/add", formData);
//                 if (response.data) {
//                     const userId = response.data.nguoi_dung_id;
//                     if (formData.vai_tro.toLowerCase() === "Sinh viên") {
//                         await axios.post("http://localhost:5093/api/SinhVien", { nguoi_dung_id: userId });
//                     } else if (formData.vai_tro.toLowerCase() === "Giáo viên") {
//                         await axios.post("http://localhost:5093/api/GiaoVien", { nguoi_dung_id: userId });
//                     }
//                 }
//             }
//             fetchAccounts();
//             handleClose();
//         } catch (error) {
//             console.error("Lỗi khi xử lý tài khoản:", error);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts();
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: "10px" }}>
//                 Thêm tài khoản
//             </Button>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Thao tác</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account)} sx={{ marginRight: "5px" }}>
//                                         Sửa
//                                     </Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>
//                                         Xóa
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{editMode ? "Sửa tài khoản" : "Thêm tài khoản"}</DialogTitle>
//                 <DialogContent>
//                     {Object.keys(formData).map((key) => (
//                         <TextField key={key} margin="dense" label={key} name={key} value={formData[key]} onChange={handleChange} fullWidth />
//                     ))}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="secondary">Hủy</Button>
//                     <Button onClick={handleSubmit} color="primary">{editMode ? "Cập nhật" : "Thêm mới"}</Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default AccountScreen;







































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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//     });

//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     const handleOpen = (account = null) => {
//         setSelectedAccount(account);
//         setEditMode(!!account);
//         setFormData(
//             account
//                 ? {
//                     ho_ten: account.ho_ten || "",
//                     vai_tro: account.vai_tro || "",
//                     phong_ban: account.phong_ban || "",
//                     thong_tin_lien_he: account.thong_tin_lien_he || "",
//                     ten_dang_nhap: account.ten_dang_nhap || "",
//                     mat_khau: account.mat_khau || "",
//                     phan_quyen: account.phan_quyen || "",
//                     trang_thai: account.trang_thai || "",
//                 }
//                 : {
//                     ho_ten: "",
//                     vai_tro: "",
//                     phong_ban: "",
//                     thong_tin_lien_he: "",
//                     ten_dang_nhap: "",
//                     mat_khau: "",
//                     phan_quyen: "",
//                     trang_thai: "",
//                 }
//         );
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedAccount(null);
//         setFormData({
//             ho_ten: "",
//             vai_tro: "",
//             phong_ban: "",
//             thong_tin_lien_he: "",
//             ten_dang_nhap: "",
//             mat_khau: "",
//             phan_quyen: "",
//             trang_thai: "",
//         });
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         try {
//             if (editMode) {
//                 // Cập nhật tài khoản trong bảng NguoiDung
//                 await axios.put(`http://localhost:5093/api/NguoiDung/${selectedAccount.tai_khoan_id}`, formData);

//                 // Nếu vai trò thay đổi, cần cập nhật bảng SinhVien hoặc GiaoVien
//                 if (formData.vai_tro === "Sinh viên") {
//                     await axios.put(`http://localhost:5093/api/SinhVien/${selectedAccount.tai_khoan_id}`, {
//                         ma_sv: selectedAccount.tai_khoan_id,
//                         ho_ten: formData.ho_ten,
//                         thong_tin_lien_he: formData.thong_tin_lien_he,
//                     });
//                 } else if (formData.vai_tro === "Giáo viên") {
//                     await axios.put(`http://localhost:5093/api/GiaoVien/${selectedAccount.tai_khoan_id}`, {
//                         ma_gv: selectedAccount.tai_khoan_id,
//                         ho_ten: formData.ho_ten,
//                         phong_ban: formData.phong_ban,
//                         thong_tin_lien_he: formData.thong_tin_lien_he,
//                     });
//                 }
//             } else {
//                 // Thêm mới vào bảng NguoiDung
//                 const response = await axios.post("http://localhost:5093/api/NguoiDung/add", formData);
//                 const newUserId = response.data.id; // Giả sử API trả về ID của người dùng mới

//                 // Sau khi thêm vào bảng NguoiDung, kiểm tra vai trò để thêm vào SinhVien hoặc GiaoVien
//                 if (formData.vai_tro === "Sinh viên") {
//                     await axios.post("http://localhost:5093/api/SinhVien/add", {
//                         ma_sv: newUserId,
//                         ho_ten: formData.ho_ten,
//                         thong_tin_lien_he: formData.thong_tin_lien_he,
//                     });
//                 } else if (formData.vai_tro === "Giáo viên") {
//                     await axios.post("http://localhost:5093/api/GiaoVien/add", {
//                         ma_gv: newUserId,
//                         ho_ten: formData.ho_ten,
//                         phong_ban: formData.phong_ban,
//                         thong_tin_lien_he: formData.thong_tin_lien_he,
//                     });
//                 }
//             }
//             fetchAccounts(); // Tải lại danh sách tài khoản
//             handleClose(); // Đóng dialog
//         } catch (error) {
//             console.error("Lỗi khi xử lý tài khoản:", error);
//         }
//     };


//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts();
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: "10px" }}>
//                 Thêm tài khoản
//             </Button>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Thao tác</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account)} sx={{ marginRight: "5px" }}>
//                                         Sửa
//                                     </Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>
//                                         Xóa
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//         </Box>
//     );
// };

// export default AccountScreen;

































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
// } from "@mui/material";
// import axios from "axios";

// const AccountScreen = () => {
//     const [accounts, setAccounts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [editMode, setEditMode] = useState(false);
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [formData, setFormData] = useState({
//         ho_ten: "",
//         vai_tro: "",
//         phong_ban: "",
//         thong_tin_lien_he: "",
//         ten_dang_nhap: "",
//         mat_khau: "",
//         phan_quyen: "",
//         trang_thai: "",
//     });

//     // Fetch danh sách tài khoản từ API
//     useEffect(() => {
//         fetchAccounts();
//     }, []);

//     const fetchAccounts = async () => {
//         try {
//             const response = await axios.get("http://localhost:5093/api/TaiKhoan/view");
//             setAccounts(response.data);
//         } catch (error) {
//             console.error("Lỗi khi tải danh sách tài khoản:", error);
//         }
//     };

//     const handleOpen = (account = null) => {
//         setSelectedAccount(account);
//         setEditMode(!!account);

//         setFormData(
//             account
//                 ? {
//                     ho_ten: account.ho_ten || "",
//                     vai_tro: account.vai_tro || "",
//                     phong_ban: account.phong_ban || "",
//                     thong_tin_lien_he: account.thong_tin_lien_he || "",
//                     ten_dang_nhap: account.ten_dang_nhap || "",
//                     mat_khau: account.mat_khau || "",
//                     phan_quyen: account.phan_quyen || "",
//                     trang_thai: account.trang_thai || "",
//                 }
//                 : {
//                     ho_ten: "",
//                     vai_tro: "",
//                     phong_ban: "",
//                     thong_tin_lien_he: "",
//                     ten_dang_nhap: "",
//                     mat_khau: "",
//                     phan_quyen: "",
//                     trang_thai: "",
//                 }
//         );
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setSelectedAccount(null);
//         setFormData({
//             ho_ten: "",
//             vai_tro: "",
//             phong_ban: "",
//             thong_tin_lien_he: "",
//             ten_dang_nhap: "",
//             mat_khau: "",
//             phan_quyen: "",
//             trang_thai: "",
//         });
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         if (editMode) {
//             try {
//                 await axios.put(`http://localhost:5093/api/TaiKhoan/${selectedAccount.tai_khoan_id}`, formData);
//                 fetchAccounts();
//                 handleClose();
//             } catch (error) {
//                 console.error("Lỗi khi cập nhật tài khoản:", error);
//             }
//         } else {
//             try {
//                 // 1. Thêm tài khoản vào bảng TaiKhoan
//                 const taiKhoanResponse = await axios.post("http://localhost:5093/api/TaiKhoan/add", {
//                     ten_dang_nhap: formData.ten_dang_nhap,
//                     mat_khau: formData.mat_khau,
//                     phan_quyen: formData.phan_quyen,
//                     trang_thai: formData.trang_thai,
//                 });

//                 const tai_khoan_id = taiKhoanResponse.data.tai_khoan_id;

//                 // 2. Thêm vào bảng NguoiDung
//                 await axios.post("http://localhost:5093/api/NguoiDung/add", {
//                     tai_khoan_id,
//                     ho_ten: formData.ho_ten,
//                     vai_tro: formData.vai_tro,
//                     phong_ban: formData.phong_ban,
//                     thong_tin_lien_he: formData.thong_tin_lien_he,
//                 });

//                 // 3. Kiểm tra vai_tro và thêm vào bảng SinhVien hoặc GiaoVien
//                 if (formData.vai_tro.toLowerCase() === "Sinh viên") {
//                     await axios.post("http://localhost:5093/api/SinhVien", { tai_khoan_id });
//                 } else if (formData.vai_tro.toLowerCase() === "Giáo viên") {
//                     await axios.post("http://localhost:5093/api/GiaoVien", { tai_khoan_id });
//                 }

//                 fetchAccounts();
//                 handleClose();
//             } catch (error) {
//                 console.error("Lỗi khi thêm tài khoản:", error);
//             }
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
//             try {
//                 await axios.delete(`http://localhost:5093/api/TaiKhoan/${id}`);
//                 fetchAccounts();
//             } catch (error) {
//                 console.error("Lỗi khi xóa tài khoản:", error);
//             }
//         }
//     };

//     return (
//         <Box sx={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Danh sách tài khoản
//             </Typography>
//             <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: "10px" }}>
//                 Thêm tài khoản
//             </Button>
//             <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Họ tên</TableCell>
//                             <TableCell>Vai trò</TableCell>
//                             <TableCell>Phòng ban</TableCell>
//                             <TableCell>Thông tin liên hệ</TableCell>
//                             <TableCell>Tên đăng nhập</TableCell>
//                             <TableCell>Phân quyền</TableCell>
//                             <TableCell>Trạng thái</TableCell>
//                             <TableCell>Thao tác</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {accounts.map((account) => (
//                             <TableRow key={account.tai_khoan_id}>
//                                 <TableCell>{account.tai_khoan_id}</TableCell>
//                                 <TableCell>{account.ho_ten}</TableCell>
//                                 <TableCell>{account.vai_tro}</TableCell>
//                                 <TableCell>{account.phong_ban}</TableCell>
//                                 <TableCell>{account.thong_tin_lien_he}</TableCell>
//                                 <TableCell>{account.ten_dang_nhap}</TableCell>
//                                 <TableCell>{account.phan_quyen}</TableCell>
//                                 <TableCell>{account.trang_thai}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="warning" onClick={() => handleOpen(account)} sx={{ marginRight: "5px" }}>
//                                         Sửa
//                                     </Button>
//                                     <Button variant="contained" color="error" onClick={() => handleDelete(account.tai_khoan_id)}>
//                                         Xóa
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//         </Box>
//     );
// };

// export default AccountScreen;
/////////////////////////////////////////////////////////////////////////////////ngày 26/02/2024
