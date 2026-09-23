import {
  Bell,
  Settings,
  ShieldCheck,
  LockKeyhole,
  UserCircle2,
  Menu,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Format last active time
  const getLastActivity = () => {
    if (!user.lastActive) {
      return "Last activity unavailable.";
    }

    const lastActive = new Date(user.lastActive);
    const now = new Date();

    const difference = now.getTime() - lastActive.getTime();
    const minutes = Math.floor(difference / (1000 * 60));

    if (minutes < 1) {
      return "Last activity detected just now.";
    }

    if (minutes < 60) {
      return `Last activity detected ${minutes} minute${
        minutes === 1 ? "" : "s"
      } ago.`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `Last activity detected ${hours} hour${
        hours === 1 ? "" : "s"
      } ago.`;
    }

    const days = Math.floor(hours / 24);

    return `Last activity detected ${days} day${days === 1 ? "" : "s"} ago.`;
  };

  return (
    <header
      className="
        min-h-24
        bg-white
        border-b
        border-gray-200
        px-4 sm:px-6 lg:px-10
        py-4 lg:py-5
        flex
        items-center
        justify-between
        gap-4
      "
    >
      {/* Left */}
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="
              lg:hidden
              w-11
              h-11
              flex
              items-center
              justify-center
              rounded-xl
              hover:bg-gray-100
              transition
              flex-shrink-0
            "
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-4">
              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  lg:text-4xl
                  font-bold
                  tracking-tight
                  truncate
                "
              >
                Vault Overview
              </h1>

              {/* Desktop Security Badge */}
              <span
                className="
                  hidden
                  md:flex
                  items-center
                  gap-2
                  bg-green-100
                  text-green-700
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  whitespace-nowrap
                "
              >
                <ShieldCheck size={16} />
                Securely Protected
              </span>
            </div>

            {/* Activity text */}
            <p className="hidden sm:block text-gray-500 mt-2 truncate">
              System integrity verified. {getLastActivity()}
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 flex-shrink-0">
        {/* Emergency */}
        <button
          type="button"
          className="
            hidden
            xl:block
            text-gray-600
            hover:text-black
            transition
            whitespace-nowrap
          "
        >
          Emergency Access
        </button>

        {/* Lock Vault */}
        <button
          type="button"
          className="
            hidden
            md:flex
            items-center
            gap-2
            bg-black
            text-white
            px-4
            lg:px-5
            py-3
            rounded-xl
            hover:bg-gray-900
            transition
            whitespace-nowrap
          "
        >
          <LockKeyhole size={18} />
          <span className="hidden lg:inline">Lock Vault</span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="
            w-10
            h-10
            sm:w-11
            sm:h-11
            rounded-xl
            hover:bg-gray-100
            flex
            items-center
            justify-center
            transition
          "
        >
          <Bell size={21} />
        </button>

        {/* Settings */}
        <button
          type="button"
          onClick={() => navigate("/settings")}
          className="
            w-10
            h-10
            sm:w-11
            sm:h-11
            rounded-xl
            hover:bg-gray-100
            flex
            items-center
            justify-center
            transition
          "
        >
          <Settings size={21} />
        </button>

        {/* User */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-4">
          <div
            className="
              w-10
              h-10
              lg:w-12
              lg:h-12
              rounded-full
              bg-green-100
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <UserCircle2 size={26} className="text-green-700 lg:hidden" />

            <UserCircle2 size={30} className="text-green-700 hidden lg:block" />
          </div>

          <div className="min-w-0 hidden lg:block">
            <h3 className="font-bold truncate max-w-40">
              {user.name || "User"}
            </h3>

            <p className="text-sm text-gray-500 truncate max-w-40">
              {user.email || "No email"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
