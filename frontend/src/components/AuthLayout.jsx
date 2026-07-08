const AuthLayout = ({ children, title, subtitle, isDashboard }) => {
  return (
    // min-h-screen භාවිතා කර මුළු පිටුවම ආවරණය කරන්න
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-blue-50 font-sans relative overflow-hidden p-4">
      
      {/* Decorative Background Shapes */}
      <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-[60px]"></div>
      <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-purple-400/10 rounded-full blur-[80px]"></div>

      {/* Main Card */}
      <div className={`relative z-10 p-10 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 
        ${isDashboard ? "w-full max-w-6xl" : "w-[450px]"}`}>
        
        <h2 className="text-center text-3xl font-bold text-slate-800 mb-2">{title}</h2>
        <p className="text-center text-slate-500 text-sm mb-7">{subtitle}</p>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;