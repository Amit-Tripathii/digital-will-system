import {
  Bell,
  Settings,
  ShieldCheck,
  LockKeyhole,
  UserCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
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
      return `Last activity detected ${minutes} minute${minutes === 1 ? "" : "s"} ago.`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `Last activity detected ${hours} hour${hours === 1 ? "" : "s"} ago.`;
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
      px-10
      py-5
      flex
      items-center
      justify-between
    "
    >
      {/* Left */}

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight">Vault Overview</h1>

          <span
            className="
            flex
            items-center
            gap-2
            bg-green-100
            text-green-700
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
          "
          >
            <ShieldCheck size={16} />
            Securely Protected
          </span>
        </div>

        <p className="text-gray-500">
          System integrity verified. {getLastActivity()}
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-8">
        {/* Emergency */}

        <button
          type="button"
          className="text-gray-600 hover:text-black transition"
        >
          Emergency Access
        </button>

        {/* Lock Vault */}

        <button
          type="button"
          className="
            flex
            items-center
            gap-2
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-gray-900
            transition
          "
        >
          <LockKeyhole size={18} />
          Lock Vault
        </button>

        {/* Notifications */}

        <button
          type="button"
          className="
            w-11
            h-11
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
            w-11
            h-11
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

        <div className="flex items-center gap-4">
          <div
            className="
            w-12
            h-12
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
          "
          >
            <UserCircle2 size={30} className="text-green-700" />
          </div>

          <div className="min-w-0">
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
