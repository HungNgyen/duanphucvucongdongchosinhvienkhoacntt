






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// import { Link } from "react-router-dom";

// import axiosInstance from "./axiosConfig";


// const LoginScreen = () => {
//     const [ten_dang_nhap, setTenDangNhap] = useState("");
//     const [mat_khau, setMatKhau] = useState("");
//     const [remember, setRemember] = useState(false);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [savedAccounts, setSavedAccounts] = useState([]);
//     const [showDropdown, setShowDropdown] = useState(false);

//     useEffect(() => {
//         // Lấy danh sách tài khoản đã lưu từ cookie
//         const savedData = Cookies.get("saved_accounts");
//         if (savedData) {
//             try {
//                 const decodedData = decodeURIComponent(savedData);
//                 setSavedAccounts(JSON.parse(decodedData));
//             } catch (e) {
//                 console.error("Error parsing saved accounts:", e);
//                 setSavedAccounts([]);
//             }
//         } else {
//             setSavedAccounts([]);
//         }

//         // Lấy thông tin user từ cookie (nếu có) để kiểm tra
//         const userCookie = Cookies.get("user");
//         if (userCookie) {
//             try {
//                 const decodedUser = decodeURIComponent(userCookie);
//                 const userData = JSON.parse(decodedUser);
//                 console.log("User from cookie:", userData); // Kiểm tra dữ liệu user
//             } catch (e) {
//                 console.error("Error parsing user cookie:", e);
//             }
//         }
//     }, []);

//     const handleUsernameFocus = () => {
//         setTimeout(() => {
//             const isBrowserAutocompleteOpen = document.activeElement.getAttribute("aria-expanded") === "true";
//             if (!isBrowserAutocompleteOpen) {
//                 setShowDropdown(true);
//             }
//         }, 100);
//     };

//     const handleSelectAccount = (username) => {
//         const account = savedAccounts.find((acc) => acc.username === username);
//         if (account) {
//             setTenDangNhap(account.username);
//             setMatKhau(account.password);
//             setShowDropdown(false);
//         }
//     };

//     const handleLogin = async (event) => {
//         event.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             const response = await axios.post("http://localhost:5093/api/TaiKhoan/login", {
//                 ten_dang_nhap,
//                 mat_khau,
//             });

//             if (response.status === 200 && response.data.success) {
//                 // Lấy dữ liệu user từ response
//                 const userData = response.data.data;
//                 const token = response.data.token;

//                 Cookies.set("jwtToken", token, { expires: 7, path: "/", secure: true, sameSite: "Strict" });
//                 // Lưu user vào cookie
//                 Cookies.set("user", JSON.stringify(userData), { expires: 7, path: '/' });

//                 Cookies.set("nguoi_dung_id", userData.nguoi_dung_id, { expires: 7, path: '/' }); ////////////////////25/04/2025


//                 if (remember) {
//                     const newAccount = { username: ten_dang_nhap, password: mat_khau };
//                     const updatedAccounts = [
//                         ...savedAccounts.filter((acc) => acc.username !== ten_dang_nhap),
//                         newAccount,
//                     ];
//                     Cookies.set("saved_accounts", JSON.stringify(updatedAccounts), { expires: 7 });
//                     setSavedAccounts(updatedAccounts); // Cập nhật state
//                 }

