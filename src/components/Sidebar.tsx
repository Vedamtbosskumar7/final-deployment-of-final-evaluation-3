import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Coffee,
  ClipboardList, 
  Utensils, 
  ShoppingCart 
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: <LayoutDashboard size={24} />, label: 'Dashboard' },
    { to: '/tables', icon: <Coffee size={24} />, label: 'Tables' },
    { to: '/orders', icon: <ClipboardList size={24} />, label: 'Orders' },
    { to: '/menu', icon: <Utensils size={24} />, label: 'Menu' },
    { to: '/checkout', icon: <ShoppingCart size={24} />, label: 'Checkout' },
  ];

  return (
    <div className="fixed left-4 top-20 h-[calc(100vh-8rem)] bg-white rounded-[50px] shadow-md flex flex-col items-center py-8 w-16 z-10">
      <div className="flex flex-col space-y-8 items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-500 hover:bg-gray-100'
              }`
            }
            title={item.label}
          >
            {item.icon}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;