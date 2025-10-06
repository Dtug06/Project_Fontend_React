import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorFullName, setErrorFullName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    if (!fullName.trim()) {
      setErrorFullName("Vui lòng nhập họ và tên!");
      isValid = false;
    } else {
      setErrorFullName("");
    }

    if (!validateEmail(email)) {
      setErrorEmail("Email không hợp lệ!");
      isValid = false;
    } else {
      setErrorEmail("");
    }

    if (password.length < 6) {
      setErrorPassword("Mật khẩu phải có ít nhất 6 ký tự!");
      isValid = false;
    } else {
      setErrorPassword("");
    }

    if (confirmPassword !== password) {
      setErrorConfirm("Mật khẩu xác nhận không khớp!");
      isValid = false;
    } else {
      setErrorConfirm("");
    }

    if (!isValid) return;
    console.log("Đăng ký thành công:", { fullName, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 ">
      <div className="w-[500px]">
        <h2 className="text-5xl font-bold w-[452px] text-center  mb-6">Đăng ký</h2>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-blue-200">

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => {
                  if (!fullName.trim())
                    setErrorFullName("Vui lòng nhập họ và tên!");
                  else setErrorFullName("");
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-center transition ${
                  errorEmail
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errorFullName && (
                <p className="text-red-500 text-sm mt-1">{errorFullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                  if (email && !validateEmail(email))
                    setErrorEmail("Email không hợp lệ!");
                  else setErrorEmail("");
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-center transition ${
                  errorEmail
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errorEmail && (
                <p className="text-red-500 text-sm mt-1">{errorEmail}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => {
                  if (password.length < 6)
                    setErrorPassword("Mật khẩu phải có ít nhất 6 ký tự!");
                  else setErrorPassword("");
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-center transition ${
                  errorEmail
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errorPassword && (
                <p className="text-red-500 text-sm mt-1">{errorPassword}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => {
                  if (confirmPassword && confirmPassword !== password) {
                    setErrorConfirm("Mật khẩu xác nhận không khớp!");
                  } else {
                    setErrorConfirm("");
                  }
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-center transition ${
                  errorEmail
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errorConfirm && (
                <p className="text-red-500 text-sm mt-1">{errorConfirm}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Đăng ký
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
