import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ShoppingBag } from 'lucide-react';

const Checkout = () => {
  const { cart, clearCart, orderType, setOrderType, tables, createOrder } = useAppContext();
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [cookingInstructions, setCookingInstructions] = useState('');

  // Calculate prices
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = orderType === 'Take Away' ? 50 : 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryCharge + tax;

  const handlePlaceOrder = () => {
    const tableId = orderType === 'Dine In' ? selectedTable : '';
    createOrder(tableId, orderType);
    navigate('/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <button 
          className="btn btn-primary px-8"
          onClick={() => navigate('/menu')}
        >
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto pb-20">
      <div className="flex items-center mb-6">
        <button
          className="mr-4 text-gray-500"
          onClick={() => navigate('/menu')}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold">Checkout</h1>
      </div>

      {/* Order Type Selection */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Order Type</h2>
        <div className="flex space-x-4">
          <button
            className={`flex-1 py-3 rounded-lg border ${
              orderType === 'Dine In'
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-gray-200'
            }`}
            onClick={() => setOrderType('Dine In')}
          >
            Dine In
          </button>
          <button
            className={`flex-1 py-3 rounded-lg border ${
              orderType === 'Take Away'
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-gray-200'
            }`}
            onClick={() => setOrderType('Take Away')}
          >
            Take Away
          </button>
        </div>
      </div>

      {/* Table Selection for Dine In */}
      {orderType === 'Dine In' && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Select Table</h2>
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="" disabled>
              Select a table
            </option>
            {tables
              .filter((table) => table.status === 'Available')
              .map((table) => (
                <option key={table.id} value={table.id}>
                  Table {table.id} ({table.chairs} chairs)
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Customer Details for Take Away */}
      {orderType === 'Take Away' && (
        <div className="mb-6 space-y-4">
          <h2 className="text-lg font-medium mb-3">Your Details</h2>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Phone Number"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Address</label>
            <textarea
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Delivery Address"
              rows={3}
              required
            />
          </div>
        </div>
      )}

      {/* Cooking Instructions */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Cooking Instructions (Optional)</h2>
        <textarea
          value={cookingInstructions}
          onChange={(e) => setCookingInstructions(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Add any special instructions here"
          rows={3}
        />
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Order Summary</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <div>
                <span className="font-medium">{item.quantity}x</span> {item.name}
              </div>
              <div>₹{item.price * item.quantity}</div>
            </div>
          ))}
          <div className="border-t border-gray-200 my-3 pt-3">
            <div className="flex justify-between mb-1">
              <div>Item Total</div>
              <div>₹{subtotal}</div>
            </div>
            <div className="flex justify-between mb-1">
              <div>Delivery Charge</div>
              <div>₹{deliveryCharge}</div>
            </div>
            <div className="flex justify-between mb-1">
              <div>Taxes (5%)</div>
              <div>₹{tax}</div>
            </div>
            <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200">
              <div>Grand Total</div>
              <div>₹{total}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Swipe to Order (Just a button for now) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <div className="max-w-xl mx-auto">
          <button
            className="w-full bg-primary-500 text-white py-4 rounded-full flex items-center justify-center font-medium"
            onClick={handlePlaceOrder}
            disabled={
              (orderType === 'Dine In' && !selectedTable) ||
              (orderType === 'Take Away' && (!customerName || !customerPhone || !customerAddress))
            }
          >
            Place Order
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;