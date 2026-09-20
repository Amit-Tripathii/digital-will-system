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
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-gray-200 flex flex-col justify-between">
      {/* Logo */}
      <div>
        <div className="px-8 py-8">
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
        </div>

        {/* Navigation */}

        <nav className="px-5">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={navLinkClass}>
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
          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
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
  );
};

export default Sidebar;
