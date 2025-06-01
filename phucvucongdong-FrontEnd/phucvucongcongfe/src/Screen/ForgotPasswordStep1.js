






import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

function ForgotPasswordStep1({ onSuccess, onBack }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Kiểm tra đầu vào
    if (!input.trim()) {
      setError('Vui lòng nhập mã số hoặc tên đăng nhập.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const res = await axios.get(`http://localhost:5093/api/TaiKhoan/quen-mat-khau/view/${input}`);
      if (res.data.ThongBao) {
        setError(res.data.ThongBao); // Hiển thị thông báo lỗi từ backend
      } else {
        console.log('API Response:', res.data);
        onSuccess(res.data); // Chuyển sang bước tiếp theo
      }
    } catch (err) {
      setError('Không tìm thấy tài khoản hoặc lỗi hệ thống.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        mt: 8,
        textAlign: 'center',
      }}
    >
      <img
        src="/logo.png"
        alt="Lac Hong University"
        style={{ width: 100, marginBottom: 20 }}
      />
      <Typography variant="h5" gutterBottom>
        Lấy lại mật khẩu
      </Typography>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Mã hoặc Tên đăng nhập"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ textTransform: 'none' }}
          disabled={isLoading}
        >
          Trở lại
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          Kiểm tra tài khoản
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default ForgotPasswordStep1;