//                 const { phan_quyen } = userData;
//                 if (phan_quyen === "Admin") window.location.href = "/admin/dashboard";
//                 else if (phan_quyen === "Giáo Viên") window.location.href = "/giaovien/home";
//                 else if (phan_quyen === "Sinh Viên") window.location.href = "/sinhvien/home";
//                 else if (phan_quyen === "Cố vấn học tập") window.location.href = "/covan/home";
//                 else if (phan_quyen === "Quản Sinh") window.location.href = "/quansinh/home";
//                 else alert("Quyền không hợp lệ. Vui lòng liên hệ quản trị viên.");
//             } else {
//                 setError(response.data.message || "Đăng nhập thất bại.");
//             }
//         } catch (err) {
//             setError("Không thể kết nối tới server. Vui lòng thử lại sau.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100vh",
//                 backgroundColor: "#f7f9fc",
//             }}
//         >
//             <div
//                 style={{
//                     width: "400px",
//                     backgroundColor: "#fff",
//                     padding: "30px",
//                     borderRadius: "8px",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                     textAlign: "center",
//                     fontFamily: "Arial, sans-serif",
//                     position: "relative",
//                 }}
//             >
//                 <img
//                     src="/Assets/logolachong.png"
//                     alt="Lac Hong University Logo"
//                     style={{ width: "100px", marginBottom: "20px" }}
//                 />
//                 <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#00257c", margin: "0" }}>
//                     LAC HONG UNIVERSITY
//                 </h1>
//                 <p style={{ fontSize: "14px", color: "#d4af37", marginBottom: "20px" }}>ASPIRE TO LEAD</p>
//                 {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

//                 <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
//                     <div style={{ marginBottom: "15px", position: "relative" }}>
//                         <input
//                             type="text"
//                             id="ten_dang_nhap"
//                             value={ten_dang_nhap}
//                             onChange={(e) => setTenDangNhap(e.target.value)}
//                             onFocus={handleUsernameFocus}
//                             placeholder="Tên tài khoản"
//                             required
//                             autoComplete="username"
//                             style={{
//                                 width: "98%",
//                                 padding: "10px",
//                                 border: "1px solid #ccc",
//                                 borderRadius: "4px",
//                             }}
//                         />
//                         {showDropdown && savedAccounts.length > 0 && (
//                             <ul
//                                 style={{
//                                     position: "absolute",
//                                     top: "40px",
//                                     left: "0",
//                                     width: "80%",
//                                     backgroundColor: "#fff",
//                                     border: "1px solid #ccc",
//                                     borderRadius: "4px",
//                                     listStyle: "none",
//                                     padding: "5px",
//                                     margin: "0",
//                                     zIndex: 1000,
//                                     fontSize: "12px",
//                                 }}
//                             >
//                                 {savedAccounts.map((account) => (
//                                     <li
//                                         key={account.username}
//                                         onClick={() => handleSelectAccount(account.username)}
//                                         style={{
//                                             padding: "6px",
//                                             cursor: "pointer",
//                                             borderBottom: "1px solid #ddd",
//                                         }}
//                                     >
//                                         {account.username}
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>

//                     <div style={{ marginBottom: "15px" }}>
//                         <input
//                             type="password"
//                             id="mat_khau"
//                             value={mat_khau}
//                             onChange={(e) => setMatKhau(e.target.value)}
//                             placeholder="Mật khẩu"
//                             required
//                             autoComplete="current-password"
//                             style={{
//                                 width: "98%",
//                                 padding: "10px",
//                                 border: "1px solid #ccc",
//                                 borderRadius: "4px",
//                             }}
//                         />
//                     </div>

//                     <div
//                         style={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             marginBottom: "20px",
//                         }}
//                     >
//                         {/* <a
//                             href="/forgot-password"
//                             style={{ fontSize: "12px", color: "#0056b3", textDecoration: "none" }}
//                         >
//                             Bạn quên kí danh hoặc mật khẩu?
//                         </a> */}

//                         {/* <Link
//                             to="/quen-mat-khau"
//                             style={{ fontSize: "12px", color: "#0056b3", textDecoration: "none" }}
//                         >
//                             Bạn quên kí danh hoặc mật khẩu?
//                         </Link> */}


//                         <div style={{ display: "flex", alignItems: "center" }}>
//                             <input
//                                 type="checkbox"
//                                 id="remember"
//                                 checked={remember}
//                                 onChange={(e) => setRemember(e.target.checked)}
//                             />
//                             <label htmlFor="remember" style={{ fontSize: "12px", marginLeft: "5px" }}>
//                                 Nhớ tài khoản và mật khẩu
//                             </label>
//                         </div>
//                     </div>

