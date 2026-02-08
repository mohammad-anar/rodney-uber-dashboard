/* eslint-disable @typescript-eslint/no-explicit-any */

const UserStatsCard = ({ metric }: any) => {
  const Icon = metric.icon;
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{metric.label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {metric.value}
          </p>
        </div>
        <div className={`${metric.bgColor} rounded-lg p-3`}>
          <Icon className={`w-6 h-6 ${metric.iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;
