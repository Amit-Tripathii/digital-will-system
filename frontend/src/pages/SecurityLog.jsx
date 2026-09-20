import { FileText, ShieldCheck, Clock, LogIn } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";

const SecurityLog = () => {
  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Security Log</h1>

        <p className="text-gray-500 mt-2">
          Review security-related activity on your account.
        </p>
      </div>

      {/* Security Overview */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Account Security */}

        <div className="bg-white border rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <ShieldCheck size={24} className="text-green-600" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Account Security</p>

              <h3 className="font-bold text-lg">Protected</h3>
            </div>
          </div>
        </div>

        {/* Login Activity */}

        <div className="bg-white border rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <LogIn size={24} className="text-blue-600" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Authentication</p>

              <h3 className="font-bold text-lg">JWT Enabled</h3>
            </div>
          </div>
        </div>

        {/* Activity Monitoring */}

        <div className="bg-white border rounded-3xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Clock size={24} className="text-purple-600" />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Activity Monitoring</p>

              <h3 className="font-bold text-lg">Active</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}

      <div className="bg-white border rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
            <FileText size={22} className="text-gray-700" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Activity History</h2>

            <p className="text-gray-500 text-sm">
              Security events associated with your account.
            </p>
          </div>
        </div>

        {/* Empty State */}

        <div className="border border-dashed rounded-2xl p-10 text-center">
          <FileText size={40} className="mx-auto text-gray-400 mb-4" />

          <h3 className="text-xl font-semibold">No Security Events</h3>

          <p className="text-gray-500 mt-2">
            Security activity will appear here when events are recorded.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SecurityLog;
