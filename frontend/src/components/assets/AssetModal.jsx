import { useState, useEffect } from "react";

const AssetModal = ({ isOpen, onClose, onSave, asset }) => {
  const [formData, setFormData] = useState({
    assetName: "",
    platform: "",
    username: "",
    encryptedPassword: "",
    notes: "",
  });

  useEffect(() => {
    if (asset) {
      setFormData(asset);
    } else {
      setFormData({
        assetName: "",
        platform: "",
        username: "",
        encryptedPassword: "",
        notes: "",
      });
    }
  }, [asset]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-3xl w-[600px] p-8">
        <h2 className="text-3xl font-bold mb-6">
          {asset ? "Edit Asset" : "Add Asset"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="assetName"
            placeholder="Asset Name"
            value={formData.assetName}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="platform"
            placeholder="Platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="encryptedPassword"
            placeholder="Password"
            value={formData.encryptedPassword}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetModal;
