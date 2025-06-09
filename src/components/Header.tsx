
import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { Switch } from './ui/switch';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onThemeToggle }) => {
  return (
    <header className="w-full h-[60px] relative border-b border-border-primary">
      <div className="w-full max-w-[1200px] h-full flex items-center justify-between mx-auto px-4 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/lovable-uploads/36b8674e-10dd-4101-9217-d6dc1f80d6ea.png"
            alt="Logo"
            className="w-16 h-16 md:w-20 md:h-20"
          />
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden sm:flex gap-4 md:gap-8 items-center">
            <Link
              to="/"
              className="text-text-primary text-sm font-medium cursor-pointer hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <a
              href="#"
              className="text-text-primary text-sm font-medium cursor-pointer hover:text-blue-400 transition-colors"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-text-primary text-sm font-medium cursor-pointer hover:text-blue-400 transition-colors"
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
