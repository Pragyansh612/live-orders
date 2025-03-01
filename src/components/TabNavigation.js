"use client";
import { motion } from "framer-motion";

const TabNavigation = ({ activeTab, setActiveTab, orderCounts }) => {
  const tabs = [
    { id: "pending", label: "New" },
    { id: "cooking", label: "Cooking" },
    { id: "ready", label: "Ready" },
  ];

  return (
    <div className="flex justify-center w-full mb-6">
      <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner w-full max-w-2xl">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`flex-1 relative py-3 rounded-lg flex items-center justify-center font-medium ${
              activeTab === tab.id ? "text-white" : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab(tab.id)}
            whileTap={{ scale: 0.95 }}
          >
            {activeTab === tab.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg shadow-md"
                layoutId="activeTab"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center">
              {tab.label}
              <span className={`ml-2 text-xs px-2 py-1 rounded-full font-bold`}>
                {orderCounts[tab.id] || 0}
              </span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
