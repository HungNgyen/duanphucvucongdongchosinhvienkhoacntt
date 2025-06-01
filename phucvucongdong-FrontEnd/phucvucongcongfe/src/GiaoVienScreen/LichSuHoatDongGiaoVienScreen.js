









import React, { useState, useEffect } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress, Dialog,
  DialogTitle, DialogContent, DialogActions, Button, TextField,
  Snackbar
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const LichSuHoatDongGiaoVienScreen = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [minhChung, setMinhChung] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
        setSnackbarMessage("Không thể lấy thông tin người dùng. Vui lòng đăng nhập lại.");
        setOpenSnackbar(true);
      }
    } else {
      setError("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      setLoading(false);
      setSnackbarMessage("Vui lòng đăng nhập để xem lịch sử hoạt động.");
      setOpenSnackbar(true);
    }
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.nguoi_dung_id) return;
      try {
        const response = await axios.get(`http://localhost:5093/api/DangKyGiaoVien/get-by-user/${user.nguoi_dung_id}`);
        setHistory(response.data);
      } catch (error) {
        setError("Không thể tải lịch sử. Vui lòng thử lại sau.");
        setSnackbarMessage("Thông báo"); // Thay thông báo lỗi kỹ thuật thành "Thông báo"
        setOpenSnackbar(true);
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
      const response = await axios.post("http://localhost:5093/api/DangKyGiaoVien/giaoviennopminhchung", payload);
      setSnackbarMessage(response.data.message || "Nộp minh chứng thành công!");
      setOpenSnackbar(true);
      handleCloseDialog();
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Thông báo"; // Thay thông báo lỗi kỹ thuật thành "Thông báo"
      setSnackbarMessage(errorMsg);
      setOpenSnackbar(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Typography variant="h5" gutterBottom>
        Lịch Sử Hoạt Động Bạn Đã Tạo
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên Hoạt Động</TableCell>
                <TableCell>Loại Hành Động</TableCell>
                <TableCell>Mô Tả</TableCell>
                <TableCell>Điểm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item, index) => (
                <TableRow
                  key={index}
                  hover
                  onClick={() => handleRowClick(item)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{item.ten_hoat_dong}</TableCell>
                  <TableCell>{item.loai_hanh_dong}</TableCell>
                  <TableCell>{item.mo_ta || "Không có mô tả"}</TableCell>
                  <TableCell>{item.diem || "0"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog Chi Tiết Hoạt Động */}
      <Dialog open={!!selectedActivity} onClose={handleCloseDialog} fullWidth>
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
                <strong>Điểm:</strong> {selectedActivity.diem || "0"}
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
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
          <Button onClick={handleSubmitMinhChung} disabled={submitting} variant="contained" color="primary">
            {submitting ? "Đang gửi..." : "Nộp minh chứng"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};

export default LichSuHoatDongGiaoVienScreen;