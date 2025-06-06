import React, { useState } from "react";
import Components from "../../shared/components/export";
import Header from "./Header.component";
import EmployeeTable from "./Table.component";
import Pagination from "./pagesPP.components";

interface Employee {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  salary: number;
  startDate: string;
  lifeCycle: string;
  status: string;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Alicia Shankur",
    email: "alicia.shankur@gmail.com",
    jobTitle: "Software Engineer",
    department: "Engineering",
    salary: 2500,
    startDate: "Mar 16, 2023",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: "2",
    name: "James Oyinkan",
    email: "jamesoyinkan@gmail.com",
    jobTitle: "Visual Designer",
    department: "Design",
    salary: 2000,
    startDate: "Jan 16, 2023",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: "3",
    name: "Diti Shreyas",
    email: "ditishreyas@gmail.com",
    jobTitle: "Visual Designer",
    department: "Design",
    salary: 2000,
    startDate: "Dec 09, 2024",
    lifeCycle: "Employed",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Ishita Bhatgnar",
    email: "ishitadgr@gmail.com",
    jobTitle: "UI/UX Designer",
    department: "Design",
    salary: 1500,
    startDate: "Jan 09, 2024",
    lifeCycle: "Employed",
    status: "Active",
  },
  {
    id: "5",
    name: "Kito Ashuth",
    email: "ashutokr@gmail.com",
    jobTitle: "Content Writer",
    department: "Content",
    salary: 1000,
    startDate: "Jan 09, 2024",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: "6",
    name: "Dario Berik",
    email: "darioberik@yahoo.com",
    jobTitle: "Sales Manager",
    department: "Operation",
    salary: 4000,
    startDate: "Feb 21, 2022",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: "7",
    name: "Aresen Vlamadir",
    email: "darioberik@yahoo.com",
    jobTitle: "Mobile Assistant",
    department: "Product",
    salary: 3000,
    startDate: "Aug 07, 2022",
    lifeCycle: "Employed",
    status: "Inactive",
  },
  {
    id: "8",
    name: "Debby Philade",
    email: "debby.thegreate@gmail.com",
    jobTitle: "Product Manager",
    department: "Product",
    salary: 4500,
    startDate: "Apr 02, 2022",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: "9",
    name: "Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    jobTitle: "Data Analyst",
    department: "Analytics",
    salary: 3200,
    startDate: "May 15, 2023",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: "10",
    name: "Michael Brown",
    email: "michael.brown@gmail.com",
    jobTitle: "DevOps Engineer",
    department: "Engineering",
    salary: 3800,
    startDate: "Nov 12, 2022",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: "11",
    name: "Emily Davis",
    email: "emily.davis@gmail.com",
    jobTitle: "Marketing Manager",
    department: "Marketing",
    salary: 3500,
    startDate: "Sep 08, 2023",
    lifeCycle: "Employed",
    status: "Active",
  },
  {
    id: "12",
    name: "David Wilson",
    email: "david.wilson@gmail.com",
    jobTitle: "Frontend Developer",
    department: "Engineering",
    salary: 2800,
    startDate: "Jul 20, 2023",
    lifeCycle: "Hired",
    status: "Inactive",
  },
  {
    id: "13",
    name: "Lisa Anderson",
    email: "lisa.anderson@gmail.com",
    jobTitle: "HR Specialist",
    department: "Human Resources",
    salary: 2200,
    startDate: "Mar 30, 2024",
    lifeCycle: "Employed",
    status: "Active",
  },
  {
    id: "14",
    name: "Robert Taylor",
    email: "robert.taylor@gmail.com",
    jobTitle: "Backend Developer",
    department: "Engineering",
    salary: 3000,
    startDate: "Oct 05, 2022",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: "15",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@gmail.com",
    jobTitle: "QA Engineer",
    department: "Quality Assurance",
    salary: 2600,
    startDate: "Dec 18, 2023",
    lifeCycle: "Employed",
    status: "Active",
  },
  {
    id: "16",
    name: "Mark Thompson",
    email: "mark.thompson@gmail.com",
    jobTitle: "Project Manager",
    department: "Operation",
    salary: 4200,
    startDate: "Aug 14, 2022",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: "17",
    name: "Jessica White",
    email: "jessica.white@gmail.com",
    jobTitle: "UX Researcher",
    department: "Design",
    salary: 2900,
    startDate: "Feb 28, 2024",
    lifeCycle: "Employed",
    status: "Inactive",
  },
  {
    id: "18",
    name: "Kevin Lee",
    email: "kevin.lee@gmail.com",
    jobTitle: "Systems Administrator",
    department: "IT",
    salary: 2700,
    startDate: "Jun 10, 2023",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: "19",
    name: "Amanda Clark",
    email: "amanda.clark@gmail.com",
    jobTitle: "Business Analyst",
    department: "Business",
    salary: 3100,
    startDate: "Apr 25, 2023",
    lifeCycle: "Employed",
    status: "Active",
  },
  {
    id: "20",
    name: "Christopher Hall",
    email: "christopher.hall@gmail.com",
    jobTitle: "Security Specialist",
    department: "Security",
    salary: 3600,
    startDate: "Jan 15, 2024",
    lifeCycle: "Hired",
    status: "Active",
  },
  {
    id: "21",
    name: "Nicole Adams",
    email: "nicole.adams@gmail.com",
    jobTitle: "Content Strategist",
    department: "Content",
    salary: 2400,
    startDate: "Nov 03, 2023",
    lifeCycle: "Employed",
    status: "Active",
  },
  {
    id: "22",
    name: "Daniel Miller",
    email: "daniel.miller@gmail.com",
    jobTitle: "Mobile Developer",
    department: "Engineering",
    salary: 3300,
    startDate: "Sep 22, 2022",
    lifeCycle: "Hired",
    status: "Inactive",
  },
];

