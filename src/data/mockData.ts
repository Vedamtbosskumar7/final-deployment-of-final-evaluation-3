import { Chef, Table, CartItem } from '../context/AppContext';

export const chefs: Chef[] = [
  { id: '1', name: 'Manesh', ordersTaken: 3 },
  { id: '2', name: 'Pritam', ordersTaken: 7 },
  { id: '3', name: 'Yash', ordersTaken: 5 },
  { id: '4', name: 'Tenzen', ordersTaken: 8 },
];

export const tables: Table[] = Array.from({ length: 30 }, (_, i) => ({
  id: `${i + 1}`.padStart(2, '0'),
  name: `Table ${i + 1}`,
  chairs: Math.floor(Math.random() * 4) + 2, // Random between 2-6 chairs
  status: Math.random() > 0.3 ? 'Available' : 'Reserved', // 70% available, 30% reserved
}));

export const menuItems: CartItem[] = [
  // Pizza
  { id: 'p1', name: 'Capricciosa', price: 200, quantity: 1, category: 'Pizza' },
  { id: 'p2', name: 'Sicilian', price: 150, quantity: 1, category: 'Pizza' },
  { id: 'p3', name: 'Marinara', price: 90, quantity: 1, category: 'Pizza' },
  { id: 'p4', name: 'Pepperoni', price: 300, quantity: 1, category: 'Pizza' },
  { id: 'p5', name: 'Marinara Large', price: 200, quantity: 1, category: 'Pizza' },
  { id: 'p6', name: 'Pepperoni Small', price: 200, quantity: 1, category: 'Pizza' },
  
  // Burger
  { id: 'b1', name: 'Classic Burger', price: 120, quantity: 1, category: 'Burger' },
  { id: 'b2', name: 'Cheese Burger', price: 150, quantity: 1, category: 'Burger' },
  { id: 'b3', name: 'Double Cheeseburger', price: 220, quantity: 1, category: 'Burger' },
  { id: 'b4', name: 'Veggie Burger', price: 100, quantity: 1, category: 'Burger' },
  
  // French Fries
  { id: 'f1', name: 'Classic Fries', price: 70, quantity: 1, category: 'French Fries' },
  { id: 'f2', name: 'Cheese Fries', price: 100, quantity: 1, category: 'French Fries' },
  { id: 'f3', name: 'Masala Fries', price: 90, quantity: 1, category: 'French Fries' },
  { id: 'f4', name: 'Loaded Fries', price: 130, quantity: 1, category: 'French Fries' },
  { id: 'f5', name: 'Sweet Potato Fries', price: 110, quantity: 1, category: 'French Fries' },
  { id: 'f6', name: 'Curly Fries', price: 95, quantity: 1, category: 'French Fries' },
  
  // Drink
  { id: 'd1', name: 'Coca-Cola', price: 50, quantity: 1, category: 'Drink' },
  { id: 'd2', name: 'Sprite', price: 50, quantity: 1, category: 'Drink' },
  { id: 'd3', name: 'Orange Juice', price: 80, quantity: 1, category: 'Drink' },
  { id: 'd4', name: 'Water', price: 30, quantity: 1, category: 'Drink' },
  
  // Veggies
  { id: 'v1', name: 'Garden Salad', price: 80, quantity: 1, category: 'Veggies' },
  { id: 'v2', name: 'Caesar Salad', price: 120, quantity: 1, category: 'Veggies' },
  { id: 'v3', name: 'Grilled Vegetables', price: 150, quantity: 1, category: 'Veggies' },
];

export const mockAnalytics = {
  totalChefs: 4,
  totalRevenue: 12000,
  totalOrders: 20,
  totalClients: 65,
  
  orderSummary: {
    dineIn: 39,
    takeAway: 24,
    served: 41,
  },
  
  dailyRevenue: [1200, 1500, 900, 1800, 1600, 2100, 1900],
  daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};