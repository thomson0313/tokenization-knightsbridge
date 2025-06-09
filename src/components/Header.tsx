
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Switch } from './ui/switch';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onThemeToggle }) => {
  return (
    <header className="box-border w-full h-[60px] relative m-0 p-0 border-b border-gray-700 dark:border-gray-700 border-gray-200">
      <div className="box-border w-full max-w-[1200px] h-full flex items-center justify-between mx-auto my-0 px-8 py-0 max-md:px-6 max-sm:px-4">
        <div className="box-border flex items-center gap-2 m-0 p-0">
          <img
            src="/lovable-uploads/36b8674e-10dd-4101-9217-d6dc1f80d6ea.png"
            alt="Logo"
            className="box-border w-12 h-12 m-0 p-0"
          />
        </div>
        <div className="flex items-center gap-4">
          <nav className="box-border flex gap-8 items-center m-0 p-0 max-sm:hidden">
            <a
              href="#"
              className="box-border text-white dark:text-white text-gray-900 text-[14px] font-medium cursor-pointer m-0 p-0 hover:text-blue-400 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="box-border text-white dark:text-white text-gray-900 text-[14px] font-medium cursor-pointer m-0 p-0 hover:text-blue-400 transition-colors"
            >
              FAQ
            </a>
            <a
              href="#"
              className="box-border text-white dark:text-white text-gray-900 text-[14px] font-medium cursor-pointer m-0 p-0 hover:text-blue-400 transition-colors"
            >
              Contact Us
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-yellow-500" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={onThemeToggle}
              className="data-[state=checked]:bg-gray-600 data-[state=unchecked]:bg-gray-300"
            />
            <Moon className="w-4 h-4 text-blue-500" />
          </div>
        </div>
      </div>
    </header>
  );
};
