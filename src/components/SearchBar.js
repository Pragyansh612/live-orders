"use client";
import { useState } from "react";
import { MagnifyingGlassIcon, XCircleIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const SearchBar = ({ searchTerm, setSearchTerm, onScan }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      className={`relative mx-auto mb-6 w-full max-w-2xl ${
        isFocused ? "scale-105" : "scale-100"
      }`}
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`flex items-center rounded-lg border-2 bg-white px-3 py-2 shadow-sm ${
        isFocused ? "border-yellow-500" : "border-gray-200"
      }`}>
        <MagnifyingGlassIcon className="h-5 w-5 text-black" />
        <input
          type="text"
          placeholder="Search orders by ID or item name"
          className="w-full border-none bg-transparent px-3 py-1 outline-none text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchTerm && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSearchTerm("")}
          >
            <XCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </motion.button>
        )}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onScan}
          className="ml-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <QrCodeIcon className="h-6 w-6 text-gray-600" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchBar;