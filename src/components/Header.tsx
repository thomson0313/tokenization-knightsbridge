import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="box-border w-full h-[70px] relative m-0 p-0 border-b-white border-b border-solid">
      <div className="box-border w-full max-w-[1287px] h-[63px] flex items-center justify-between mx-auto my-0 px-[68px] py-0 max-md:px-10 max-md:py-0 max-sm:px-5 max-sm:py-0">
        <img
          src="/logo.png"
          alt="Logo"
          className="box-border w-[63px] h-[63px] m-0 p-0 rounded-[50%]"
        />
        <nav className="box-border flex gap-[58px] items-center m-0 p-0 max-md:gap-[30px] max-sm:hidden">
          <a
            href="#"
            className="box-border text-white text-center text-xl font-normal cursor-pointer m-0 p-0 hover:opacity-80 transition-opacity"
          >
            Home
          </a>
          <a
            href="#"
            className="box-border text-white text-center text-xl font-normal cursor-pointer m-0 p-0 hover:opacity-80 transition-opacity"
          >
            Faq
          </a>
          <a
            href="#"
            className="box-border text-white text-center text-xl font-normal cursor-pointer m-0 p-0 hover:opacity-80 transition-opacity"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
};
