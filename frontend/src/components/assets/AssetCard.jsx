import { Pencil, Trash2, Lock } from "lucide-react";

const AssetCard = ({ asset, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-3xl shadow border p-6">
      {/* Header */}

      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">{asset.assetName}</h2>

          <p className="text-gray-500 mt-1">{asset.platform}</p>
        </div>

        <Lock className="text-green-600" size={30} />
      </div>

      {/* Username */}

      <div className="mt-6">
        <p className="text-gray-600">Username</p>

        <h3 className="font-semibold break-all">{asset.username}</h3>
      </div>

      {/* Actions */}

      <div className="mt-5 flex gap-3">
        <button
          onClick={() => onEdit(asset)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(asset._id)}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default AssetCard;
