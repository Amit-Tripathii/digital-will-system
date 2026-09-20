import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import api from "../../services/api";

const DeadManCard = () => {
  const [status, setStatus] = useState("Active");
  const [daysInactive, setDaysInactive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await api.get("/deadman/status");

      setStatus(res.data.status);
      setDaysInactive(res.data.daysInactive);
    } catch (error) {
      console.log("Dead-Man Switch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleActivate = async () => {
    try {
      setActivating(true);

      const res = await api.post("/deadman/activate");

      setStatus(res.data.status);
      setDaysInactive(res.data.daysInactive);
    } catch (error) {
      console.log("Activation error:", error);
    } finally {
      setActivating(false);
    }
  };

  const getStatusColor = () => {
    if (status === "Triggered") {
      return "text-red-600";
    }

    if (status === "Warning") {
      return "text-yellow-600";
    }

    return "text-green-600";
  };

  const getIconBackground = () => {
    if (status === "Triggered") {
      return "bg-red-100";
    }

    if (status === "Warning") {
      return "bg-yellow-100";
    }

    return "bg-green-100";
  };

  if (loading) {
    return (
      <div
        className="
        bg-white
        rounded-3xl
        border
        border-gray-200
        shadow-sm
        p-8
        h-full
      "
      >
        <p className="text-gray-500">Loading Dead-Man Switch...</p>
      </div>
    );
  }

  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-gray-200
      shadow-sm
      p-8
      h-full
    "
    >
      <div className="flex justify-between">
        <div>
          <p
            className="
            text-sm
            text-gray-500
            uppercase
            tracking-wider
          "
          >
            Dead-Man Switch
          </p>

          <h2
            className={`
              text-3xl
              font-bold
              mt-4
              ${getStatusColor()}
            `}
          >
            {status.toUpperCase()}
          </h2>

          {status === "Active" ? (
            <>
              <p className="mt-4 text-gray-500">Last activity</p>

              <h3 className="text-xl font-semibold">Just now</h3>
            </>
          ) : (
            <>
              <p className="mt-4 text-gray-500">Inactive for</p>

              <h3 className="text-xl font-semibold">
                {daysInactive} {daysInactive === 1 ? "day" : "days"}
              </h3>
            </>
          )}
        </div>

        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            ${getIconBackground()}
          `}
        >
          <ShieldCheck className={getStatusColor()} size={32} />
        </div>
      </div>

      <button
        onClick={handleActivate}
        disabled={activating}
        className="
          mt-8
          bg-black
          text-white
          px-8
          py-4
          rounded-xl
          hover:bg-gray-900
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {activating ? "Updating..." : "I'm Active"}
      </button>
    </div>
  );
};

export default DeadManCard;
