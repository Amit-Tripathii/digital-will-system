import DashboardLayout from "../components/layout/DashboardLayout";

import { Shield, Users, Database } from "lucide-react";

import { useEffect, useState } from "react";
import api from "../services/api";

import StatCard from "../components/ui/StatCard";
import DeadManCard from "../components/ui/DeadManCard";

import NomineeCard from "../components/nominees/NomineeCard";

const Dashboard = () => {
  // ---------------- STATE ----------------

  const [assets, setAssets] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH DATA ----------------

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [assetRes, nomineeRes] = await Promise.all([
          api.get("/assets"),
          api.get("/nominees"),
        ]);

        setAssets(assetRes.data);
        setNominees(nomineeRes.data);

        // Get logged-in user from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));

        setUser(storedUser);
      } catch (error) {
        console.log("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ---------------- LOADING ----------------

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-[70vh] flex items-center justify-center">
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </DashboardLayout>
    );
  }

  // ---------------- UI ----------------

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        {/* Welcome */}

        <div>
          <h1
            className="
              text-3xl
              sm:text-4xl
              font-bold
              leading-tight
              break-words
            "
          >
            Welcome back
            {user?.name ? `, ${user.name}` : ""}
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your digital legacy securely.
          </p>
        </div>

        {/* First Row */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 min-w-0">
            <DeadManCard />
          </div>

          <div className="min-w-0">
            <StatCard
              title="Digital Assets"
              value={assets.length}
              subtitle="AES Encrypted"
              icon={<Database size={32} />}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
            />
          </div>
        </div>

        {/* Second Row */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="min-w-0">
            <StatCard
              title="Beneficiaries"
              value={nominees.length}
              subtitle="Registered"
              icon={<Users size={32} />}
              iconBg="bg-purple-100"
              iconColor="text-purple-600"
            />
          </div>

          <div className="min-w-0">
            <StatCard
              title="Vault Status"
              value="Active"
              subtitle="System Operational"
              icon={<Shield size={32} />}
              iconBg="bg-green-100"
              iconColor="text-green-600"
            />
          </div>
        </div>

        {/* Third Row */}

        {/* Beneficiary */}

        <div className="w-full max-w-2xl">
          {nominees.length > 0 ? (
            <NomineeCard nominee={nominees[0]} showActions={false} />
          ) : (
            <div
              className="
                bg-white
                rounded-3xl
                border
                border-gray-200
                shadow-sm
                p-5
                sm:p-6
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-purple-100
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                  "
                >
                  <Users size={24} className="text-purple-600" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-xl font-bold">No Beneficiary</h2>

                  <p className="text-gray-500 mt-1">
                    Add a trusted person to your digital legacy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
