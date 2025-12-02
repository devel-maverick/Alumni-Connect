import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, GraduationCap } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user + logout from Zustand
  const { authUser, logout } = useAuthStore();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT — Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Alumni Connect
              </span>
              <p className="text-xs text-gray-500 leading-none">Excellence Unites</p>
            </div>
          </Link>

          {/* CENTER — Nav Links */}
          <div className="hidden md:flex items-center space-x-1 ml-auto mr-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-all ${
                isActive("/") ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>

            <Link
              to="/opportunities"
              className={`px-3 py-2 rounded-lg transition-all ${
                isActive("/opportunities") ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Opportunities
            </Link>

            <Link
              to="/clubs-culture"
              className={`px-3 py-2 rounded-lg transition-all ${
                isActive("/clubs-culture") ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Clubs & Culture
            </Link>

            <Link
              to="/connect"
              className={`px-3 py-2 rounded-lg transition-all ${
                isActive("/connect") ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Connect
            </Link>
          </div>

          {/* RIGHT — Profile / Login */}
          <div className="hidden md:flex items-center space-x-3">
            {authUser ? (
              <>
                {/* PROFILE BUTTON */}
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <span className="text-white font-semibold text-sm">
                      {authUser.fullName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                    {authUser.fullName?.split(" ")[0]}
                  </span>
                </Link>

                {/* LOGOUT BUTTON */}
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:from-blue-700 hover:to-blue-800"
              >
                Login / Sign Up
              </Link>
            )}
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center space-x-2">
            {authUser ? (
              <>
                <Link to="/profile">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-xs">
                      {authUser.fullName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
