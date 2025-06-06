// Header.tsx

import React, { useState } from "react";
import { Search, ChevronDown, Check, SlidersHorizontal } from "lucide-react";
import { CiExport } from "react-icons/ci";

interface HeaderProps {
  onExport: () => void; // why: allows parent to trigger export logic externally
  onFilter: (filters: FilterOptions) => void; // why: allows parent to receive updated filter state
}

interface FilterOptions {
  searchTerm: string; // why: used to filter data based on input text
  type: string;       // why: filter based on employment type (e.g., Active/Inactive)
  role: string;       // why: filter based on job role
  department?: string; // why: filter based on department (Advanced Filter)
  status?: string;     // why: filter based on user status (Advanced Filter)
}

// why: predefined filter options to be rendered in dropdowns
const TYPES = ["Active", "Inactive"];
const ROLES = [ /* ...job roles... */ 
  "Software Engineer", "Visual Designer", "UI/UX Designer", "Content Writer", "Sales Manager",
  "Mobile Assistant", "Product Manager", "Data Analyst", "DevOps Engineer", "Marketing Manager",
  "Frontend Developer", "HR Specialist", "Backend Developer", "QA Engineer", "Project Manager",
  "UX Researcher", "Systems Administrator", "Business Analyst", "Security Specialist",
  "Content Strategist", "Mobile Developer"
];
const DEPARTMENTS = [ /* ...department list... */ 
  "Engineering", "Design", "Content", "Operation", "Product", "Analytics", "Marketing",
  "Human Resources", "Quality Assurance", "IT", "Business", "Security"
];
const STATUS = ["Active", "Inactive"];

const Header: React.FC<HeaderProps> = ({ onExport, onFilter }) => {
  // why: local state to control search input value
  const [searchTerm, setSearchTerm] = useState("");

  // why: stores the current filter values selected by the user
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    type: "",
    role: "",
    department: "",
    status: "",
  });

  // why: manages visibility of dropdowns (only one opens at a time)
  const [dropdownOpen, setDropdownOpen] = useState({
    type: false,
    role: false,
    advanced: false,
  });

  // why: updates search term and triggers filtering
  const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const updatedFilters = { ...filters, searchTerm: e.target.value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  // why: toggles the open state of a specific dropdown
  const toggleDropdown = (field: keyof typeof dropdownOpen) => {
    setDropdownOpen((prev) => ({
      type: false,
      role: false,
      advanced: false,
      [field]: !prev[field],
    }));
  };

  // why: handles item selection for any filter and resets other related filters
  const handleSelect = (field: keyof FilterOptions, value: string) => {
    const isSame = filters[field] === value;
    const updatedFilters = {
      ...filters,
      type: field === "type" ? (isSame ? "" : value) : "",
      role: field === "role" ? (isSame ? "" : value) : "",
      department: field === "department" ? (isSame ? "" : value) : "",
      status: field === "status" ? (isSame ? "" : value) : "",
    };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div className="flex flex-wrap justify-between items-center my-8">
      <div className="flex flex-wrap items-center gap-4">

        {/* why: renders the input field for searching records */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handelSearch(e)}
            className="pl-10 pr-4 py-2 border border-black/15 rounded-xl shadow-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 font-[500] text-[16px]"
          />
        </div>

        {/* why: renders dropdown for filtering by Type */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("type")}
            className="flex items-center gap-2 px-4 py-2 border border-black/15 rounded-xl shadow-sm text-gray-700 hover:bg-gray-50 font-[500] text-[16px]"
          >
            {filters.type || "Type"}
            <ChevronDown />
          </button>
          {dropdownOpen.type && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {TYPES.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    handleSelect("type", option);
                    toggleDropdown("type");
                  }}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    filters.type === option
                      ? "font-semibold bg-blue-50 border border-blue-500 rounded flex items-center justify-between"
                      : ""
                  }`}
                >
                  {option}
                  {filters.type === option && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* why: renders dropdown for filtering by Role */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("role")}
            className="flex items-center gap-2 px-4 py-2 border border-black/15 rounded-xl shadow-sm text-gray-700 hover:bg-gray-50 font-[500] text-[16px]"
          >
            {filters.role || "Role"}
            <ChevronDown />
          </button>
          {dropdownOpen.role && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto overflow-x-hidden">
              {ROLES.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    handleSelect("role", option);
                    toggleDropdown("role");
                  }}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    filters.role === option
                      ? "font-semibold bg-blue-50 border border-blue-500 rounded flex items-center justify-between"
                      : ""
                  }`}
                >
                  {option}
                  {filters.role === option && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* why: renders advanced filter for department and status */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("advanced")}
            className="flex items-center gap-2 px-4 py-2 border border-black/15 rounded-xl shadow-sm text-gray-700 hover:bg-gray-50 font-[500] text-[16px]"
          >
            <SlidersHorizontal />
            Advanced Filter
            <ChevronDown />
          </button>
          {dropdownOpen.advanced && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4 w-72">

              {/* why: renders department selection */}
              <div className="mb-4">
                <label className="text-sm font-semibold">Department</label>
                <div className="mt-1">
                  {DEPARTMENTS.map((dep) => (
                    <div
                      key={dep}
                      onClick={() => handleSelect("department", dep)}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                        filters.department === dep
                          ? "font-semibold bg-blue-50 border border-blue-500 rounded flex items-center justify-between"
                          : ""
                      }`}
                    >
                      {dep}
                      {filters.department === dep && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* why: renders status selection */}
              <div className="mb-4">
                <label className="text-sm font-semibold">Status</label>
                <div className="mt-1">
                  {STATUS.map((stat) => (
                    <div
                      key={stat}
                      onClick={() => handleSelect("status", stat)}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                        filters.status === stat
                          ? "font-semibold bg-blue-50 border border-blue-500 rounded flex items-center justify-between"
                          : ""
                      }`}
                    >
                      {stat}
                      {filters.status === stat && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* why: triggers the export logic passed from the parent component */}
      <button
        onClick={onExport}
        className="flex items-center text-xl gap-2 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer"
      >
        Export
        <CiExport />
      </button>
    </div>
  );
};

export default Header;
