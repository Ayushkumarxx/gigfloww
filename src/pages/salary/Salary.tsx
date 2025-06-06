import React, { useMemo, useState } from "react";
import Components from "../../shared/components/export";

import DateDropdown from "./DateInput.component";
import { ChevronDown, Filter, Search } from "lucide-react";
import TableRow from "./TableRow.component";
import ProfileCard from "./ProfileCard.component";

type Status = "Paid" | "Pending";

interface Employee {
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  netSalary: number;
  status: Status;
}

// Mock data used for display before connecting real API
const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "Alicia Shankur",
    email: "alicia.shankur@gmail.com",
    jobTitle: "Software Engineer",
    department: "Engineering",
    netSalary: 2500,
    status: "Paid",
  },
  {
    id: 2,
    name: "James Oyinkan",
    email: "james.oyinkan@gmail.com",
    jobTitle: "Visual Designer",
    department: "Design",
    netSalary: 2100,
    status: "Paid",
  },
  {
    id: 3,
    name: "Aresen Vlamedir",
    email: "aresen.vlamedir@gmail.com",
    jobTitle: "Sales Manager",
    department: "Product",
    netSalary: 4700,
    status: "Pending",
  },
  {
    id: 4,
    name: "Kito Ashuth",
    email: "kito.ashuth@gmail.com",
    jobTitle: "Content Writer",
    department: "Content",
    netSalary: 2000,
    status: "Paid",
  },
  {
    id: 5,
    name: "Diti Shreyas",
    email: "diti.shreyas@gmail.com",
    jobTitle: "Backend Engineer",
    department: "Engineering",
    netSalary: 2500,
    status: "Paid",
  },
  {
    id: 6,
    name: "Alicia Shankur",
    email: "alicia.shankur@gmail.com",
    jobTitle: "Product Manager",
    department: "Product",
    netSalary: 4100,
    status: "Pending",
  },
  {
    id: 7,
    name: "Dario Berik",
    email: "dario.berik@gmail.com",
    jobTitle: "Software Engineer",
    department: "Engineering",
    netSalary: 1900,
    status: "Paid",
  },
];

const Salary: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("May 2025");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(mockEmployees[1]);

  // ✅ Filtering logic is memoized to avoid unnecessary recomputation on each render
  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = !filterStatus || employee.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterStatus]);

  return (
    <>
      <Components.navbar />

      <section className="my-10 mx-2 lg:mx-6">
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-2xl lg:text-3xl font-semibold">
            Salary Activities
          </h1>

          {/* Using a dropdown to control and display selected month */}
          <DateDropdown
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </div>

        {/* Using flex-col by default ensures responsiveness on smaller devices */}
        <div className="w-full flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 mt-10">
          {/* Main table column */}
          <div className="w-full lg:w-[75%] flex flex-col space-y-4">
            {/* Responsive filter + search row with stacking on mobile */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              {/* Making search input full-width on small screens for better usability */}
              <div className="relative w-full sm:w-[60%]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-black/15 rounded-xl shadow-sm text-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Keeping filter dropdown separate for clarity and better alignment */}
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none w-full border border-black/15 rounded-xl shadow-sm pl-10 pr-8 py-2.5 text-md focus:outline-none focus:ring-1 focus:ring-blue-500 truncate"
                >
                  <option value="">Filter</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Horizontal scroll added for table on small screens to avoid layout breaking */}
            <div className="overflow-x-auto border border-black/15 rounded-xl shadow-sm">
              <table className="w-full">
                <thead className="bg-[#F4F4F4]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#3A3A3A] uppercase">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#3A3A3A] uppercase">
                      Job Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#3A3A3A] uppercase">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#3A3A3A] uppercase">
                      Net Salary
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-[#3A3A3A] uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {/* Each row is separated into its own component to keep file clean and reusable */}
                  {filteredEmployees.map((employee) => (
                    <TableRow
                      key={employee.id}
                      employee={employee}
                      setSelectedEmployee={setSelectedEmployee}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar with salary summary and selected profile info */}
          <div className="w-full lg:w-[25%] flex flex-col space-y-4">
            {/* Display selected employee salary for current month */}
            <div className="border border-black/15 rounded-xl shadow-sm w-full px-4 py-2.5 text-md focus:outline-none focus:ring-1 focus:ring-blue-500 flex justify-between">
              <div className="text-md">Monthly Salary - </div>
              <div className="text-md font-[500]">
                ${selectedEmployee.netSalary}
              </div>
            </div>

            {/* Profile details shown alongside table for desktop, below for mobile */}
            <ProfileCard employee={selectedEmployee} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Salary;
