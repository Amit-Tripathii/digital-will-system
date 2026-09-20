import { User, ShieldCheck, LogOut, Lock } from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

const Settings = () => {
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Settings</h1>

        <p className="text-gray-500 mt-2">
          Manage your account and security preferences.
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Account Information */}

        <div className="bg-white border rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <User size={24} className="text-green-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Account Information</h2>

              <p className="text-gray-500">
                Your DigiWill account information.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Name */}

            <div>
              <label className="block text-sm font-medium mb-2">Name</label>

              <input
                type="text"
                value={user.name || ""}
                disabled
                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    bg-gray-50
                                    text-gray-600
                                "
              />
            </div>

            {/* Email */}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>

              <input
                type="email"
                value={user.email || ""}
                disabled
                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    bg-gray-50
                                    text-gray-600
                                "
              />
            </div>
          </div>
        </div>

        {/* Security */}

        <div className="bg-white border rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <ShieldCheck size={24} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Security</h2>

              <p className="text-gray-500">
                Security features protecting your account.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* JWT */}

            <div className="flex items-center justify-between border rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <Lock size={22} className="text-gray-600" />

                <div>
                  <h3 className="font-semibold">JWT Authentication</h3>

                  <p className="text-sm text-gray-500">
                    Authentication is enabled for your account.
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                Active
              </span>
            </div>

            {/* Account Protection */}

            <div className="flex items-center justify-between border rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <ShieldCheck size={22} className="text-green-600" />

                <div>
                  <h3 className="font-semibold">Account Protection</h3>

                  <p className="text-sm text-gray-500">
                    Your account requires authentication to access protected
                    resources.
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                Enabled
              </span>
            </div>
          </div>
        </div>

        {/* Logout */}

        <div className="bg-white border border-red-200 rounded-3xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-red-600">Sign Out</h2>

              <p className="text-gray-500 mt-1">
                Sign out of your DigiWill account on this device.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                px-6
                                py-3
                                rounded-xl
                                flex
                                items-center
                                gap-2
                                font-semibold
                                transition
                            "
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
