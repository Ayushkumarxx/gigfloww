import React from "react";
import { GoArrowRight } from "react-icons/go";

// Define the shape of employee object
interface Employee {
  name: string;
  // Add other properties as needed if you want to use them dynamically,
  // For now, only `name` is used directly in your component
}

// Props for Avatar component
interface AvatarProps {
  name: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, className = "" }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`bg-orange-400 text-white rounded-full flex items-center justify-center font-medium ${className}`}
    >
      {initials}
    </div>
  );
};

// Props for ProfileCard component
interface ProfileCardProps {
  employee: Employee;
}

// Why: DRY principle — centralized field data
const fields = [
  ["Position", "UI lead"],
  ["Department", "Design"],
  ["Status", "Active"],
  ["Basic Salary", "$3500"],
  ["Extra Overtime", "$500"],
  ["Deduction", "$0.00"],
  ["Next Salary", "$3500"],
  ["Bank Details", "Polaris Bank"],
  ["Currency", "$USD"],
];

const ProfileCard: React.FC<ProfileCardProps> = ({ employee }) => (
  <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
    <div className="bg-gradient-to-r from-[#2784B8] to-[#113B52] py-15 relative">
      {/* Why: Used transform properties for better responsive centering */}
      <Avatar
        name={employee.name}
        className="w-20 h-20 text-sm absolute -bottom-[25%] left-1/2 transform -translate-x-1/2 border-4 border-white"
      />
    </div>

    <div className="text-center mt-10">
      <h3 className="text-[#242831] font-semibold">{employee.name}</h3>
      <p className="text-[#242831] text-sm">UI Designer</p>
    </div>

    <div className="space-y-3 text-sm px-4 py-4">
      {/* Why: DRY — mapped field display for consistency and reusability */}
      {fields.map(([label, value], index) => (
        <div
          key={index}
          className="flex justify-between flex-wrap gap-y-1 min-w-0"
        >
          <span className="text-[#242831] text-[16px]">{label}</span>
          <span className="text-[#242831] font-[500] text-[14px]">{value}</span>
        </div>
      ))}

      <div className="w-full h-[0.5px] bg-[#D6D6D6] "></div>
    </div>

    <div className="flex justify-between my-4 px-4">
      {/* WHY: Wrapping text and icon under shared color + responsive interaction class */}
      <div className="text-[14px] text-[#1163C1] font-[500] group-hover:underline">
        View Payroll History
      </div>
      <div className="text-2xl text-[#1163C1]">
        <GoArrowRight />
      </div>
    </div>
  </div>
);

export default ProfileCard;
