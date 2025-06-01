



// import React, { useState, useEffect } from "react";
// import {
//   Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
//   CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
//   Snackbar, Alert
// } from "@mui/material";
// import axios from "axios";
// import Cookies from "js-cookie";

// const LichSuScreen = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [user, setUser] = useState(null);
//   const [selectedActivity, setSelectedActivity] = useState(null);
//   const [minhChung, setMinhChung] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   useEffect(() => {
//     const userCookie = Cookies.get("user");
//     if (userCookie) {
//       try {
//         const decodedUser = decodeURIComponent(userCookie);
//         const parsedUser = JSON.parse(decodedUser);
//         setUser(parsedUser);
//       } catch (error) {
//         setError("Không thể lấy thông tin người dùng từ cookie.");
//         setLoading(false);
//       }
//     } else {
//       setError("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       if (!user?.nguoi_dung_id) return;
//       try {
//         const response = await axios.get(`http://localhost:5093/api/ThamGiaSinhVien/get-by-user/${user.nguoi_dung_id}`);
//         setHistory(response.data);
//       } catch (error) {
//         setError("Không thể tải lịch sử. Vui lòng thử lại sau.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) fetchHistory();
//   }, [user]);

//   const handleRowClick = (activity) => {
//     setSelectedActivity(activity);
//     setMinhChung(activity.minh_chung || "");
//   };

//   const handleCloseDialog = () => {
//     setSelectedActivity(null);
//     setMinhChung("");
//   };

//   const handleSubmitMinhChung = async () => {
//     if (!selectedActivity) return;
//     setSubmitting(true);
//     try {
//       const payload = {
//         nguoi_dung_id: user.nguoi_dung_id,
//         hoat_dong_id: selectedActivity.hoat_dong_id,
//         loai_hanh_dong: selectedActivity.loai_hanh_dong,
//         minh_chung: minhChung
//       };
//       const response = await axios.post("http://localhost:5093/api/ThamGiaSinhVien/sinhviennopminhchung", payload);
//       setSnackbar({ open: true, message: response.data.message || "Nộp minh chứng thành công!", severity: "success" });
//       handleCloseDialog();
//     } catch (err) {
//       setSnackbar({ open: true, message: err?.response?.data?.message || "Lỗi khi nộp minh chứng!", severity: "error" });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleHuyThamGia = async () => {
//     if (!selectedActivity) return;

//     if (!window.confirm("Bạn có chắc chắn muốn hủy tham gia hoạt động này không?")) return;

//     try {
//       const response = await axios.delete(`http://localhost:5093/api/ThamGiaSinhVien/huy/${selectedActivity.sinh_vien_id}/${selectedActivity.hoat_dong_id}`);
//       setSnackbar({ open: true, message: response.data.message || "Đã hủy tham gia hoạt động!", severity: "success" });
//       handleCloseDialog();
//       setHistory(history.filter(h => h.hoat_dong_id !== selectedActivity.hoat_dong_id));
//     } catch (err) {
//       setSnackbar({ open: true, message: err?.response?.data?.message || "Lỗi khi hủy tham gia!", severity: "error" });
//     }
//   };

//   return (
//     <Box sx={{ padding: 3, backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
//       <Typography variant="h5" gutterBottom>
//         Lịch Sử Hoạt Động Của Bạn
//       </Typography>

