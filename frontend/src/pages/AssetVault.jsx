import { useEffect, useState } from "react";
import AddAsset from "../components/assets/AddAsset";
import DashboardLayout from "../components/layout/DashboardLayout";
import AssetCard from "../components/assets/AssetCard";
import api from "../services/api";

const AssetVault = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddAsset, setShowAddAsset] = useState(false);

  // Asset being edited
  const [editingAsset, setEditingAsset] = useState(null);

  // Fetch assets
  const fetchAssets = async () => {
    try {
      const res = await api.get("/assets");

      setAssets(res.data);
    } catch (error) {
      console.log("Error fetching assets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete asset
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/assets/${id}`);

      setAssets((prevAssets) => prevAssets.filter((asset) => asset._id !== id));
    } catch (error) {
      console.log("Error deleting asset:", error);

      alert("Failed to delete asset.");
    }
  };

  // Edit asset
  const handleEdit = (asset) => {
    setEditingAsset(asset);
  };

  // Update asset in UI after successful edit
  const handleAssetUpdated = (updatedAsset) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) =>
        asset._id === updatedAsset._id ? updatedAsset : asset,
      ),
    );

    setEditingAsset(null);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // Loading
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-3xl font-bold">Loading Assets...</h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold">Asset Vault</h1>

            <span
              className="
                flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                bg-green-100
                text-green-700
                text-sm
                font-medium
            "
            >
              🔒 AES Encrypted
            </span>
          </div>

          <p className="text-gray-500 mt-2">
            Securely manage your digital assets.
          </p>
        </div>

        <button
          onClick={() => setShowAddAsset(true)}
          className="
            bg-black
            text-white
            px-6
            py-3
            rounded-xl
            hover:bg-gray-900
            transition
        "
        >
          + Add Asset
        </button>
      </div>

      {/* Assets */}

      {assets.length === 0 ? (
        <div className="bg-white rounded-2xl border p-12 text-center">
          <h2 className="text-2xl font-semibold mb-2">No Assets Found</h2>

          <p className="text-gray-500">
            Click "Add Asset" to save your first digital asset.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {assets.map((asset) => (
            <AssetCard
              key={asset._id}
              asset={asset}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add Asset Modal */}

      {showAddAsset && (
        <AddAsset
          onClose={() => setShowAddAsset(false)}
          onAssetAdded={(newAsset) => {
            setAssets((prev) => [...prev, newAsset]);

            setShowAddAsset(false);
          }}
        />
      )}

      {/* Edit Asset Modal */}

      {editingAsset && (
        <AddAsset
          asset={editingAsset}
          isEditing={true}
          onClose={() => setEditingAsset(null)}
          onAssetUpdated={handleAssetUpdated}
        />
      )}
    </DashboardLayout>
  );
};

export default AssetVault;
