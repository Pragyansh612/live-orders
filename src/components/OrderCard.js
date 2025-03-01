// src/components/OrderCard.js
"use client";
import { motion } from "framer-motion";
import {
  ClockIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon,
  PrinterIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const OrderCard = ({ order, onStatusChange, onComplete }) => {
  // Status colors and labels
  const statusConfig = {
    pending: {
      color: "bg-amber-100 text-amber-800",
      badge: "New",
      nextAction: "Start Cooking",
      nextStatus: "cooking",
      actionColor: "bg-orange-600 hover:bg-orange-700",
    },
    cooking: {
      color: "bg-orange-100 text-orange-800",
      badge: "Cooking",
      nextAction: "Mark Ready",
      nextStatus: "ready",
      actionColor: "bg-green-600 hover:bg-green-700",
    },
    ready: {
      color: "bg-green-100 text-green-800",
      badge: "Ready",
      nextAction: "Mark Completed",
      nextStatus: "completed",
      actionColor: "bg-blue-600 hover:bg-blue-700",
    },
    completed: {
      color: "bg-blue-100 text-blue-800",
      badge: "Completed",
      nextAction: null,
      nextStatus: null,
      actionColor: "",
    },
  };

  const config = statusConfig[order.status];

  // Calculate the total items
  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleActionClick = () => {
    if (order.status === "ready") {
      onComplete(order.id);
    } else {
      onStatusChange(order.id, config.nextStatus);
    }
  };

  return (
<motion.div
  layout
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-4"
>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <span className="text-lg font-bold mr-2">#{order.id}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${config.color}`}>
              {config.badge}
            </span>
          </div>
          <div className="text-xs font-medium text-gray-500 flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            {order.time}
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium text-gray-700">{order.type}</div>
          <div className="text-sm font-bold text-gray-900 flex items-center">
            <CurrencyRupeeIcon className="h-4 w-4" />
            {order.amount}
          </div>
        </div>

        <div className="border-t border-b border-gray-100 py-3 my-2">
          <div className="text-sm font-medium text-gray-500 mb-2">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}:
          </div>
          <ul className="space-y-1">
            {order.items.map((item, index) => (
              <li key={index} className="text-sm">
                <span className="font-medium">{item.quantity}x</span>{" "}
                <span className="text-gray-800">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center mt-3 pt-1">
          <div className="flex space-x-2">
            {(order.status === "cooking" || order.status === "ready") && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
              >
                <DocumentTextIcon className="h-4 w-4 mr-1" />
                KOT
              </motion.button>
            )}
            {order.status === "ready" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
              >
                <PrinterIcon className="h-4 w-4 mr-1" />
                Bill
              </motion.button>
            )}
          </div>

          {config.nextAction && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-white rounded-lg text-xs sm:text-sm font-medium ${config.actionColor} flex items-center`}
              onClick={handleActionClick}
            >
              {order.status === "ready" && <CheckCircleIcon className="h-4 w-4 mr-1" />}
              {config.nextAction}
            </motion.button>

          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;