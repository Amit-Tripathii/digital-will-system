import {
  LayoutDashboard,
  Shield,
  Users,
  Clock3,
  FileText,
  Settings,
  Plus,
  LogOut,
  UserCircle2,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleNavClick = () => {
    // Close sidebar only on mobile
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 font-semibold ${
      isActive
        ? "bg-green-100 text-green-700"
        : "text-gray-700 hover:bg-gray-100 hover:text-green-700"
    }`;

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={21} />,
      path: "/dashboard",
    },
    {
      name: "Asset Vault",
      icon: <Shield size={21} />,
      path: "/assets",
    },
    {
      name: "Nominees",
      icon: <Users size={21} />,
      path: "/nominees",
    },
    {
      name: "Dead-Man Switch",
      icon: <Clock3 size={21} />,
      path: "/dead-man-switch",
    },
    {
      name: "Security Log",
      icon: <FileText size={21} />,
      path: "/security-log",
    },
    {
      name: "Settings",
      icon: <Settings size={21} />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          w-64
          h-screen
          bg-white
          border-r border-gray-200
          flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div>
          <div className="px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center">
                  <Shield className="text-white" size={22} />
                </div>

                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">
                    DIGIWILL
                  </h1>

                  <p className="text-sm text-gray-500">Secure Digital Legacy</p>
                </div>
              </div>

              {/* Mobile Close Button */}
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-5">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={navLinkClass}
                    onClick={handleNavClick}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 p-6">
          {/* User */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <UserCircle2 className="text-green-700" size={34} />
            </div>

            <div className="min-w-0">
              <h3 className="font-bold truncate">{user.name || "User"}</h3>

              <p className="text-sm text-gray-500 truncate">
                {user.email || "No email"}
              </p>
            </div>
          </div>

          {/* Add Asset */}
          <NavLink
            to="/assets"
            onClick={handleNavClick}
            className="w-full bg-black hover:bg-gray-900 text-white rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold transition"
          >
            <Plus size={20} />
            Add New Asset
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
