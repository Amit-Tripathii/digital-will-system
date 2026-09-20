import { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../../services/api";

const NomineeForm = ({
  onClose,
  onNomineeAdded,
  nominee,
  isEditing,
  onNomineeUpdated,
}) => {
  const [formData, setFormData] = useState({
    nomineeName: "",
    nomineeEmail: "",
    relationship: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  // Fill form when editing
  useEffect(() => {
    if (isEditing && nominee) {
      setFormData({
        nomineeName: nominee.nomineeName || "",
        nomineeEmail: nominee.nomineeEmail || "",
        relationship: nominee.relationship || "",
        phone: nominee.phone || "",
      });
    }
  }, [isEditing, nominee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // EDIT
      if (isEditing) {
        const res = await api.put(`/nominees/${nominee._id}`, formData);

        onNomineeUpdated(res.data);
        onClose();
      }

      // ADD
      else {
        const res = await api.post("/nominees", formData);

        onNomineeAdded(res.data);
        onClose();
      }
    } catch (error) {
      console.log("Nominee error:", error);

      alert(error.response?.data?.message || "Failed to save nominee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-xl">
        {/* Header */}

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {isEditing ? "Edit Nominee" : "Add New Nominee"}
            </h2>

            <p className="text-gray-500 mt-1">
              {isEditing
                ? "Update nominee information."
                : "Add a trusted beneficiary."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Nominee Name
            </label>

            <input
              type="text"
              name="nomineeName"
              value={formData.nomineeName}
              onChange={handleChange}
              placeholder="Enter nominee name"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>

            <input
              type="email"
              name="nomineeEmail"
              value={formData.nomineeEmail}
              onChange={handleChange}
              placeholder="Enter nominee email"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Relationship */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Relationship
            </label>

            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              placeholder="e.g. Brother, Sister, Friend"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 rounded-xl py-3 font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-black text-white rounded-xl py-3 font-semibold hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Add Nominee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NomineeForm;
