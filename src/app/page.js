"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TabNavigation from "@/components/TabNavigation";
import SearchBar from "@/components/SearchBar";
import OrderCard from "@/components/OrderCard";
import EmptyState from "@/components/EmptyState";
import { orders as initialOrders } from "@/data/orders";

export default function Home() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  const orderCounts = {
    pending: orders.filter((order) => order.status === "pending").length,
    cooking: orders.filter((order) => order.status === "cooking").length,
    ready: orders.filter((order) => order.status === "ready").length,
  };

  const handleStatusChange = (orderId, nextStatus) => {
    setOrders((prevOrders) => {
      // Find the order to update
      const orderToUpdate = prevOrders.find((order) => order.id === orderId);
      // Remove it from current position
      const filteredOrders = prevOrders.filter((order) => order.id !== orderId);
      
      // Create a modified order with animation properties
      const updatedOrder = { 
        ...orderToUpdate, 
        status: nextStatus,
        isTransitioning: true 
      };
      
      // Return filtered list first
      return filteredOrders;
    });
    
    // Add back the updated order after a short delay
    setTimeout(() => {
      setOrders((prevOrders) => [
        { ...orders.find((order) => order.id === orderId), status: nextStatus },
        ...prevOrders
      ]);
      setActiveTab(nextStatus);
    }, 300); // Slightly faster transition
  };

  const handleCompleteOrder = (orderId) => {
    // Animate out before removal
    setOrders((prevOrders) =>
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, isCompleting: true } 
          : order
      )
    );
    
    // Remove after animation completes
    setTimeout(() => {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    }, 300);
  };

  // Update search results when search term changes
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const results = orders.filter((order) => 
        order.id.toString().includes(searchTerm) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  
      // If searching in "cooking", include "new" (pending) orders too
      if (activeTab === "cooking") {
        const newOrders = orders.filter(order => 
          order.status === "pending" && 
          order.id.toString().includes(searchTerm)
        );
        setSearchResults([...results, ...newOrders]);
      } else {
        setSearchResults(results);
      }
    } else {
      setIsSearching(false);
    }
  }, [searchTerm, orders, activeTab]);
  
  // Filter orders by tab if not searching
  const filteredOrders = isSearching 
    ? searchResults.filter(order => order.status === activeTab)
    : orders.filter(order => order.status === activeTab);

  // Handle swipe gesture with improved touch handling
  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    
    const tabOrder = ["pending", "cooking", "ready"];
    const currentIndex = tabOrder.indexOf(activeTab);
    
    if (direction === "left" && currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    } else if (direction === "right" && currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }

    // Clear direction after animation completes
    setTimeout(() => setSwipeDirection(null), 400);
  };

  // Enhanced touch handling for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleSwipe("left");
    } else if (isRightSwipe) {
      handleSwipe("right");
    }
    
    // Reset touch coordinates
    setTouchStart(null);
    setTouchEnd(null);
  };

  const contentVariants = {
    initial: (direction) => ({
      x: direction === "left" ? 300 : direction === "right" ? -300 : 0,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction) => ({
      x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <img src="./logo.png" alt="" width={45} />
              <h1 className="text-2xl font-bold text-yellow-400">Dynish Live Orders</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium px-3 py-1 text-yellow-400 rounded-lg border border-yellow-400">
                Restaurant
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          orderCounts={orderCounts}
        />

        <div 
          className="mt-6 touch-manipulation"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={swipeDirection}>
            <motion.div
              key={activeTab}
              custom={swipeDirection}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusChange={handleStatusChange}
                      onComplete={handleCompleteOrder}
                    />
                  ))
                ) : (
                  <div className="md:col-span-2 lg:col-span-3">
                    <EmptyState 
                      message={
                        isSearching 
                          ? `No ${activeTab} orders found for "${searchTerm}"`
                          : `No ${activeTab} orders found`
                      } 
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}