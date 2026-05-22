import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

const StatCard = ({ title, value, icon, color = "bg-[#111827]" }: Props) => {
  return (
    <div className={`${color} border border-[#1F2937] rounded-2xl p-5`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{title}</span>

        {icon}
      </div>

      <h3 className="text-3xl font-bold mt-4">{value}</h3>
    </div>
  );
};

export default StatCard;
