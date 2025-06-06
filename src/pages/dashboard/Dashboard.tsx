import React from "react";
import Components from "../../shared/components/export";
import { AiOutlineThunderbolt } from "react-icons/ai";
import DateInput from "./DateInput.component";
import InfoCard from "./InfoCard.component";
import { GrGroup } from "react-icons/gr";
import { RiUserSearchLine } from "react-icons/ri";
import { LuFileChartLine } from "react-icons/lu";
import { TbCalendarShare } from "react-icons/tb";
import PerformanceChart from "./Chart.component";
import UpActionList from "./UpAction.component";
import IncApp from "./IncApp.component";

// DRY applied: Used array to map repetitive InfoCard components
const infoCardData = [
  {
    title: "Employees",
    value: 24,
    icon: GrGroup,
    iconColor: "#2C1336",
    iconBg: "#EED3EF",
    linkText: "View Details",
    linkTo: "/employees",
  },
  {
    title: "Hiring",
    value: 5,
    icon: RiUserSearchLine,
    iconColor: "#21729F",
    iconBg: "#D3E3EF",
    linkText: "View Details",
    linkTo: "/employees",
  },
  {
    title: "Projects",
    value: 1,
    icon: LuFileChartLine,
    iconColor: "#13361C",
    iconBg: "#E3EFD3",
    linkText: "View Details",
    linkTo: "/employees",
  },
];

const mockActions = [
  {
    startTime: "08:00 am",
    endTime: "09:00 am",
    title: "Team Standup",
    description: "Daily standup with the frontend and backend teams",
  },
  {
    startTime: "09:30 am",
    endTime: "10:30 am",
    title: "Product Planning",
    description: "Quarterly roadmap discussion with product managers",
  },
  {
    startTime: "11:00 am",
    endTime: "12:00 pm",
    title: "Design Review",
    description: "Review new UI designs submitted by the design team",
  },
  {
    startTime: "01:00 pm",
    endTime: "02:00 pm",
    title: "Lunch & Learn",
    description: "Technical session on TypeScript best practices",
  },
  {
    startTime: "02:15 pm",
    endTime: "03:00 pm",
    title: "1:1 Meeting",
    description: "Monthly check-in with engineering manager",
  },
  {
    startTime: "03:30 pm",
    endTime: "04:30 pm",
    title: "Internal Meeting",
    description: "Internal Meeting with Jade Sapphire - UI Designer",
  },
  {
    startTime: "05:00 pm",
    endTime: "06:00 pm",
    title: "Client Sync",
    description: "Call with Client regarding Project X",
  },
  {
    startTime: "06:30 pm",
    endTime: "07:30 pm",
    title: "Code Review",
    description: "Review PRs and provide feedback to team",
  },
  {
    startTime: "08:00 pm",
    endTime: "09:00 pm",
    title: "Wrap-up & Planning",
    description: "Wrap up day and plan tasks for tomorrow",
  },
];

const Dashboard: React.FC = () => {
  return (
    <>
      <Components.navbar />
      <main className="mt-2 mx-2 lg:mt-6 lg:mx-6 ">
        <div className="flex space-x-2 py-2.5 px-2 w-full items-center shadow-sm border border-black/15 rounded-xl">
          <div className="flex p-2 text-2xl text-white bg-[#1163C1] rounded-full">
            <AiOutlineThunderbolt />
          </div>

          <div className="text-[12px] sm:text-[16px] font-[500]">
            Optimize your experience on Gigfloww- track your job post, manage
            teams and streamline HR OPERATIONS EFFORTLESSLY TODAY!
          </div>
        </div>

        <div className="flex justify-between items-center mt-10">
          <h1 className="text-xl lg:text-3xl font-semibold">
            Welcome Back, Nuraj group
          </h1>

          <DateInput />
        </div>

        <section className="flex flex-col h-auto  my-8 lg:flex-row w-full space-y-4 lg:space-y-0 lg:space-x-4">
          {/* 75% Left Section */}
          <div className="w-full lg:w-3/4 flex flex-col space-y-4">
            <div className="w-full flex flex-col lg:flex-row space-x-2 space-y-2 lg:space-y-0">
              {infoCardData.map((card, index) => (
                <InfoCard key={index} {...card} />
              ))}
            </div>
            <div className="w-full flex-grow  border border-black/15 rounded-md overflow-hidden ">
              <PerformanceChart />
            </div>
          </div>

          {/* 25% Right Section */}
          <div className="w-full lg:w-1/4 p-4 border border-black/15 rounded-md overflow-y-auto max-h-[600px]">
            {/* Why: overflow-y-auto added for better scroll experience without changing visual styles */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-[500]">Upcoming Actions</h2>
              <div className="flex p-2 text-2xl rounded-full bg-white border border-black/15 text-black">
                <TbCalendarShare />
              </div>
            </div>
            <UpActionList actions={mockActions} />
          </div>
        </section>

        <IncApp />
      </main>
    </>
  );
};

export default Dashboard;