//                     <button
//                         type="submit"
//                         style={{
//                             width: "103%",
//                             padding: "10px",
//                             backgroundColor: "#0056b3",
//                             color: "#fff",
//                             border: "none",
//                             borderRadius: "4px",
//                             fontSize: "16px",
//                             cursor: "pointer",
//                         }}
//                         disabled={loading}
//                     >
//                         {loading ? "Đang xử lý..." : "Đăng Nhập"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// // Hàm tiện ích để lấy thông tin user từ cookie
// export const getUserFromCookie = () => {
//     const userCookie = Cookies.get("user");
//     if (userCookie) {
//         try {
//             const decodedUser = decodeURIComponent(userCookie);
//             return JSON.parse(decodedUser);
//         } catch (e) {
//             console.error("Error parsing user cookie:", e);
//             return null;
//         }
//     }
//     return null;
// };

// export default LoginScreen; ///////////////////////gốc


























import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axiosInstance from "./axiosConfig";

const LoginScreen = () => {
    const [ten_dang_nhap, setTenDangNhap] = useState("");
    const [mat_khau, setMatKhau] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [savedAccounts, setSavedAccounts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Hàm xác định năm học và học kỳ hiện tại
    const getCurrentAcademicYearAndSemester = () => {
        const today = new Date(); // Ngày hiện tại: 30/05/2025
        const month = today.getMonth() + 1; // Tháng từ 1-12
        const year = today.getFullYear();

        let nam_hoc, hoc_ky;
        // Xác định năm học
        if (month >= 9) {
            nam_hoc = `${year}-${year + 1}`; // Từ tháng 9 trở đi
        } else {
            nam_hoc = `${year - 1}-${year}`; // Từ tháng 1-8
        }

        // Xác định học kỳ
        if (month >= 9 || month <= 1) {
            hoc_ky = 1; // Học kỳ 1: Tháng 9 - Tháng 1
        } else {
            hoc_ky = 2; // Học kỳ 2: Tháng 2 - Tháng 8
        }

        return { nam_hoc, hoc_ky };
    };

    useEffect(() => {
        const savedData = Cookies.get("saved_accounts");
        if (savedData) {
            try {
                const decodedData = decodeURIComponent(savedData);
                setSavedAccounts(JSON.parse(decodedData));
            } catch (e) {
                console.error("Error parsing saved accounts:", e);
                setSavedAccounts([]);
            }
        } else {
            setSavedAccounts([]);
        }

        const userCookie = Cookies.get("user");
        if (userCookie) {
            try {
                const decodedUser = decodeURIComponent(userCookie);
                const userData = JSON.parse(decodedUser);
                console.log("User from cookie:", userData);
            } catch (e) {
                console.error("Error parsing user cookie:", e);
            }
        }
    }, []);

    const handleUsernameFocus = () => {
        setTimeout(() => {
            const isBrowserAutocompleteOpen = document.activeElement.getAttribute("aria-expanded") === "true";
            if (!isBrowserAutocompleteOpen) {
                setShowDropdown(true);
            }
        }, 100);
    };

    const handleSelectAccount = (username) => {
        const account = savedAccounts.find((acc) => acc.username === username);
        if (account) {
            setTenDangNhap(account.username);
            setMatKhau(account.password);
            setShowDropdown(false);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { nam_hoc, hoc_ky } = getCurrentAcademicYearAndSemester();

            const response = await axios.post("http://localhost:5093/api/TaiKhoan/login", {
                ten_dang_nhap,
                mat_khau,
                nam_hoc: nam_hoc,
                hoc_ky: hoc_ky,
            });

            if (response.status === 200 && response.data.success) {
                const userData = response.data.data;
                const token = response.data.token;

                Cookies.set("jwtToken", token, { expires: 7, path: "/", secure: true, sameSite: "Strict" });
                Cookies.set("user", JSON.stringify(userData), { expires: 7, path: '/' });
                Cookies.set("nguoi_dung_id", userData.nguoi_dung_id, { expires: 7, path: '/' });

                if (remember) {
                    const newAccount = { username: ten_dang_nhap, password: mat_khau };
                    const updatedAccounts = [
                        ...savedAccounts.filter((acc) => acc.username !== ten_dang_nhap),
                        newAccount,
                    ];
                    Cookies.set("saved_accounts", JSON.stringify(updatedAccounts), { expires: 7 });
                    setSavedAccounts(updatedAccounts);
                }

                const { phan_quyen } = userData;
                if (phan_quyen === "Admin") window.location.href = "/admin/dashboard";
                else if (phan_quyen === "Giáo Viên") window.location.href = "/giaovien/home";
                else if (phan_quyen === "Sinh Viên") window.location.href = "/sinhvien/home";
                else if (phan_quyen === "Cố vấn học tập") window.location.href = "/covan/home";
                else if (phan_quyen === "Quản Sinh") window.location.href = "/quansinh/home";
                else alert("Quyền không hợp lệ. Vui lòng liên hệ quản trị viên.");
            } else {
                setError(response.data.message || "Đăng nhập thất bại.");
            }
        } catch (err) {
            setError("Không thể kết nối tới server. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f7f9fc" }}>
            <div style={{ width: "400px", backgroundColor: "#fff", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center", fontFamily: "Arial, sans-serif", position: "relative" }}>
                <img src="/Assets/logolachong.png" alt="Lac Hong University Logo" style={{ width: "100px", marginBottom: "20px" }} />
                <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#00257c", margin: "0" }}>LAC HONG UNIVERSITY</h1>
                <p style={{ fontSize: "14px", color: "#d4af37", marginBottom: "20px" }}>ASPIRE TO LEAD</p>
                {error && <p style={{ color: "red", marginBottom: "15px" }}>{error}</p>}

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ marginBottom: "15px", position: "relative" }}>
                        <input
                            type="text"
                            id="ten_dang_nhap"
                            value={ten_dang_nhap}
                            onChange={(e) => setTenDangNhap(e.target.value)}
                            onFocus={handleUsernameFocus}
                            placeholder="Tên tài khoản"
                            required
                            autoComplete="username"
                            style={{ width: "98%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                        {showDropdown && savedAccounts.length > 0 && (
                            <ul style={{ position: "absolute", top: "40px", left: "0", width: "80%", backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "4px", listStyle: "none", padding: "5px", margin: "0", zIndex: 1000, fontSize: "12px" }}>
                                {savedAccounts.map((account) => (
                                    <li key={account.username} onClick={() => handleSelectAccount(account.username)} style={{ padding: "6px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                                        {account.username}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                        <input
                            type="password"
                            id="mat_khau"
                            value={mat_khau}
                            onChange={(e) => setMatKhau(e.target.value)}
                            placeholder="Mật khẩu"
                            required
                            autoComplete="current-password"
                            style={{ width: "98%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                        />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                            <label htmlFor="remember" style={{ fontSize: "12px", marginLeft: "5px" }}>Nhớ tài khoản và mật khẩu</label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{ width: "103%", padding: "10px", backgroundColor: "#0056b3", color: "#fff", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer" }}
                        disabled={loading}
                    >
                        {loading ? "Đang xử lý..." : "Đăng Nhập"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export const getUserFromCookie = () => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
        try {
            const decodedUser = decodeURIComponent(userCookie);
            return JSON.parse(decodedUser);
        } catch (e) {
            console.error("Error parsing user cookie:", e);
            return null;
        }
    }
    return null;
};

export default LoginScreen;




















