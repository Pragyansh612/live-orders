"use client";
import { motion } from "framer-motion";

const TabNavigation = ({ activeTab, setActiveTab, orderCounts }) => {
  const tabs = [
    { id: "pending", label: "New" },
    { id: "cooking", label: "Cooking" },
    { id: "ready", label: "Ready" },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex justify-center w-full mb-6">
      <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner w-full max-w-2xl">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`flex-1 relative py-3 rounded-lg flex items-center justify-center font-medium ${
              activeTab === tab.id ? "text-white" : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => handleTabChange(tab.id)}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === tab.id && (
              <motion.div
                className="absolute inset-0 bg-yellow-500 rounded-lg shadow-md"
                layoutId="activeTab"
                initial={false}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 35,
                  duration: 0.3
                }}
              />
            )}
            <span className="relative z-10 flex items-center">
              {tab.label}
              <motion.span 
                className={`ml-2 text-xs px-2 py-1 rounded-full font-bold ${
                  activeTab === tab.id ? "bg-yellow-400 text-yellow-800" : "bg-gray-200 text-gray-700"
                }`}
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ 
                  scale: orderCounts[tab.id] > 0 ? [1, 1.1, 1] : 1,
                  opacity: 1 
                }}
                transition={{ 
                  duration: 0.3,
                  scale: { duration: 0.4, repeatDelay: 0.1 }
                }}
              >
                {orderCounts[tab.id] || 0}
              </motion.span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;