import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // localStorage වෙතින් userInfo ලබා ගැනීම
  const storedUser = localStorage.getItem("userInfo");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // 1. පරිශීලකයා ලොග් වී නැත්නම්, ඔහු Login පිටුවට යවන්න
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. පරිශීලකයා ලොග් වී සිටියත්, ඔහුගේ role එක අවසර ලත් ලැයිස්තුවේ නැත්නම්
  // ඔහුට අදාළ නැති පිටුවකට යාම වළක්වා, ඔහුව වෙනත් සුදුසු පිටුවකට යවන්න
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // role එක ගැළපෙන්නේ නැත්නම් ඔහුට ගෙදර (home) පිටුවට හෝ වැරදි පිටුවකට යවන්න
    return <Navigate to="/" replace />; 
  }

  // 3. සියල්ල හරි නම්, අදාළ පිටුව (children) පෙන්වන්න
  return children;
};

export default ProtectedRoute;