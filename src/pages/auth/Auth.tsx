import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Layouts from "../../shared/layout/export";
import Assets from "../../assets/export";
import { useNavigate } from "react-router-dom";


const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
 if (isLogin) {
    console.log("Login data:", {
      email: formData.email,
      password: formData.password,
    });
    // Handle login logic here (add validation or API call)
    navigate("/dashboard"); //  redirect to dashboard
  } else {
    console.log("Signup data:", formData);
    // Handle signup logic here
    navigate("/dashboard"); //  redirect to dashboard
  }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <Layouts.auth>
      <div className="flex h-[35px] gap-4 items-center">
        <img src={Assets.onlyLogo} alt="logo" className="w-[35px] h-[35px]" />
        <div className="text-[20px] sm:text-[24px] lg:text-[28px] text-[#2784B8] font-bold">
          GIGFLOWW
        </div>
      </div>

      {/* Welcome message and description below logo */}
      <div className="flex flex-col mt-8 sm:mt-10 lg:mt-12">
        <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] text-black font-[500] mb-2 leading-tight">
          {isLogin ? "Welcome back" : "Welcome to GigFloww"}
        </h1>
        {/* Text is centered but first line takes full width to stand out */}
        <p className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#3A3A3A] text-center tracking-wider">
          {isLogin
            ? "Sign in to your account"
            : "Seamless HR operations start now!"}{" "}
          <br />
          {!isLogin && "Sign up"}
        </p>
      </div>

      {/* Form fields */}
      <div className="w-full max-w-sm sm:max-w-md lg:w-[60%] space-y-4 sm:space-y-5 lg:space-y-6 mt-6 sm:mt-7 lg:mt-8">
        {/* Name field - only for signup */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Full Name"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 shadow-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2784B8] focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base"
            />
          </div>
        )}

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isLogin ? "Email" : "Work Email"}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={
              isLogin ? "Your Email Address" : "Your Work Email Address"
            }
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 shadow-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2784B8] focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base"
          />
        </div>

        {/* Password field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Your Password"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 shadow-xs border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2784B8] focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-[#2784B8] to-[#113B52] hover:bg-[#1f6b96] text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-[#2784B8] focus:ring-offset-2 outline-none text-sm sm:text-base"
        >
          {isLogin ? "Sign in" : "Sign up for free"}
        </button>
      </div>
      {/* Terms and conditions - only for signup */}
      {!isLogin && (
        <p className="text-xs sm:text-sm text-[#414141] text-center font-semibold mt-2 px-4">
          By clicking on Sign up, you agree to our{" "}
          <a href="#" className="text-[#2784B8] hover:underline">
            Terms and Conditions
          </a>
        </p>
      )}

      {/* Toggle between login and signup */}
      <div className="absolute bottom-4 right-4 sm:right-5">
        <p className="text-[#414141] font-normal text-xs sm:text-sm">
          {isLogin ? "Don't have an account? " : "Already on Gigfloww? "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-[#2784B8] hover:underline font-medium focus:outline-none"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </Layouts.auth>
  );
};

export default Auth;
