// src/components/EmptyState.js
import { motion } from "framer-motion";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

const EmptyState = ({ message = "No orders found" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col items-center justify-center p-10 text-center"
    >
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 15 }}
      >
        <DocumentMagnifyingGlassIcon className="h-20 w-20 text-gray-300" />
      </motion.div>
      <h3 className="mt-4 text-lg font-medium text-gray-700">{message}</h3>
      <p className="mt-2 text-sm text-gray-500">
        Orders matching your criteria will appear here
      </p>
    </motion.div>
  );
};

export default EmptyState;