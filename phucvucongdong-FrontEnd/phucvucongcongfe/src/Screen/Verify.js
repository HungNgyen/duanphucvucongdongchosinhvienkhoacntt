

// import { useState } from 'react';
// import {
//     Box,
//     Typography,
//     TextField,
//     Button,
//     Card,
//     CardContent,
// } from '@mui/material';
// import axios from 'axios';

// function Verify({ email, nguoiDungId, onVerified }) {
//     const [code, setCode] = useState('');
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleVerify = async () => {
//         if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
//             setError('Mã xác nhận phải là 6 chữ số');
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         try {
//             const response = await axios.post('http://localhost:5093/api/Email/verify-code', {
//                 nguoiDungId, // Truyền nguoi_dung_id
//                 email: email || 'Không có email',
//                 code,
//             });
//             alert('Xác nhận thành công!');
//             onVerified();
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || err.message || 'Không thể xác nhận mã';
//             setError(errorMessage);
//             alert(`Lỗi: ${errorMessage}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Box sx={{ maxWidth: 500, margin: 'auto', mt: 8, px: 3 }}>
//             <Box sx={{ textAlign: 'center', mb: 2 }}>
//                 <img
//                     src="/logo.png"
//                     alt="Lac Hong University"
//                     style={{ width: 120, marginBottom: 16 }}
//                 />
//                 <Typography variant="h5" fontWeight="bold">
//                     Xác minh mã
//                 </Typography>
//             </Box>

//             <Card variant="outlined">
//                 <CardContent>
//                     <Typography gutterBottom>
//                         Vui lòng nhập mã xác nhận đã được gửi tới email: {email || 'Không có email'}
//                     </Typography>

//                     <TextField
//                         label="Mã xác nhận"
//                         value={code}
//                         onChange={(e) => setCode(e.target.value)}
//                         fullWidth
//                         margin="normal"
//                         inputProps={{ maxLength: 6 }}
//                     />

//                     {error && (
//                         <Typography color="error" sx={{ mt: 2 }}>
//                             {error}
//                         </Typography>
//                     )}

//                     <Box sx={{ textAlign: 'right', mt: 3 }}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={handleVerify}
//                             disabled={loading}
//                         >
//                             {loading ? 'Đang xác nhận...' : 'XÁC NHẬN'}
//                         </Button>
//                     </Box>
//                 </CardContent>
//             </Card>
//         </Box>
//     );
// }

// export default Verify;