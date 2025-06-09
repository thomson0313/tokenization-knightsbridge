
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="box-border w-full h-[60px] relative m-0 p-0 border-b border-gray-700">
      <div className="box-border w-full max-w-[1200px] h-full flex items-center justify-between mx-auto my-0 px-8 py-0 max-md:px-6 max-sm:px-4">
        <div className="box-border flex items-center gap-2 m-0 p-0">
          <img
            src="/lovable-uploads/36b8674e-10dd-4101-9217-d6dc1f80d6ea.png"
            alt="Logo"
            className="box-border w-8 h-8 m-0 p-0"
          />
          <span className="box-border text-white text-[18px] font-semibold m-0 p-0">Logo</span>
        </div>
        <nav className="box-border flex gap-8 items-center m-0 p-0 max-sm:hidden">
          <a
            href="#"
            className="box-border text-white text-[14px] font-medium cursor-pointer m-0 p-0 hover:text-blue-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="box-border text-white text-[14px] font-medium cursor-pointer m-0 p-0 hover:text-blue-400 transition-colors"
          >
            FAQ
          </a>
          <a
            href="#"
            className="box-border text-white text-[14px] font-medium cursor-pointer m-0 p-0 hover:text-blue-400 transition-colors"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
};