//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Tên Hoạt Động</TableCell>
//                 <TableCell>Loại Hành Động</TableCell>
//                 <TableCell>Mô Tả</TableCell>
//                 <TableCell>Trạng Thái</TableCell>
//                 <TableCell>Điểm</TableCell>
//                 {/* <TableCell>Thời Gian</TableCell> */}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {history.map((item) => (
//                 <TableRow
//                   key={`${item.sinh_vien_id}_${item.hoat_dong_id}`}
//                   hover
//                   onClick={() => handleRowClick(item)}
//                   sx={{ cursor: "pointer" }}
//                 >
//                   <TableCell>{item.ten_hoat_dong}</TableCell>
//                   <TableCell>{item.loai_hanh_dong}</TableCell>
//                   <TableCell>{item.mo_ta || "Không có mô tả"}</TableCell>
//                   <TableCell>{item.trang_thai}</TableCell>
//                   <TableCell>{item.diem}</TableCell>
//                   {/* <TableCell>{new Date(item.thoi_gian_thuc_hien).toLocaleString()}</TableCell> */}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Dialog Chi Tiết */}
//       <Dialog open={Boolean(selectedActivity)} onClose={handleCloseDialog} fullWidth>
//         <DialogTitle>Chi Tiết Hoạt Động</DialogTitle>
//         <DialogContent>
//           {selectedActivity && (
//             <>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Tên hoạt động:</strong> {selectedActivity.ten_hoat_dong}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Loại hành động:</strong> {selectedActivity.loai_hanh_dong}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Mô tả:</strong> {selectedActivity.mo_ta || "Không có mô tả"}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Trạng thái:</strong> {selectedActivity.trang_thai}
//               </Typography>
//               <Typography variant="body1" gutterBottom>
//                 <strong>Điểm:</strong> {selectedActivity.diem}
//               </Typography>
//               {/* <Typography variant="body1" gutterBottom>
//                 <strong>Thời gian:</strong> {new Date(selectedActivity.thoi_gian_thuc_hien).toLocaleString()}
//               </Typography> */}

//               <TextField
//                 label="Minh chứng"
//                 fullWidth
//                 multiline
//                 rows={3}
//                 sx={{ marginTop: 2 }}
//                 value={minhChung}
//                 onChange={(e) => setMinhChung(e.target.value)}
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Đóng</Button>
//           <Button onClick={handleHuyThamGia} color="error">Hủy tham gia</Button>
//           <Button onClick={handleSubmitMinhChung} disabled={submitting} variant="contained" color="primary">
//             {submitting ? "Đang gửi..." : "Nộp minh chứng"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default LichSuScreen; ////////////////////25052025 08:51 root






















import React, { useState, useEffect } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,
  Snackbar, Alert, Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import Cookies from "js-cookie";

