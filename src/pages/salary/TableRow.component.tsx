import React from 'react';

// Define the possible statuses as a union type
type Status = 'Paid' | 'Pending';

// Props for StatusBadge
interface StatusBadgeProps {
  status: Status;
}

// Status Badge Component
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  // Using a single base class string for reuse to follow DRY and keep consistent styling
  const baseClass = 'px-4 py-2 rounded-full text-sm font-medium';
  
  // Dynamic classes per status to avoid repeating full class string
  const statusClasses: Record<Status, string> = {
    Paid: `bg-green-100 text-green-600 ${baseClass}`,
    Pending: `bg-[#F3F3F3] text-[#C0C0C0] ${baseClass}`,
  };

  return <span className={statusClasses[status]}>{status}</span>;
};

// Define the shape of the employee object
interface Employee {
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  netSalary: number;
  status: Status;
}

const TableRow: React.FC<{ employee: Employee, setSelectedEmployee: any }> = ({ employee, setSelectedEmployee }) => (
  // Using onClick to handle selection when row is clicked
  <tr className="border-b border-[#D6D6D6] cursor-pointer" onClick={() => setSelectedEmployee(employee)}>
    <td className="px-4 py-3 max-w-[200px] break-words">
      {/* Avoiding overflow and enabling wrapping for responsiveness */}
      <div>
        <div className="font-medium text-gray-900 text-md">{employee.name}</div>
        <div className="text-xs text-gray-500">{employee.email}</div>
      </div>
    </td>
    <td className="px-4 py-3 text-sm text-gray-700 break-words">{employee.jobTitle}</td>
    <td className="px-4 py-3 text-sm text-gray-700 break-words">{employee.department}</td>
    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
      ${employee.netSalary.toLocaleString()}
    </td>
    <td className="px-4 py-3">
      <StatusBadge status={employee.status} />
    </td>
  </tr>
);

export default TableRow;
