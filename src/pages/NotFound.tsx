import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className='h-dvh bg-gray-900 flex justify-center items-center ' >
    <div className="z-10 flex flex-col items-center text-center p-8 max-w-2xl w-full
      bg-black/30 backdrop-blur-md 
      border border-red-500/30 rounded-xl
      shadow-2xl shadow-red-500/10">
      
      {/* Large 404 Heading */}
      <h1 className="text-9xl font-black text-red-500" style={{ textShadow: `0 0 10px #f22, 0 0 15px #f22` }}>
        404
      </h1>
      
      {/* Page Not Found Title */}
      <h2 className="text-4xl font-bold text-white mt-4 mb-4">
        Page Not Found
      </h2>
      
      {/* Helper Text */}
      <p className="text-lg text-gray-400 mb-10 max-w-md">
        Oops! The page you're looking for seems to have been lost in the digital void. Let's get you back on track.
      </p>
      
      {/* Return Button */}
      <button 
        onClick={() => navigate("/")}
        className="flex items-center gap-3 font-bold text-gray-900 bg-cyan-300 border-2 border-cyan-300 rounded-lg py-3 px-8 text-xl
        transition-all duration-300 transform hover:scale-105
        hover:bg-transparent hover:text-cyan-300
        hover:shadow-[0_0_20px_rgba(56,189,248,0.7)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        Return to Home
      </button>
      
    </div>
    </div>
  );
};

export default NotFound;