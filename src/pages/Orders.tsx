import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { format } from 'date-fns';
import { Clock, Check } from 'lucide-react';

const OrderStatusColors = {
  Processing: 'bg-amber-100 text-amber-700 border-amber-200',
  Done: 'bg-green-100 text-green-700 border-green-200',
  Served: 'bg-blue-100 text-blue-700 border-blue-200',
  'Not Picked Up': 'bg-gray-100 text-gray-700 border-gray-200',
};

const OrderTypeColors = {
  'Dine In': 'bg-blue-50 text-blue-700',
  'Take Away': 'bg-purple-50 text-purple-700',
};

const Orders = () => {
  const { orders, updateOrderStatus, chefs, assignChef } = useAppContext();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Mock orders data since we don't have real ones yet
  const mockOrders = [
    {
      id: '#108',
      tableId: '05',
      timestamp: '9:37 AM',
      items: [
        { id: 'm1', name: 'Value Set Meals', quantity: 1, price: 350, category: 'Combo' },
        { id: 'b1', name: 'Double Cheeseburger', quantity: 1, price: 220, category: 'Burger' },
        { id: 'p1', name: 'Apple Pie', quantity: 1, price: 80, category: 'Dessert' },
        { id: 'd1', name: 'Coca-Cola L', quantity: 1, price: 60, category: 'Drink' },
      ],
      status: 'Processing',
      type: 'Dine In',
      duration: 4,
      chefId: '1',
    },
    {
      id: '#109',
      tableId: '05',
      timestamp: '9:37 AM',
      items: [
        { id: 'm1', name: 'Value Set Meals', quantity: 1, price: 350, category: 'Combo' },
        { id: 'b1', name: 'Double Cheeseburger', quantity: 1, price: 220, category: 'Burger' },
        { id: 'p1', name: 'Apple Pie', quantity: 1, price: 80, category: 'Dessert' },
        { id: 'd1', name: 'Coca-Cola L', quantity: 1, price: 60, category: 'Drink' },
      ],
      status: 'Done',
      type: 'Dine In',
      duration: 0,
      chefId: '2',
    },
    {
      id: '#110',
      tableId: '05',
      timestamp: '9:37 AM',
      items: [
        { id: 'm1', name: 'Value Set Meals', quantity: 1, price: 350, category: 'Combo' },
        { id: 'b1', name: 'Double Cheeseburger', quantity: 1, price: 220, category: 'Burger' },
        { id: 'p1', name: 'Apple Pie', quantity: 1, price: 80, category: 'Dessert' },
        { id: 'd1', name: 'Coca-Cola L', quantity: 1, price: 60, category: 'Drink' },
      ],
      status: 'Served',
      type: 'Take Away',
      duration: 0,
      chefId: '3',
    },
    {
      id: '#111',
      tableId: '05',
      timestamp: '9:37 AM',
      items: [
        { id: 'm1', name: 'Value Set Meals', quantity: 1, price: 350, category: 'Combo' },
        { id: 'b1', name: 'Double Cheeseburger', quantity: 1, price: 220, category: 'Burger' },
        { id: 'p1', name: 'Apple Pie', quantity: 1, price: 80, category: 'Dessert' },
        { id: 'd1', name: 'Coca-Cola L', quantity: 1, price: 60, category: 'Drink' },
      ],
      status: 'Not Picked Up',
      type: 'Take Away',
      duration: 0,
      chefId: '4',
    },
  ];

  const displayOrders = orders.length > 0 ? orders : mockOrders;
  
  const filteredOrders = selectedStatus
    ? displayOrders.filter((order) => order.status === selectedStatus)
    : displayOrders;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Order Line</h1>
        <div className="flex space-x-2">
          <button
            className={`btn ${
              !selectedStatus ? 'bg-gray-800 text-white' : 'btn-outline'
            }`}
            onClick={() => setSelectedStatus(null)}
          >
            All
          </button>
          {['Processing', 'Done', 'Served', 'Not Picked Up'].map((status) => (
            <button
              key={status}
              className={`btn ${
                selectedStatus === status ? 'bg-gray-800 text-white' : 'btn-outline'
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className={`rounded-lg overflow-hidden border ${
              order.status === 'Processing'
                ? 'border-amber-200'
                : order.status === 'Done'
                ? 'border-green-200'
                : order.status === 'Served'
                ? 'border-blue-200'
                : 'border-gray-200'
            }`}
          >
            {/* Order header */}
            <div
              className={`p-4 flex items-center justify-between ${
                order.status === 'Processing'
                  ? 'bg-amber-50'
                  : order.status === 'Done'
                  ? 'bg-green-50'
                  : order.status === 'Served'
                  ? 'bg-blue-50'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <span className="text-gray-800 font-medium">{order.id}</span>
                <div className="ml-4">
                  <div className="text-xs text-gray-500">Table-{order.tableId}</div>
                  <div className="text-xs text-gray-500">{order.timestamp}</div>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  OrderTypeColors[order.type as keyof typeof OrderTypeColors]
                }`}
              >
                {order.type}
              </div>
            </div>

            {/* Order items */}
            <div className="bg-white p-4">
              <div className="text-sm font-medium text-gray-700">
                {order.items.length} Item
              </div>

              <div className="mt-3 space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div className="flex">
                      <span className="mr-2">{item.quantity}x</span>
                      <span>{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order footer */}
              <div className="mt-4 flex justify-between items-center">
                {order.status === 'Processing' && (
                  <div className="flex items-center text-amber-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">Ongoing: {order.duration} Min</span>
                  </div>
                )}
                {order.status === 'Done' && (
                  <div className="flex items-center text-green-600">
                    <Check className="w-4 h-4 mr-1" />
                    <span className="text-sm">Served</span>
                  </div>
                )}
                {order.status === 'Served' && (
                  <div className="flex items-center text-blue-600">
                    <Check className="w-4 h-4 mr-1" />
                    <span className="text-sm">Served</span>
                  </div>
                )}
                {order.status === 'Not Picked Up' && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">Not Picked up</span>
                  </div>
                )}

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(
                      order.id,
                      e.target.value as 'Processing' | 'Done' | 'Served' | 'Not Picked Up'
                    )
                  }
                  className="text-sm p-1 rounded border border-gray-300 bg-white"
                >
                  <option value="Processing">Processing</option>
                  <option value="Done">Done</option>
                  <option value="Served">Served</option>
                  <option value="Not Picked Up">Not Picked Up</option>
                </select>
              </div>

              <div className="mt-4 pt-4 border-t">
                <select
                  value={order.chefId}
                  onChange={(e) => assignChef(order.id, e.target.value)}
                  className="w-full text-sm p-2 rounded border border-gray-300 bg-white"
                >
                  <option value="" disabled>
                    Assign Chef
                  </option>
                  {chefs.map((chef) => (
                    <option key={chef.id} value={chef.id}>
                      {chef.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;