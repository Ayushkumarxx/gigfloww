import React from "react";
import Components from "../../shared/components/export";
import JobDetailsForm from "./Form.component";
import ManagePost from "./ManagePost.component";
import Assets from "../../assets/export";

// DRY: Moved mockPosts outside the component to avoid re-creation on every render
const mockPosts = [
  {
    title: "UI Designer Intern (Remote)",
    company: "Article Studio",
    location: "Bangalore, India",
    status: "Under applying (posted 12/02/24)",
    views: 24,
    applications: 106,
  },
  {
    title: "Frontend Developer Intern",
    company: "TechMatrix",
    location: "Remote",
    status: "Under reviewing (posted 10/01/24)",
    views: 38,
    applications: 89,
  },
  {
    title: "Backend Engineer (Intern)",
    company: "DataFox",
    location: "Hyderabad, India",
    status: "Open (posted 08/01/24)",
    views: 45,
    applications: 120,
  },
  {
    title: "Product Manager Intern",
    company: "InnovateX",
    location: "Pune, India",
    status: "Closed (posted 01/01/24)",
    views: 12,
    applications: 43,
  },
];

const Hiring: React.FC = () => {
  return (
    <>
      <Components.navbar />
      <section className="my-10 mx-2 lg:mx-6">
        <p className="text-[20px] font-[500] mb-2">Job Posting</p>
        <p className="text-[16px] text-[#333333] font-normal mb-2">
          Post Job for free. Add details for your job post
        </p>

        {/* WHY: Added responsiveness support using flex-wrap and responsive basis instead of fixed width to avoid overflow and maintain layout on smaller screens */}
        <div className="w-full flex flex-wrap lg:flex-nowrap space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 mt-10">
          {/* Left - Responsive 100% on small, 70% on large */}
          <div className="w-full lg:w-[70%]">
            <JobDetailsForm />
          </div>

          {/* Right - Responsive 100% on small, 30% on large */}
          <div className="w-full lg:w-[30%] flex flex-col space-y-4">
            <div className="border border-black/15 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div className="text-[18px] font-[500]">Manage Posting</div>
                <div className="text-[14px] text-[#2784B8]">Sell all</div>
              </div>

              <ManagePost posts={mockPosts} />
            </div>

            <div className="border border-black/15 rounded-xl p-4">
              <img src={Assets.aiPosting} alt="" className="h-[160px] mb-4" />
              <div className="text-[18px] font-semibold text-[#242831] mb-4.5">
                Use AI to write
              </div>
              <div className="text-[14px] text-[#3A3A3A] mb-2">
                Write perfectly and flawless with Al. If you want help with job
                description and other fields, AI will suggest for you.
              </div>
              <button className="w-full bg-gradient-to-r from-[#2784B8] to-[#113B52] hover:bg-[#1f6b96] text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-[#2784B8] focus:ring-offset-2 outline-none text-sm sm:text-base">
                Write with AI
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hiring;
