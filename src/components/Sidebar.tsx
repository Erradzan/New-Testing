import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/authContext';
import { useTheme } from '../context/Darkmode';
import LightLogo from '../support/LightLogo.gif';
import DarkLogo from '../support/DarkLogo.gif';
import Image from 'next/image';
import { FaHome, FaProductHunt, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaMoon, FaSun, FaUser } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const playSound = () => {
    const audio = new Audio('../support/sound-effect.mp3');
    audio.play();
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setSidebarOpen(false);
  };

  return (
    <>
      <div 
        className="fixed top-4 right-4 z-50 cursor-pointer"
        onClick={playSound}
      >
        <Image src={isDarkMode ? DarkLogo : LightLogo} alt="Logo" className="w-32 h-32" />
      </div>

      <button 
        onClick={toggleSidebar} 
        className={`p-2 focus:outline-none bg-gray-200 dark:bg-[#f03846] text-gray-800 dark:text-gray-200 fixed top-4 left-4 z-50 rounded-md flex flex-col justify-center items-center h-10 w-10 ${isSidebarOpen ? 'z-30' : 'z-50'}`}
      >
        <span className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-current my-1 transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 bg-current transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      <div
        className={`fixed top-0 left-0 w-64 h-screen p-4 shadow-lg transform transition-transform duration-300 ease-in-out z-40 flex items-center ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${
          isDarkMode ? 'bg-gray-800' : 'bg-[#f03846]'
        }`}
      >
        <ul className="space-y-6 w-full">
          <li>
            <button 
              className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 hover:text-blue-500" 
              onClick={() => handleNavigation('/')}
            >
              <FaHome />
              <span>Homepage</span>
            </button>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <button 
                  className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 hover:text-blue-500" 
                  onClick={() => handleNavigation('/product')}
                >
                  <FaProductHunt />
                  <span>Product</span>
                </button>
              </li>
              <li>
                <button 
                  className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 hover:text-blue-500" 
                  onClick={() => handleNavigation('/cart')}
                >
                  <FaShoppingCart />
                  <span>Cart</span>
                </button>
              </li>
              <li>
                <button 
                  className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 hover:text-blue-500" 
                  onClick={() => handleNavigation('/profile')}
                >
                  <FaUser />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button onClick={() => { logout(); toggleSidebar(); }} className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 hover:text-blue-500">
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li>
                <button 
                  className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 hover:text-blue-500" 
                  onClick={() => handleNavigation('/signin')}
                >
                  <FaSignInAlt />
                  <span>Sign In</span>
                </button>
              </li>
              <li>
                <button 
                  className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 hover:text-blue-500" 
                  onClick={() => handleNavigation('/signup')}
                >
                  <FaUserPlus />
                  <span>Sign Up</span>
                </button>
              </li>
            </>
          )}
          <li>
            <button onClick={() => { toggleTheme(); toggleSidebar(); }} className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 hover:text-blue-500">
              {isDarkMode ? <FaSun /> : <FaMoon />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </li>
        </ul>
      </div>

      {isSidebarOpen && (
        <div 
          onClick={toggleSidebar} 
          className="fixed inset-0 bg-black opacity-50 z-30"
        ></div>
      )}
    </>
  );
};

export default Sidebar;