const People: React.FC = () => {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(mockEmployees);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Get employees for the current page only
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilter = (filters: {
    searchTerm: string;
    type: string;
    role: string;
    department?: string;
    status?: string;
  }) => {
    const result = mockEmployees.filter((employee) => {
      const matchesSearch =
        employee.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        employee.jobTitle
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        employee.department
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());

      const matchesType = filters.type
        ? employee.status.toLowerCase() === filters.type.toLowerCase()
        : true;
      const matchesRole = filters.role
        ? employee.jobTitle.toLowerCase() === filters.role.toLowerCase()
        : true;
      const matchesDept = filters.department
        ? employee.department.toLowerCase() === filters.department.toLowerCase()
        : true;
      const matchesStatus = filters.status
        ? employee.status.toLowerCase() === filters.status.toLowerCase()
        : true;

      return (
        matchesSearch &&
        matchesType &&
        matchesRole &&
        matchesDept &&
        matchesStatus
      );
    });

    setFilteredEmployees(result);
    setCurrentPage(1); // reset page here
  };
  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleExport = () => {
    if (!mockEmployees.length) return;

    const headers = Object.keys(mockEmployees[0]);

    const csvRows = [
      headers.join(","), // CSV header
      ...mockEmployees.map((row) =>
        headers
          .map((field) => `"${row[field as keyof typeof row] ?? ""}"`)
          .join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "employee_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <>
      <Components.navbar />
      <section className="my-10 mx-2 lg:mx-6">
        <div className="flex justify-between items-center mt-10">
          <h1 className="text-2xl lg:text-3xl font-semibold">List of people</h1>

          <div className="flex h-[50px] px-8 items-center shadow-sm rounded-lg cursor-pointer bg-gradient-to-r from-[#2784B8] to-[#113B52] hover:bg-[#1f6b96] text-white font-medium">
            Add new member
          </div>
        </div>

        <Header onExport={handleExport} onFilter={handleFilter} />

        <EmployeeTable
          employees={paginatedEmployees} // <-- pass sliced employees here
          selectedEmployees={selectedEmployees}
          onSelectEmployee={handleSelectEmployee}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
};

export default People;
