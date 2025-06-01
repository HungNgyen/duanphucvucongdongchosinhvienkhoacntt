








import { useState } from 'react';
import ForgotPasswordStep1 from './ForgotPasswordStep1';
import ForgotPasswordStep2 from './ForgotPasswordStep2';

function ForgotPasswordPage() {
    const [step, setStep] = useState(1);
    const [accountInfo, setAccountInfo] = useState(null);

    const handleSuccess = (info) => {
        console.log('Account Info:', info);
        setAccountInfo(info);
        setStep(2);
    };

    const handleBack = () => {
        // Logic quay lại (ví dụ: chuyển về trang đăng nhập hoặc reset bước)
        window.history.back(); // Hoặc chuyển hướng bằng react-router
    };

    return (
        <div style={{ padding: 20 }}>
            {step === 1 && <ForgotPasswordStep1 onSuccess={handleSuccess} onBack={handleBack} />}
            {step === 2 && (
                <ForgotPasswordStep2
                    maSo={accountInfo?.ma_so_giao_vien || accountInfo?.ma_so_sinh_vien}
                    info={accountInfo}
                />
            )}
        </div>
    );
}

export default ForgotPasswordPage;