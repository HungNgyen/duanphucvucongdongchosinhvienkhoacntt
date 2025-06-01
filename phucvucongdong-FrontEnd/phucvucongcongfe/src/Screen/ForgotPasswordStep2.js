





import { useState } from 'react';
import {
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Card,
    CardContent,
} from '@mui/material';

function ForgotPasswordStep2({ info }) {
    const [method, setMethod] = useState('email');

    // Kiểm tra nếu info không phải mảng hoặc rỗng
    if (!info || !Array.isArray(info) || info.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', mt: 10 }}>
                <Typography color="error" variant="h6">
                    Không có thông tin tài khoản.
                </Typography>
            </Box>
        );
    }

    // Lấy phần tử đầu tiên của mảng
    const accountInfo = info[0];

    const isStudent = !!accountInfo.ma_so_sinh_vien;
    const maSo = isStudent ? accountInfo.ma_so_sinh_vien : accountInfo.ma_so_giao_vien;
    const hoTen = isStudent ? accountInfo.ho_ten_sinh_vien : accountInfo.ho_ten_giao_vien;
    const lienHe = accountInfo.thong_tin_lien_he || 'Không có thông tin liên hệ';
    const thongBao = accountInfo.thongBao;

    const handleSendCode = async () => {
        alert(`Gửi mã xác nhận qua ${method === 'phone' ? 'số điện thoại' : 'email'} cho mã số ${maSo}`);
        // TODO: Gọi API gửi mã xác nhận tại đây
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', mt: 8, px: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <img
                    src="/logo.png"
                    alt="Lac Hong University"
                    style={{ width: 120, marginBottom: 16 }}
                />
                <Typography variant="h5" fontWeight="bold">
                    Thông tin tài khoản
                </Typography>
            </Box>

            <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom>
                        <strong>Họ tên:</strong> {hoTen || 'Không có tên'}
                    </Typography>
                    <Typography gutterBottom>
                        <strong>Mã số:</strong> {maSo}
                    </Typography>
                    <Typography gutterBottom>
                        <strong>Liên hệ:</strong> {lienHe}
                    </Typography>
                    {thongBao && (
                        <Typography sx={{ mt: 1.5, color: 'blue' }}>
                            <strong>Thông báo:</strong> {thongBao}
                        </Typography>
                    )}

                    <Typography sx={{ color: 'red', mt: 3 }}>
                        Bạn muốn nhận mã để đặt lại mật khẩu bằng:
                    </Typography>

                    <RadioGroup
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        sx={{ mt: 1 }}
                    >
                        <FormControlLabel
                            value="phone"
                            control={<Radio />}
                            label={`Điện thoại: ${lienHe}`}
                            disabled={!lienHe}
                        />
                        <FormControlLabel
                            value="email"
                            control={<Radio />}
                            label={`Email: ${lienHe}`}
                            disabled={!lienHe}
                        />
                    </RadioGroup>

                    <Box sx={{ textAlign: 'right', mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSendCode}
                            disabled={!method || !lienHe}
                        >
                            GỬI MÃ XÁC NHẬN
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default ForgotPasswordStep2;






















