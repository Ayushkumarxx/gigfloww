import React from "react";
import Assets from "../../assets/export";

interface PostData {
  title: string;
  company: string;
  location: string;
  status: string;
  views: number;
  applications: number;
}

interface ManagePostProps {
  posts: PostData[];
}

const ManagePost: React.FC<ManagePostProps> = ({ posts }) => {
  // why: function extracted to reduce duplication and make render logic cleaner
  const renderPostCard = (post: PostData, index: number) => (
    <div key={index} className="border border-black/15 rounded-xl p-4 my-4">
      <div className="flex space-x-4">
        <div className="w-[50px] h-[50px] bg-[#050660] p-2 rounded-md">
          <img
            src={Assets.posting}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <div className="text-[18px] font-[500]">{post.title}</div>
          <div className="text-[14px]">{post.company}</div>
          <div className="text-[14px] text-[#333333] font-normal">
            {post.location}
          </div>
          <div className="text-[14px]">{post.status}</div>
        </div>
      </div>

      <div className="w-full h-[0.5px] bg-[#D6D6D6] my-4"></div>

      {/* why: flex-wrap allows content to wrap instead of overflowing on small screens */}
      <div className="flex space-x-2.5">
        {/* why: min-w prevents shrinking to 0 on smaller screens */}
        <div className="w-[50px] h-[50px] p-2 rounded-md min-w-[50px]"></div>
        <div className="flex justify-between w-full pr-[15%] pl-2">
          <div className="text-[14px] font-semibold text-center">
            {post.views} <br /> Views
          </div>
          <div className="text-[14px] font-semibold text-center">
            {post.applications} <br /> Applications
          </div>
        </div>
      </div>
    </div>
  );

  return <>{posts.slice(0, 2).map(renderPostCard)}</>;
};

export default ManagePost;
