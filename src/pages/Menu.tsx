import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { menuItems } from '../data/mockData';

const categories = [
  { id: 'burger', name: 'Burger', icon: '🍔' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'drink', name: 'Drink', icon: '🥤' },
  { id: 'french-fries', name: 'French Fries', icon: '🍟' },
  { id: 'veggies', name: 'Veggies', icon: '🥗' },
];

const Menu = () => {
  const { addToCart, removeFromCart, updateItemQuantity, cart } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('pizza');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleAddToCart = (item: any) => {
    addToCart(item);
  };

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateItemQuantity(id, newQuantity);
  };

  const filteredItems = menuItems.filter(
    (item) =>
      (item.category.toLowerCase() === activeCategory ||
        activeCategory === 'all') &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        searchTerm === '')
  );

  // Calculate cart total
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-xl mx-auto pb-20">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Good evening</h1>
        <p className="text-gray-500">Place your order here</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 rounded-lg py-3 pl-10 pr-4 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex flex-col items-center justify-center p-3 min-w-[70px] rounded-lg border ${
              activeCategory === category.id.toLowerCase()
                ? 'bg-gray-800 text-white'
                : 'bg-white border-gray-200'
            }`}
            onClick={() => setActiveCategory(category.id.toLowerCase())}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="text-xs mt-1">{category.name}</span>
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 capitalize">{activeCategory}</h2>

      {/* Menu Items */}
      <div className="grid grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const cartItem = cart.find((cartItem) => cartItem.id === item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="h-32 bg-gray-200">
                <img
                  src={`https://source.unsplash.com/featured/?${item.name.toLowerCase().replace(/ /g, '-')}`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-medium">₹{item.price}</p>
                  
                  {!cartItem ? (
                    <button
                      className="w-6 h-6 flex items-center justify-center bg-gray-800 text-white rounded-full"
                      onClick={() => handleAddToCart(item)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full"
                        onClick={() => handleQuantityChange(item.id, cartItem.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-gray-800 text-white rounded-full"
                        onClick={() => handleQuantityChange(item.id, cartItem.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
          <div className="max-w-xl mx-auto flex justify-between items-center">
            <div>
              <p className="text-gray-500">{cart.reduce((total, item) => total + item.quantity, 0)} items</p>
              <p className="font-bold">₹{cartTotal}</p>
            </div>
            <button
              className="bg-gray-800 text-white px-6 py-3 rounded-full flex items-center"
              onClick={() => navigate('/checkout')}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;