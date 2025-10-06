import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorEmail("Email không hợp lệ!");
      return;
    }
    setErrorEmail("");

    console.log("Đăng nhập:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-poppins">
      <div className="w-full max-w-md">
        {/* Tiêu đề nằm ngoài form */}
        <h2 className="text-3xl font-bold text-center mb-6">Đăng nhập</h2>

        {/* Card form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-5">
           
            <div>
              <span>Email</span>
              <input
                type="email"
                placeholder="Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                  if (email && !validateEmail(email)) {
                    setErrorEmail("Email không hợp lệ!");
                  } else {
                    setErrorEmail("");
                  }
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

            {/* Password */}
            <div>
              <span>Password</span>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center border-gray-300"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
            >
              Đăng nhập
            </button>
          </form>

          {/* Link chuyển sang đăng ký */}
          <p className="mt-5 text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
