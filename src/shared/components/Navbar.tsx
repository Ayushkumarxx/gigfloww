import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, Bell, Settings } from "lucide-react";
import Assets from "../../assets/export";
// Define gradient backgrounds for each page to enhance visual identity
const gradients: any = {
  default: "from-[#2784B8] to-[#113B52]",
  dashboard: "from-[#3490c4] to-[#16455a]",
  people: "from-[#2376A4] to-[#0f4d6b]",
  hiring: "from-[#2784B8] to-[#113B52]",
  salary: "from-[#2784B8] to-[#113B52]",
  reviews: "from-[#3490c4] to-[#16455a]",
};

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "People", path: "/people" },
  { name: "Hiring", path: "/hiring" },
  { name: "Salary", path: "/salary" },
  { name: "Reviews", path: "/reviews" },
];
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // Used to determine the current route path
  const currentPath = location.pathname; // Needed to highlight active nav item and pick gradient

  // Determine the correct gradient based on the route
  const currentGradient = useMemo(() => {
    if (currentPath.includes("dashboard")) return gradients.dashboard;
    if (currentPath.includes("people")) return gradients.people;
    if (currentPath.includes("hiring")) return gradients.hiring;
    if (currentPath.includes("salary")) return gradients.salary;
    if (currentPath.includes("reviews")) return gradients.reviews;
    return gradients.default;
  }, [currentPath]);

  // Mark current item active by checking if path starts with the route
  const updatedNavItems = useMemo(() => {
    return navItems.map((item) => ({
      ...item,
      active: currentPath.startsWith(item.path), // Why: Enables highlighting the active menu item
    }));
  }, [currentPath]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev); // Why: Toggles open/close state for mobile menu
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <nav
      className={`bg-gradient-to-r ${currentGradient} shadow-xs relative z-50 mt-2 mx-2 lg:mt-6 lg:mx-4 rounded-[20px] lg:rounded-full`}
    >
      <div className="flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6">
        {/* Why: Brand/logo section for visual identity */}
        <div className="flex h-[30px] gap-2 lg:gap-4 items-center">
          <img src={Assets.onlyLogo} alt="logo" className="w-[30px] h-[30px]" />
          <div className="text-[18px] sm:text-[20px] lg:text-[24px] text-white font-bold">
            GIGFLOWW
          </div>
        </div>

        {/* Why: Desktop navigation links only shown on larger screens */}
        <div className="hidden lg:flex items-center space-x-4">
          {updatedNavItems.map((item) => (
            <div key={item.name}>
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-full text-md font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-white text-[#2784B8] "
                    : "text-white hover:bg-white/10 hover:backdrop-blur-xs"
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Why: Right-side control section (settings, notifications, profile, mobile menu) */}
        <div className="flex items-center space-x-3">
          <button className="hidden md:flex p-2 text-[#2784B8] bg-white hover:bg-white/90 rounded-full transition-colors duration-200">
            <Settings className="w-5 h-5" />
          </button>

          <div className="relative">
            <button className="flex p-2 text-[#2784B8] bg-white hover:bg-white/90 rounded-full transition-colors duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={Assets.user}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Why: Toggle button for mobile menu - visible only on small screens */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Why: Collapsible mobile menu, animated using Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden overflow-hidden"
          >
            <div className="py-4 px-2 space-y-2">
              {updatedNavItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)} // Why: Close menu after selection
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      item.active
                        ? "bg-white text-[#2784B8] shadow-md"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
