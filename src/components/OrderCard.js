"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClockIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon,
  PrinterIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const OrderCard = ({ order, onStatusChange, onComplete }) => {
  const statusConfig = {
    pending: {
      color: "bg-amber-100 text-amber-800",
      badge: "New",
      nextAction: "Start Cooking",
      nextStatus: "cooking",
      actionColor: "bg-red-600 hover:bg-red-700",
    },
    cooking: {
      color: "bg-orange-100 text-orange-800",
      badge: "Cooking",
      nextAction: "Mark Ready",
      nextStatus: "ready",
      actionColor: "bg-yellow-600 hover:bg-yellow-700",
    },
    ready: {
      color: "bg-green-100 text-green-800",
      badge: "Ready",
      nextAction: "Mark Completed",
      nextStatus: "completed",
      actionColor: "bg-green-600 hover:bg-green-700",
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

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25,
        // duration: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -20,
      transition: { 
        duration: 0.3,
        ease: "easeInOut" 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 25,
        duration: 0.15
      }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95,
      transition: { 
        duration: 0.1
      }
    }
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-4"
      style={{
        willChange: "transform, opacity"
      }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <motion.span 
              className="text-lg font-bold mr-2 text-black"
              variants={itemVariants}
            >
              #{order.id}
            </motion.span>
            <motion.span 
              className={`text-xs px-2 py-1 rounded-full font-medium ${config.color}`}
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25
              }}
            >
              {config.badge}
            </motion.span>
          </div>
          <motion.div 
            className="text-xs font-medium text-gray-500 flex items-center"
            variants={itemVariants}
          >
            <ClockIcon className="h-4 w-4 mr-1" />
            {order.time}
          </motion.div>
        </div>

        <motion.div 
          className="flex justify-between items-center mb-3"
          variants={itemVariants}
        >
          <div className="text-sm font-medium text-gray-700">{order.type}</div>
          <div className="text-sm font-bold text-gray-900 flex items-center">
            <CurrencyRupeeIcon className="h-4 w-4" />
            {order.amount}
          </div>
        </motion.div>

        <div className="border-t border-b border-gray-100 py-3 my-2">
          <motion.div 
            className="text-sm font-medium text-black mb-2"
            variants={itemVariants}
          >
            {totalItems} {totalItems === 1 ? "Item" : "Items"}:
          </motion.div>
          <ul className="space-y-1">
            <AnimatePresence>
              {order.items.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="text-sm text-gray-700"
                  variants={itemVariants}
                  custom={index}
                >
                  <span className="font-medium text-black">{item.quantity}x</span>{" "}
                  <span className="text-gray-900">{item.name}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        <div className="flex justify-between items-center mt-3 pt-1">
          <div className="flex space-x-2">
            {(order.status === "cooking" || order.status === "ready") && (
              <motion.button
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
              >
                <DocumentTextIcon className="h-4 w-4 mr-1" />
                KOT
              </motion.button>
            )}
            {order.status === "ready" && (
              <motion.button
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
              >
                <PrinterIcon className="h-4 w-4 mr-1" />
                Bill
              </motion.button>
            )}
          </div>

          {config.nextAction && (
            <motion.button
              variants={buttonVariants}
              initial="idle"
              whileHover="hover"
              whileTap="tap"
              className={`px-3 py-1 sm:px-4 sm:py-2 text-white rounded-lg text-xs sm:text-sm font-medium ${config.actionColor} flex items-center`}
              onClick={handleActionClick}
            >
              {order.status === "ready" && (
                <motion.div
                  initial={{ rotate: -10, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                </motion.div>
              )}
              {config.nextAction}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;