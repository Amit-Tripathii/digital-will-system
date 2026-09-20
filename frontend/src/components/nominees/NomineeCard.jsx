import { User, Pencil, Trash2, Mail, Phone } from "lucide-react";

const NomineeCard = ({ nominee, onEdit, onDelete, showActions = true }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
          <User className="text-purple-600" size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {nominee.nomineeName}
          </h2>

          <p className="text-gray-500">{nominee.relationship}</p>
        </div>
      </div>

      {/* Contact Information */}

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-gray-400" />

          <p className="text-gray-700 break-all">{nominee.nomineeEmail}</p>
        </div>

        {nominee.phone && (
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-gray-400" />

            <p className="text-gray-700">{nominee.phone}</p>
          </div>
        )}
      </div>

      {/* Actions */}

      {showActions && (
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onEdit(nominee)}
            className="
                            flex-1
                            bg-blue-500
                            hover:bg-blue-600
                            text-white
                            py-3
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            gap-2
                            transition
                        "
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={() => onDelete(nominee._id)}
            className="
                            flex-1
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            py-3
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            gap-2
                            transition
                        "
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default NomineeCard;