const LichSuScreen = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [minhChung, setMinhChung] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const decodedUser = decodeURIComponent(userCookie);
        const parsedUser = JSON.parse(decodedUser);
        setUser(parsedUser);
      } catch (error) {
        setError("Không thể lấy thông tin người dùng từ cookie.");
        setLoading(false);
      }
    } else {
      setError("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.nguoi_dung_id) return;
      try {
        const response = await axios.get(`http://localhost:5093/api/ThamGiaSinhVien/get-by-user/${user.nguoi_dung_id}`);
        setHistory(response.data);
      } catch (error) {
        setError("Không thể tải lịch sử. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchHistory();
  }, [user]);

  const handleRowClick = (activity) => {
    setSelectedActivity(activity);
    setMinhChung(activity.minh_chung || "");
  };

  const handleCloseDialog = () => {
    setSelectedActivity(null);
    setMinhChung("");
  };

  const handleSubmitMinhChung = async () => {
    if (!selectedActivity) return;
    setSubmitting(true);
    try {
      const payload = {
        nguoi_dung_id: user.nguoi_dung_id,
        hoat_dong_id: selectedActivity.hoat_dong_id,
        loai_hanh_dong: selectedActivity.loai_hanh_dong,
        minh_chung: minhChung
      };
      const response = await axios.post("http://localhost:5093/api/ThamGiaSinhVien/sinhviennopminhchung", payload);
      setSnackbar({ open: true, message: response.data.message || "Nộp minh chứng thành công!", severity: "success" });
      handleCloseDialog();
    } catch (err) {
      setSnackbar({ open: true, message: err?.response?.data?.message || "Lỗi khi nộp minh chứng!", severity: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleHuyThamGia = async () => {
    if (!selectedActivity) return;

    if (!window.confirm("Bạn có chắc chắn muốn hủy tham gia hoạt động này không?")) return;

    try {
      const response = await axios.delete(`http://localhost:5093/api/ThamGiaSinhVien/huy/${selectedActivity.sinh_vien_id}/${selectedActivity.hoat_dong_id}`);
      setSnackbar({ open: true, message: response.data.message || "Đã hủy tham gia hoạt động!", severity: "success" });
      handleCloseDialog();
      setHistory(history.filter(h => h.hoat_dong_id !== selectedActivity.hoat_dong_id));
    } catch (err) {
      setSnackbar({ open: true, message: err?.response?.data?.message || "Lỗi khi hủy tham gia!", severity: "error" });
    }
  };

  // Nhóm các hoạt động theo năm học và học kỳ
  const groupedHistory = history.reduce((acc, item) => {
    const namHoc = item.nam_hoc || "Không xác định";
    const hocKy = item.hoc_ky ? `Học kỳ ${item.hoc_ky}` : "Không xác định";

    if (!acc[namHoc]) {
      acc[namHoc] = {};
    }
    if (!acc[namHoc][hocKy]) {
      acc[namHoc][hocKy] = [];
    }
    acc[namHoc][hocKy].push(item);
    return acc;
  }, {});

  // Sắp xếp năm học (giảm dần)
  const sortedNamHoc = Object.keys(groupedHistory).sort((a, b) => {
    if (a === "Không xác định") return 1;
    if (b === "Không xác định") return -1;
    return b.localeCompare(a);
  });

  // Sắp xếp học kỳ (Học kỳ 1 -> Học kỳ 2 -> Không xác định)
  const sortHocKy = (hocKyList) => {
    return hocKyList.sort((a, b) => {
      if (a === "Không xác định") return 1;
      if (b === "Không xác định") return -1;
      return a.localeCompare(b);
    });
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Typography variant="h5" gutterBottom>
        Lịch Sử Hoạt Động Của Bạn
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : sortedNamHoc.length === 0 ? (
        <Typography color="textSecondary">Không có lịch sử hoạt động.</Typography>
      ) : (
        sortedNamHoc.map((namHoc) => (
          <Accordion key={namHoc} sx={{ marginBottom: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                Năm học: {namHoc} ({Object.values(groupedHistory[namHoc]).flat().length} hoạt động)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {sortHocKy(Object.keys(groupedHistory[namHoc])).map((hocKy) => (
                <Accordion key={`${namHoc}-${hocKy}`} sx={{ marginBottom: 1, marginLeft: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">
                      {hocKy} ({groupedHistory[namHoc][hocKy].length} hoạt động)
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Tên Hoạt Động</TableCell>
                            <TableCell>Loại Hành Động</TableCell>
                            <TableCell>Mô Tả</TableCell>
                            <TableCell>Trạng Thái</TableCell>
                            <TableCell>Điểm</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {groupedHistory[namHoc][hocKy].map((item) => (
                            <TableRow
                              key={`${item.sinh_vien_id}_${item.hoat_dong_id}`}
                              hover
                              onClick={() => handleRowClick(item)}
                              sx={{ cursor: "pointer" }}
                            >
                              <TableCell>{item.ten_hoat_dong}</TableCell>
                              <TableCell>{item.loai_hanh_dong}</TableCell>
                              <TableCell>{item.mo_ta || "Không có mô tả"}</TableCell>
                              <TableCell>{item.trang_thai}</TableCell>
                              <TableCell>{item.diem}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      )}

      {/* Dialog Chi Tiết */}
      <Dialog open={Boolean(selectedActivity)} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Chi Tiết Hoạt Động</DialogTitle>
        <DialogContent>
          {selectedActivity && (
            <>
              <Typography variant="body1" gutterBottom>
                <strong>Tên hoạt động:</strong> {selectedActivity.ten_hoat_dong}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Loại hành động:</strong> {selectedActivity.loai_hanh_dong}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Mô tả:</strong> {selectedActivity.mo_ta || "Không có mô tả"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Trạng thái:</strong> {selectedActivity.trang_thai}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Điểm:</strong> {selectedActivity.diem}
              </Typography>

              <TextField
                label="Minh chứng"
                fullWidth
                multiline
                rows={3}
                sx={{ marginTop: 2 }}
                value={minhChung}
                onChange={(e) => setMinhChung(e.target.value)}
              />
              <Typography variant="body1" gutterBottom fontSize={13}>
                Lưu ý: bạn phải chắc rằng đường dẫn minh minh chứng của bạn ở chế độ công khai. Nếu đường dẫn không truy cập được sẽ bị hủy bỏ.
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
          <Button onClick={handleHuyThamGia} color="error">Hủy tham gia</Button>
          <Button onClick={handleSubmitMinhChung} disabled={submitting} variant="contained" color="primary">
            {submitting ? "Đang gửi..." : "Nộp minh chứng"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LichSuScreen;