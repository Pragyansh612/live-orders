// data/orders.js
export const orders = [
    {
      id: 101,
      date: "2025-03-01",
      time: "12:30 PM",
      status: "pending",
      type: "Dine-in",
      items: [
        { name: "Chicken Burger", quantity: 2 },
        { name: "French Fries", quantity: 1 },
        { name: "Coke", quantity: 2 }
      ],
      prepTime: 15,
      amount: 450
    },
    {
      id: 102,
      date: "2025-03-01",
      time: "12:45 PM",
      status: "cooking",
      type: "Takeaway",
      items: [
        { name: "Margherita Pizza", quantity: 1 },
        { name: "Garlic Bread", quantity: 1 }
      ],
      prepTime: 20,
      amount: 500
    },
    {
      id: 103,
      date: "2025-03-01",
      time: "12:55 PM",
      status: "ready",
      type: "Dine-in",
      items: [
        { name: "Pasta Alfredo", quantity: 1 },
        { name: "Garlic Bread", quantity: 1 },
        { name: "Sprite", quantity: 1 }
      ],
      prepTime: 18,
      amount: 550
    },
    {
      id: 104,
      date: "2025-03-01",
      time: "01:15 PM",
      status: "pending",
      type: "Takeaway",
      items: [
        { name: "Veggie Burger", quantity: 1 },
        { name: "Onion Rings", quantity: 1 },
        { name: "Iced Tea", quantity: 1 }
      ],
      prepTime: 12,
      amount: 350
    },
    {
      id: 105,
      date: "2025-03-01",
      time: "01:20 PM",
      status: "cooking",
      type: "Dine-in",
      items: [
        { name: "Caesar Salad", quantity: 1 },
        { name: "Grilled Chicken", quantity: 1 },
        { name: "Lemonade", quantity: 1 }
      ],
      prepTime: 15,
      amount: 480
    },
    {
      id: 106,
      date: "2025-03-01",
      time: "01:30 PM",
      status: "ready",
      type: "Delivery",
      items: [
        { name: "Family Pizza", quantity: 1 },
        { name: "Chicken Wings", quantity: 2 },
        { name: "Coke (2L)", quantity: 1 }
      ],
      prepTime: 25,
      amount: 850
    },
    {
      id: 107,
      date: "2025-03-01",
      time: "01:40 PM",
      status: "pending",
      type: "Dine-in",
      items: [
        { name: "Chicken Biryani", quantity: 2 },
        { name: "Naan", quantity: 4 },
        { name: "Raita", quantity: 1 }
      ],
      prepTime: 20,
      amount: 620
    },
    {
      id: 108,
      date: "2025-03-01",
      time: "01:45 PM",
      status: "cooking",
      type: "Takeaway",
      items: [
        { name: "Fish & Chips", quantity: 1 },
        { name: "Coleslaw", quantity: 1 }
      ],
      prepTime: 18,
      amount: 320
    }
  ];