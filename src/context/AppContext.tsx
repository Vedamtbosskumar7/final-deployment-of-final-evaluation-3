import { createContext, useContext, useState, ReactNode } from 'react';
import { chefs, tables as initialTables } from '../data/mockData';

export type OrderStatus = 'Processing' | 'Done' | 'Served' | 'Not Picked Up';
export type OrderType = 'Dine In' | 'Take Away';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface Table {
  id: string;
  name: string;
  chairs: number;
  status: 'Available' | 'Reserved';
}

export interface Chef {
  id: string;
  name: string;
  ordersTaken: number;
}

export interface Order {
  id: string;
  tableId: string;
  timestamp: string;
  items: CartItem[];
  status: OrderStatus;
  type: OrderType;
  duration: number;
  chefId: string;
}

interface AppContextType {
  tables: Table[];
  chefs: Chef[];
  orders: Order[];
  cart: CartItem[];
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: (tableId: string, type: OrderType) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  assignChef: (orderId: string, chefId: string) => void;
  addTable: (table: Omit<Table, 'id'>) => void;
  updateTableStatus: (tableId: string, status: 'Available' | 'Reserved') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>('Dine In');

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (tableId: string, type: OrderType) => {
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: `#${Math.floor(100 + Math.random() * 900)}`,
      tableId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      status: 'Processing',
      type,
      duration: 0,
      chefId: '',
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    
    // If it's a dine-in order, update the table status
    if (type === 'Dine In') {
      updateTableStatus(tableId, 'Reserved');
    }
    
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    
    // If order is served/done and was a dine-in, we could potentially free up the table
    const order = orders.find((o) => o.id === orderId);
    if (order && status === 'Served' && order.type === 'Dine In') {
      updateTableStatus(order.tableId, 'Available');
    }
  };

  const assignChef = (orderId: string, chefId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, chefId } : order
      )
    );
  };

  const addTable = (table: Omit<Table, 'id'>) => {
    const newTable: Table = {
      ...table,
      id: `${tables.length + 1}`.padStart(2, '0'),
    };
    setTables((prevTables) => [...prevTables, newTable]);
  };

  const updateTableStatus = (tableId: string, status: 'Available' | 'Reserved') => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, status } : table
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        tables,
        chefs,
        orders,
        cart,
        orderType,
        setOrderType,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        createOrder,
        updateOrderStatus,
        assignChef,
        addTable,
        updateTableStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};