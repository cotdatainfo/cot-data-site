import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'green' | 'red' | 'purple' | 'blue';
}

export default function MetricCard({ icon, label, value, color }: MetricCardProps) {
  const colorClasses = {
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    red: 'from-red-500/20 to-red-600/20 border-red-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
  };

  const iconColorClasses = {
    green: 'text-green-400',
    red: 'text-red-400',
    purple: 'text-purple-400',
    blue: 'text-blue-400',
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm rounded-xl border p-6 hover:scale-105 transition-transform`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`${iconColorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}