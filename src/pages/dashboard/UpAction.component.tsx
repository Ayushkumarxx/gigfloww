import React from "react";

// Type for each action item
type ActionItem = {
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  showBorder?: boolean;
};

// Individual Action component
const UpActionItem: React.FC<ActionItem> = ({ startTime, endTime, title, description, showBorder = true }) => {
  // WHY: compute border class dynamically to reduce repetitive string handling
  const borderClass = showBorder ? "border-b border-[#C4C4C4]" : "";

  return (
    <div className={`flex w-full py-4 ${borderClass}`}>
      {/* WHY: Fixed-width percentage classes swapped with responsive width utility to enhance adaptability */}
      <div className="w-[30%] max-w-[120px]">
        <div className="text-[16px] font-semibold h-[30px]">{startTime}</div>
        <div className="text-[14px] font-normal">{endTime}</div>
      </div>

      {/* Vertical Divider */}
      <div className="w-[1px] min-h-full bg-[#C4C4C4] mx-4" />

      {/* WHY: Avoid fixed 70% width to allow flexible growth when container size shrinks */}
      <div className="flex-1">
        <div className="h-[30px] text-[14px] font-normal">{title}</div>
        <div className="text-[14px] font-[500]">{description}</div>
      </div>
    </div>
  );
};

// Wrapper component that takes multiple mock items
const UpActionList: React.FC<{ actions: ActionItem[] }> = ({ actions }) => {
  // WHY: return fragment list mapped directly to children for clarity and key safety
  return (
    <div className="w-full">
      {actions.map((action, index) => (
        <UpActionItem
          key={index}
          {...action}
          showBorder={index !== actions.length - 1} // WHY: Hide border only for last item to maintain visual closure
        />
      ))}
    </div>
  );
};

export default UpActionList;
