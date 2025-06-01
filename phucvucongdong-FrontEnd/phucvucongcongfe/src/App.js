



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginScreen from "./Screen/LoginScreen"; // Đường dẫn tới LoginPage.js


import Dashboard from "./AdminScreen/Dashboard";
//import AccountScreen from "./AdminScreen/AccountScreen";



import DashBoardGiaoVien from "./GiaoVienScreen/DashBoardGiaoVien";
import LichSuHoatDongGiaoVienScreen from "./GiaoVienScreen/LichSuHoatDongGiaoVienScreen";
import LopPhuTrach from "./GiaoVienScreen/LopPhuTrach";


import DashBoardSinhVien from "./SinhVienScreen/DashBoardSinhVien";
import LichSuScreen from "./SinhVienScreen/LichSuScreen";
import MinhChungHoatDongScreen from "./SinhVienScreen/MinhChungHoatDongScreen";



import QuanSinhScreen from "./QuanSinhScreen/QuanSinhScreen";
import HoatDongDetail from "./QuanSinhScreen/HoatDongDetail";



import CoVanScreen from "./CoVanScreen/CoVanScreen";




import ForgotPasswordPage from "./Screen/ForgotPasswordPage";



import ProfileScreen from "./ProfileScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";












function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} /> {/* Route cho LoginScreen */}

        <Route path="/admin/dashboard" element={<Dashboard />} />
        {/* <Route path="/admin/accounts" element={<AccountScreen />} /> */}




        <Route path="/giaovien/home" element={<DashBoardGiaoVien />} />
        <Route path="/lichsuhoatdonggiaovien" element={<LichSuHoatDongGiaoVienScreen />} />
        <Route path="/lopphutrach" element={<LopPhuTrach />} />



        <Route path="/sinhvien/home" element={<DashBoardSinhVien />} />

        <Route path="/lichsu" element={<LichSuScreen />} />
        <Route path="/minhchung" element={<MinhChungHoatDongScreen />} />

        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/changepassword" element={<ChangePasswordScreen />} />



        <Route path="/quansinh/home" element={<QuanSinhScreen />} />

        <Route path="/hoat-dong/:id" element={<HoatDongDetail />} />
        {/* <Route path="/hoatdong/:hoat_dong_id" element={<HoatDongDetail />} /> */}



        <Route path="/covan/home" element={<CoVanScreen />} />



        <Route path="/quen-mat-khau" element={<ForgotPasswordPage />} />

      </Routes>
    </Router>
  );
}

export default App;