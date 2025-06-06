import React from "react";
import Assets from "../../assets/export";

// This layout wraps around authentication pages (like login/signup)
const AuthLayout: React.FC = ({ children }: any) => {
  return (
    <main className="h-screen w-full flex flex-col lg:flex-row">
      {/* Left section – shows the auth background image */}
      <div className="w-full lg:w-[40%] h-48 sm:h-60 lg:h-full relative overflow-hidden">
        <img
          src={Assets.newAuth}
          alt="Left Side"
          className="w-full h-full object-cover"
        />

        {/* adding a dark overlay on top of the image to increase contrast */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>

      {/* Right section – where the form or any content will show up */}
      <div className="w-full lg:w-[60%] relative flex flex-col p-4 sm:p-6 lg:p-10 items-center overflow-hidden flex-1">
        {/* decorative circles - hidden on mobile, visible on larger screens */}
        <div className="absolute -top-40 -right-40 hidden lg:block">
          <div className="w-80 h-80 border-2 border-[#2784B8] rounded-full flex items-center justify-center">
            <div className="w-40 h-40 border-2 border-[#2784B8] rounded-full"></div>
          </div>
        </div>

        {/* child components like login or signup forms will render here */}
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;