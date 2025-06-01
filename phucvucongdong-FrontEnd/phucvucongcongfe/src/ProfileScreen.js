






import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// CSS thuần được định nghĩa trực tiếp trong file
const styles = `
  .profile-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
    padding: 20px;
    gap: 20px;
    flex-wrap: wrap;
  }

  .profile-card {
    background-color: #ffffff;
    width: 100%;
    max-width: 5000px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    padding: 30px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .profile-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }

  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
    border: 3px solid #e0e0e0;
    transition: border-color 0.3s ease;
  }

  .profile-avatar:hover {
    border-color: #007bff;
  }

  .profile-name {
    font-size: 28px;
    font-weight: 700;
    color: #333;
  }

  .profile-divider {
    border: none;
    height: 1px;
    background: linear-gradient(to right, transparent, #d0d0d0, transparent);
    margin: 20px 0;
  }

  .profile-info {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
  }

  .profile-info p {
    margin: 10px 0;
    display: flex;
    align-items: center;
    transition: color 0.3s ease;
  }

  .profile-info p:hover {
    color: #007bff;
  }

  .profile-info strong {
    font-weight: 600;
    color: #333;
    margin-right: 8px;
  }

  .loading, .error, .no-data {
    text-align: center;
    padding: 20px;
    font-size: 16px;
  }

  .loading {
    color: #666;
  }

  .error {
    color: #d32f2f;
  }

  .no-data {
    color: #888;
  }

  /* Style cho phần điểm */
  .diem-container {
    background-color: #ffffff;
    width: 100%;
    max-width: 600px;
    min-width: 1470px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    padding: 30px;
  }
`;

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  // State điểm
  const [diemData, setDiemData] = useState([]);
  const [loadingDiem, setLoadingDiem] = useState(true);
  const [errorDiem, setErrorDiem] = useState(null);

  // Lấy user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userCookie = Cookies.get("user");
        if (!userCookie) throw new Error("Không tìm thấy thông tin người dùng trong cookie.");

        const decodedUser = decodeURIComponent(userCookie);
        const parsedUser = JSON.parse(decodedUser);

        const nguoiDungId = Cookies.get("nguoi_dung_id");
        let userData = parsedUser;

        if (nguoiDungId) {
          const response = await fetch(`http://localhost:5093/api/TaiKhoan/thong-tin/view/${nguoiDungId}`);
          if (!response.ok) throw new Error("Không thể lấy dữ liệu từ API");
          const apiData = await response.json();
          userData = apiData[0];
        }

        setUser({
          name: userData.ho_ten_sinh_vien || userData.ho_ten_giao_vien || "Không xác định",
          lop: userData.lop || null,
          studentId: userData.ma_so_sinh_vien || null,
          teacherId: userData.ma_so_giao_vien || null,
          email: userData.thong_tin_lien_he || "Không có thông tin",
          phone: userData.thong_tin_lien_he || "Không có thông tin",
          avatar: "/Assets/avatar.png",
          role: parsedUser?.phan_quyen || "Không xác định",
        });
      } catch (err) {
        setErrorUser(err.message);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  // Lấy điểm theo năm học - học kỳ
  useEffect(() => {
    const fetchDiemData = async () => {
      try {
        const nguoiDungId = Cookies.get("nguoi_dung_id");
        if (!nguoiDungId) throw new Error("Không tìm thấy ID người dùng để lấy điểm.");

        const response = await axios.get(`http://localhost:5093/api/SinhVien/diemtheonamhochocky/${nguoiDungId}`);
        setDiemData(response.data);
      } catch (err) {
        setErrorDiem("Lỗi khi lấy dữ liệu điểm.");
      } finally {
        setLoadingDiem(false);
      }
    };

    fetchDiemData();
  }, []);

  // Nhóm dữ liệu điểm theo năm học + học kỳ
  const groupedData = diemData.reduce((acc, item) => {
    const key = `Năm ${item.nam_hoc} - Học kỳ ${item.hoc_ky}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  // Inject CSS styles vào document
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  if (loadingUser) return <div className="loading">Đang tải thông tin người dùng...</div>;
  if (errorUser) return <div className="error">{errorUser}</div>;
  if (!user) return <div className="no-data">Không có dữ liệu người dùng.</div>;

  return (
    <div className="profile-container">
      {/* Phần thông tin cá nhân */}
      <div className="profile-card">
        <div className="profile-header">
          <img src={user.avatar} alt="Avatar" className="profile-avatar" />
          <h2 className="profile-name">{user.name}</h2>
        </div>
        <hr className="profile-divider" />
        <div className="profile-info">
          {user.studentId && (
            <p><strong>Lớp:</strong> {user.lop}</p>
          )}
          {user.studentId && (
            <p><strong>Mã sinh viên:</strong> {user.studentId}</p>
          )}
          {user.teacherId && (
            <p><strong>Mã giáo viên:</strong> {user.teacherId}</p>
          )}
          <p><strong>Thông tin liên hệ:</strong> {user.email}</p>
          <p><strong>Vai trò:</strong> {user.role}</p>
        </div>
      </div>

      {/* Phần bảng điểm theo học kỳ */}
      <Container className="diem-container" maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Điểm hoạt động theo năm học, học kỳ
        </Typography>

        {loadingDiem ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : errorDiem ? (
          <Typography color="error" mt={4}>{errorDiem}</Typography>
        ) : diemData.length === 0 ? (
          <Typography mt={4}>Chưa có điểm để hiển thị.</Typography>
        ) : (
          Object.keys(groupedData).map((group, idx) => (
            <Accordion key={idx}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">{group}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {groupedData[group].map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={item.ho_ten_sinh_vien}
                          secondary={`Điểm hoạt động phục vụ cộng đồng: ${item.tong_diem}`}
                        />
                      </ListItem>
                      {index !== groupedData[group].length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Container>
    </div>
  );
};

export default ProfileScreen;
