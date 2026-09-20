const StatCard = ({ title, value, subtitle, icon, iconBg, iconColor }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-4">{value}</h2>

          <p className="mt-3 text-gray-500">{subtitle}</p>
        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${iconBg}`}
        >
          <div className={iconColor}>{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
