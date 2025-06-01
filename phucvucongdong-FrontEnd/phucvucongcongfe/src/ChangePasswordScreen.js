


import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Alert } from "@mui/material";
import Cookies from "js-cookie";

const ChangePasswordScreen = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [nguoiDungId, setNguoiDungId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        // Lấy dữ liệu từ cookie 'user'
        const userCookie = Cookies.get("user");
        if (!userCookie) throw new Error("Không tìm thấy thông tin người dùng trong cookie.");

        // Giải mã và phân tích dữ liệu từ cookie
        const decodedUser = decodeURIComponent(userCookie);
        const parsedUser = JSON.parse(decodedUser);

        // Lấy nguoi_dung_id từ cookie
        const idFromCookie = Cookies.get("nguoi_dung_id");
        if (!idFromCookie) throw new Error("Không tìm thấy ID người dùng trong cookie.");

        setNguoiDungId(parseInt(idFromCookie, 10)); // Chuyển đổi sang số nguyên
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (loading || !nguoiDungId) {
      setError("Vui lòng đợi hoặc kiểm tra lại thông tin đăng nhập.");
      return;
    }

    // Kiểm tra mật khẩu
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    if (formData.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5093/api/TaiKhoan/doi-mat-khau`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nguoi_dung_id: nguoiDungId,
          mat_khau_cu: formData.oldPassword,
          mat_khau_moi: formData.newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.message && data.message.includes("thành công")) {
          setSuccess(data.message);

          // Xóa các cookie sau khi đổi mật khẩu thành công
          Cookies.remove("user");
          Cookies.remove("nguoi_dung_id");
          Cookies.remove("jwtToken"); // Giả định có token xác thực

          // Chuyển hướng về trang đăng nhập sau 2 giây
          setTimeout(() => {
            window.location.href = "/"; // Thay bằng route đăng nhập của bạn
          }, 2000);
        } else {
          setError(data.message || "Đổi mật khẩu thất bại. Vui lòng kiểm tra lại.");
        }
      } else {
        setError(data.message || "Đổi mật khẩu thất bại. Vui lòng kiểm tra lại.");
      }
    } catch (err) {
      setError("Không thể kết nối đến server. Vui lòng thử lại sau.");
    }
  };

  if (loading) return <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2 }}><Typography>Đang tải...</Typography></Box>;

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Đổi Mật Khẩu
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Mật khẩu cũ"
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Mật khẩu mới"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Xác nhận mật khẩu mới"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 3 }}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Đổi Mật Khẩu
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ChangePasswordScreen;