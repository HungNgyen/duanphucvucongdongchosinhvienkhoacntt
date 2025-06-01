






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const HoatDongCaNhanGiaoVien = () => {
    const [form, setForm] = useState({
        ten_hoat_dong: '',
        mo_ta: '',
        ngay_bat_dau: '',
        ngay_ket_thuc: '',
        tieu_chi_id: '',
    });
    const [tieuChiList, setTieuChiList] = useState([]);
    const [message, setMessage] = useState('');
    const [ketQua, setKetQua] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Added to match HoatDongCaNhanSinhVien

    const nguoi_dung_id = Cookies.get('nguoi_dung_id');

    useEffect(() => {
        axios
            .get('http://localhost:5093/api/TieuChi')
            .then((res) => setTieuChiList(res.data))
            .catch((err) => console.error('Lỗi tải tiêu chí:', err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Added to show loading state

        try {
            const dto = {
                ...form,
                nguoi_dung_id: parseInt(nguoi_dung_id),
            };

            const response = await axios.post('http://localhost:5093/api/GiaoVien/giaovientaohoatdongcanhan', dto);
            setMessage('✅ Tạo hoạt động thành công!');
            setKetQua(response.data.data);
            setForm({ ten_hoat_dong: '', mo_ta: '', ngay_bat_dau: '', ngay_ket_thuc: '', tieu_chi_id: '' }); // Reset form
        } catch (error) {
            console.error('Lỗi khi tạo hoạt động:', error);
            setMessage('❌ Đã xảy ra lỗi khi tạo hoạt động.');
            setKetQua(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <style jsx>{`
                /* Reset default styles */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                /* Page container for centering */
                .page-container {
                    min-height: 100vh;
                    background: #f5f5f5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }

                /* Form container (mimic MUI Paper) */
                .form-container {
                    background: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
                    padding: 24px;
                    width: 100%;
                    max-width: 480px;
                    animation: formAppear 0.3s ease-out;
                }

                /* Form title */
                .form-title {
                    font-size: 1.5rem;
                    font-weight: 500;
                    color: #1a202c;
                    text-align: center;
                    margin-bottom: 8px;
                }

                /* Form subtitle */
                .form-subtitle {
                    font-size: 0.875rem;
                    color: #6b7280;
                    text-align: center;
                    margin-bottom: 24px;
                }

                /* Message styles (mimic MUI Alert) */
                .message {
                    padding: 12px 16px;
                    border-radius: 4px;
                    font-size: 0.875rem;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    animation: slideIn 0.3s ease-out;
                }

                .message.success {
                    background: #e6fffa;
                    color: #2e7d32;
                    border: 1px solid #4caf50;
                }

                .message.error {
                    background: #ffebee;
                    color: #c62828;
                    border: 1px solid #ef5350;
                }

                /* Form group */
                .form-group {
                    margin-bottom: 16px;
                }

                .form-group.grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                @media (max-width: 600px) {
                    .form-group.grid {
                        grid-template-columns: 1fr;
                    }
                }

                /* Form label (mimic MUI InputLabel) */
                .form-label {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                    margin-bottom: 8px;
                }

                .required {
                    color: #d32f2f;
                }

                /* Form input (mimic MUI TextField) */
                .form-input {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #d1d5db;
                    border-radius: 4px;
                    font-size: 0.875rem;
                    color: #1a202c;
                    background: #fafafa;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }

                /* Specific styles for datetime-local inputs */
                .form-group.grid .form-input[type="datetime-local"] {
                    width: 100%;
                    max-width: 180px; /* Limit width to fit form */
                    font-size: 0.85rem; /* Slightly smaller font for compactness */
                    padding: 10px 12px; /* Adjusted padding */
                }

                .form-input:focus {
                    outline: none;
                    border-color: #1976d2;
                    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.3);
                }

                .form-input::placeholder {
                    color: #9ca3af;
                }

                .form-input.input-error {
                    border-color: #d32f2f;
                }

                /* Error text */
                .error-text {
                    font-size: 0.75rem;
                    color: #d32f2f;
                    margin-top: 4px;
                    animation: pulse 0.5s ease-out;
                }

                /* Form button (mimic MUI Button) */
                .form-button {
                    width: 100%;
                    padding: 12px 16px;
                    background: #1976d2;
                    color: #ffffff;
                    font-size: 0.875rem;
                    font-weight: 500;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.2s ease, box-shadow 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .form-button:hover:not(.button-disabled) {
                    background: #1565c0;
                    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
                }

                .form-button:active:not(.button-disabled) {
                    background: #104d9e;
                }

                .form-button.button-disabled {
                    background: #bdbdbd;
                    cursor: not-allowed;
                }

                /* Spinner */
                .spinner {
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                    animation: spin 1s linear infinite;
                }

                .spinner-circle {
                    opacity: 0.25;
                }

                .spinner-path {
                    opacity: 0.75;
                }

                /* Result container (mimic MUI Paper) */
                .result-container {
                    margin-top: 24px;
                    padding: 16px;
                    background: #f5f5f5;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    animation: slideIn 0.3s ease-out;
                }

                .result-title {
                    font-size: 1.125rem;
                    font-weight: 500;
                    color: #1976d2;
                    margin-bottom: 12px;
                }

                .result-content {
                    font-size: 0.875rem;
                    color: #374151;
                    line-height: 1.5;
                }

                .result-label {
                    font-weight: 500;
                    color: #1a202c;
                }

                /* Animations */
                @keyframes formAppear {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.6;
                    }
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
            <div className="page-container">
                <div className="form-container">
                    <h2 className="form-title">Tạo Hoạt Động Cá Nhân (Giáo Viên)</h2>
                    <p className="form-subtitle">Điền thông tin để bắt đầu hoạt động của bạn</p>

                    {message && (
                        <div className={`message ${message.includes('thành công') ? 'success' : 'error'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="form-group">
                        <div className="form-group">
                            <label className="form-label">Tên hoạt động <span className="required">*</span></label>
                            <input
                                type="text"
                                name="ten_hoat_dong"
                                value={form.ten_hoat_dong}
                                onChange={handleChange}
                                placeholder="Nhập tên hoạt động"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Mô tả <span className="required">*</span></label>
                            <textarea
                                name="mo_ta"
                                value={form.mo_ta}
                                onChange={handleChange}
                                placeholder="Nhập mô tả hoạt động"
                                rows="4"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group grid">
                            <div>
                                <label className="form-label">Ngày bắt đầu <span className="required">*</span></label>
                                <input
                                    type="datetime-local"
                                    name="ngay_bat_dau"
                                    value={form.ngay_bat_dau}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="form-label">Ngày kết thúc <span className="required">*</span></label>
                                <input
                                    type="datetime-local"
                                    name="ngay_ket_thuc"
                                    value={form.ngay_ket_thuc}
                                    onChange={handleChange}
                                    className="form-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Tiêu chí <span className="required">*</span></label>
                            <select
                                name="tieu_chi_id"
                                value={form.tieu_chi_id}
                                onChange={handleChange}
                                className="form-input"
                                required
                            >
                                <option value="" disabled>-- Chọn tiêu chí --</option>
                                {tieuChiList.map((tc) => (
                                    <option key={tc.tieu_chi_id} value={tc.tieu_chi_id}>
                                        {tc.ten_tieu_chi}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`form-button ${isSubmitting ? 'button-disabled' : ''}`}
                        >
                            {isSubmitting && (
                                <svg
                                    className="spinner"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="spinner-circle"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="spinner-path"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            )}
                            {isSubmitting ? 'Đang tạo...' : 'Tạo Hoạt Động'}
                        </button>
                    </form>

                    {ketQua && (
                        <div className="result-container">
                            <h3 className="result-title">Kết quả hoạt động</h3>
                            <div className="result-content">
                                <p>
                                    <span className="result-label">Tên hoạt động:</span> {ketQua.ten_hoat_dong}
                                </p>
                                <p>
                                    <span className="result-label">Người tạo:</span> {ketQua.nguoi_tao_hoat_dong}
                                </p>
                                <p>
                                    <span className="result-label">Điểm:</span> {ketQua.diem}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HoatDongCaNhanGiaoVien;