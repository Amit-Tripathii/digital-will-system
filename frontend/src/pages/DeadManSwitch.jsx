import { useEffect, useState } from "react";
import {
    ShieldCheck,
    Clock,
    AlertTriangle,
    CheckCircle,
    Zap,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import api from "../services/api";

const DeadManSwitch = () => {

    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(true);


    // Fetch Dead-Man Switch status
    const fetchStatus = async () => {

        try {

            const res = await api.get("/deadman/status");

            setStatusData(res.data);

        } catch (error) {

            console.log(
                "Error fetching Dead-Man Switch status:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchStatus();

    }, []);


    // Loading
    if (loading) {

        return (
            <DashboardLayout>

                <div className="flex justify-center items-center h-[70vh]">

                    <h1 className="text-3xl font-bold">
                        Loading Dead-Man Switch...
                    </h1>

                </div>

            </DashboardLayout>
        );

    }


    if (!statusData) {

        return (
            <DashboardLayout>

                <div className="bg-white rounded-2xl border p-12 text-center">

                    <h2 className="text-2xl font-semibold">
                        Unable to load status
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Please try again later.
                    </p>

                </div>

            </DashboardLayout>
        );

    }


    const {
        lastActive,
        daysInactive,
        status,
        isTriggered,
    } = statusData;


    // Status configuration
    const getStatusDetails = () => {

        if (status === "Triggered") {

            return {
                icon: <Zap size={32} />,
                title: "Digital Will Triggered",
                description:
                    "The inactivity threshold has been reached and the Digital Will process has been triggered.",
                box: "bg-red-50 border-red-200",
                iconBox: "bg-red-100 text-red-600",
                text: "text-red-700",
            };

        }


        if (status === "Warning") {

            return {
                icon: <AlertTriangle size={32} />,
                title: "Inactivity Warning",
                description:
                    "You have been inactive for 30 days or more. Login to keep your account active.",
                box: "bg-yellow-50 border-yellow-200",
                iconBox: "bg-yellow-100 text-yellow-600",
                text: "text-yellow-700",
            };

        }


        return {
            icon: <CheckCircle size={32} />,
            title: "Account Active",
            description:
                "Your account is active. The Dead-Man Switch is monitoring your activity.",
            box: "bg-green-50 border-green-200",
            iconBox: "bg-green-100 text-green-600",
            text: "text-green-700",
        };

    };


    const statusDetails = getStatusDetails();


    // Format last active date
    const formattedLastActive = new Date(
        lastActive
    ).toLocaleString();


    return (

        <DashboardLayout>

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold">
                    Dead-Man Switch
                </h1>

                <p className="text-gray-500 mt-2">
                    Monitor your account activity and Digital Will status.
                </p>

            </div>


            {/* Current Status */}

            <div
                className={`
                    border
                    rounded-3xl
                    p-8
                    ${statusDetails.box}
                `}
            >

                <div className="flex items-start gap-5">

                    <div
                        className={`
                            w-16
                            h-16
                            rounded-2xl
                            flex
                            items-center
                            justify-center
                            ${statusDetails.iconBox}
                        `}
                    >
                        {statusDetails.icon}
                    </div>


                    <div>

                        <h2 className="text-2xl font-bold">
                            {statusDetails.title}
                        </h2>

                        <p
                            className={`
                                mt-2
                                ${statusDetails.text}
                            `}
                        >
                            {statusDetails.description}
                        </p>

                    </div>

                </div>

            </div>


            {/* Statistics */}

            <div className="grid md:grid-cols-3 gap-6 mt-8">


                {/* Last Active */}

                <div className="bg-white border rounded-3xl p-6">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                            <Clock
                                className="text-blue-600"
                                size={24}
                            />

                        </div>

                        <div>

                            <p className="text-gray-500 text-sm">
                                Last Active
                            </p>

                            <h3 className="font-semibold">
                                {formattedLastActive}
                            </h3>

                        </div>

                    </div>

                </div>


                {/* Days Inactive */}

                <div className="bg-white border rounded-3xl p-6">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">

                            <Clock
                                className="text-purple-600"
                                size={24}
                            />

                        </div>

                        <div>

                            <p className="text-gray-500 text-sm">
                                Days Inactive
                            </p>

                            <h3 className="text-2xl font-bold">
                                {daysInactive}
                            </h3>

                        </div>

                    </div>

                </div>


                {/* Trigger Status */}

                <div className="bg-white border rounded-3xl p-6">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">

                            <ShieldCheck
                                className="text-green-600"
                                size={24}
                            />

                        </div>

                        <div>

                            <p className="text-gray-500 text-sm">
                                Digital Will
                            </p>

                            <h3 className="text-xl font-bold">
                                {isTriggered
                                    ? "Triggered"
                                    : "Not Triggered"}
                            </h3>

                        </div>

                    </div>

                </div>

            </div>


            {/* How It Works */}

            <div className="bg-white border rounded-3xl p-8 mt-8">

                <h2 className="text-2xl font-bold mb-6">
                    How the Dead-Man Switch Works
                </h2>


                <div className="grid md:grid-cols-3 gap-6">


                    {/* Step 1 */}

                    <div>

                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                            1
                        </div>

                        <h3 className="font-semibold text-lg">
                            Account Activity
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Your last account activity is recorded
                            when you use the system.
                        </p>

                    </div>


                    {/* Step 2 */}

                    <div>

                        <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold mb-4">
                            2
                        </div>

                        <h3 className="font-semibold text-lg">
                            Inactivity Monitoring
                        </h3>

                        <p className="text-gray-500 mt-2">
                            The system checks for prolonged
                            inactivity on a scheduled basis.
                        </p>

                    </div>


                    {/* Step 3 */}

                    <div>

                        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold mb-4">
                            3
                        </div>

                        <h3 className="font-semibold text-lg">
                            Digital Will Trigger
                        </h3>

                        <p className="text-gray-500 mt-2">
                            After the configured inactivity
                            threshold, nominees are notified.
                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

};

export default DeadManSwitch;