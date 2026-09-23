import { useEffect, useState } from "react";
import { Users } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import NomineeCard from "../components/nominees/NomineeCard";
import NomineeForm from "../components/nominees/NomineeForm";
import api from "../services/api";

const Nominees = () => {
  const [nominees, setNominees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showNomineeForm, setShowNomineeForm] = useState(false);
  const [editingNominee, setEditingNominee] = useState(null);

  // Fetch nominees
  const fetchNominees = async () => {
    try {
      const res = await api.get("/nominees");

      setNominees(res.data);
    } catch (error) {
      console.log("Error fetching nominees:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete nominee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this nominee?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/nominees/${id}`);

      setNominees((prevNominees) =>
        prevNominees.filter((nominee) => nominee._id !== id),
      );
    } catch (error) {
      console.log("Error deleting nominee:", error);

      alert(error.response?.data?.message || "Failed to delete nominee.");
    }
  };

  // Edit nominee
  const handleEdit = (nominee) => {
    setEditingNominee(nominee);
  };

  // Update nominee in state
  const handleNomineeUpdated = (updatedNominee) => {
    setNominees((prevNominees) =>
      prevNominees.map((nominee) =>
        nominee._id === updatedNominee._id ? updatedNominee : nominee,
      ),
    );

    setEditingNominee(null);
  };

  // Add nominee to state
  const handleNomineeAdded = (newNominee) => {
    setNominees((prevNominees) => [...prevNominees, newNominee]);

    setShowNomineeForm(false);
  };

  // Fetch nominees when page loads
  useEffect(() => {
    fetchNominees();
  }, []);

  // Loading screen
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">Loading Nominees...</h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Title + Description */}
          <div className="min-w-0">
            <h1 className="text-4xl font-bold">Nominees</h1>

            <p className="text-gray-500 mt-2 max-w-xl">
              Manage the people who will receive your digital assets.
            </p>
          </div>

          {/* Add Nominee */}
          <button
            onClick={() => setShowNomineeForm(true)}
            className="
              bg-black
              text-white
              px-6
              py-3
              rounded-xl
              hover:bg-gray-900
              transition
              w-full
              sm:w-auto
              flex-shrink-0
            "
          >
            + Add Nominee
          </button>
        </div>
      </div>

      {/* Empty State */}

      {nominees.length === 0 ? (
        <div
          className="
            bg-white
            rounded-2xl
            border
            p-6
            sm:p-12
            text-center
          "
        >
          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-2xl
              bg-purple-100
              flex
              items-center
              justify-center
              mb-5
            "
          >
            <Users size={30} className="text-purple-600" />
          </div>

          <h2 className="text-2xl font-semibold mb-2">No Nominees Found</h2>

          <p className="text-gray-500 max-w-md mx-auto">
            Add a trusted person who can receive your digital assets.
          </p>
        </div>
      ) : (
        /* Nominee Cards */

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {nominees.map((nominee) => (
            <NomineeCard
              key={nominee._id}
              nominee={nominee}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add Nominee Form */}

      {showNomineeForm && (
        <NomineeForm
          onClose={() => setShowNomineeForm(false)}
          onNomineeAdded={handleNomineeAdded}
        />
      )}

      {/* Edit Nominee Form */}

      {editingNominee && (
        <NomineeForm
          nominee={editingNominee}
          isEditing={true}
          onClose={() => setEditingNominee(null)}
          onNomineeUpdated={handleNomineeUpdated}
        />
      )}
    </DashboardLayout>
  );
};

export default Nominees;
