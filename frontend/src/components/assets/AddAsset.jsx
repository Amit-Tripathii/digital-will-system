import { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import api from "../../services/api";

const AddAsset = ({
  onClose,
  onAssetAdded,
  asset,
  isEditing,
  onAssetUpdated,
}) => {
  const [formData, setFormData] = useState({
    assetName: "",
    platform: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fill form when editing
  useEffect(() => {
    if (isEditing && asset) {
      setFormData({
        assetName: asset.assetName || "",
        platform: asset.platform || "",
        username: asset.username || "",
        password: "",
      });
    }
  }, [isEditing, asset]);

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

      // =========================
      // EDIT ASSET
      // =========================

      if (isEditing) {
        const updateData = {
          assetName: formData.assetName,
          platform: formData.platform,
          username: formData.username,
        };

        // Only send password if user entered one
        if (formData.password.trim() !== "") {
          updateData.encryptedPassword = formData.password;
        }

        const res = await api.put(`/assets/${asset._id}`, updateData);

        onAssetUpdated(res.data);

        onClose();
      }

      // =========================
      // ADD ASSET
      // =========================
      else {
        const res = await api.post("/assets", formData);

        onAssetAdded(res.data);

        onClose();
      }
    } catch (error) {
      console.log(
        isEditing ? "Error updating asset:" : "Error adding asset:",
        error,
      );

      alert(
        error.response?.data?.message ||
          (isEditing ? "Failed to update asset" : "Failed to add asset"),
      );
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
              {isEditing ? "Edit Asset" : "Add New Asset"}
            </h2>

            <p className="text-gray-500 mt-1">
              {isEditing
                ? "Update your digital asset."
                : "Securely store your digital asset."}
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
          {/* Asset Name */}

          <div>
            <label className="block text-sm font-medium mb-2">Asset Name</label>

            <input
              type="text"
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              placeholder="e.g. Gmail Account"
              required
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
          </div>

          {/* Platform */}

          <div>
            <label className="block text-sm font-medium mb-2">Platform</label>

            <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="e.g. Gmail"
              required
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
          </div>

          {/* Username */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Username / Email
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username or email"
              required
              className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
          </div>

          {/* Password */}

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={
                  isEditing
                    ? "Leave blank to keep current password"
                    : "Enter password"
                }
                required={!isEditing}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  py-3
                  pr-12
                  outline-none
                  focus:ring-2
                  focus:ring-green-500
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  hover:text-gray-800
                "
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {isEditing && (
              <p className="text-xs text-gray-500 mt-2">
                Leave the password blank if you don't want to change it.
              </p>
            )}
          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                border
                border-gray-300
                rounded-xl
                py-3
                font-semibold
                hover:bg-gray-100
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                bg-black
                text-white
                rounded-xl
                py-3
                font-semibold
                hover:bg-gray-900
                transition
                disabled:opacity-50
              "
            >
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Save Asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
