import { useAppContext } from '../context/AppContext';
import { mockAnalytics } from '../data/mockData';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { ChefHat as Chef, User, FileText, Users } from 'lucide-react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const { chefs, tables, orders } = useAppContext();
  
  const pieChartData = {
    labels: ['Dine In', 'Take Away', 'Served'],
    datasets: [
      {
        data: [
          mockAnalytics.orderSummary.dineIn,
          mockAnalytics.orderSummary.takeAway,
          mockAnalytics.orderSummary.served,
        ],
        backgroundColor: ['#2196F3', '#FF9800', '#4CAF50'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };
  
  const lineChartData = {
    labels: mockAnalytics.daysOfWeek,
    datasets: [
      {
        label: 'Daily Revenue',
        data: mockAnalytics.dailyRevenue,
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="card bg-[#F0F5F3] border-2 border-[#D9D9D9]">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <Chef className="w-6 h-6 text-secondary-500" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{mockAnalytics.totalChefs}</h2>
              <p className="text-sm text-gray-500">TOTAL CHEF</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-[#F0F5F3] border-2 border-[#D9D9D9]">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <span className="text-xl font-bold text-secondary-500">₹</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{mockAnalytics.totalRevenue / 1000}K</h2>
              <p className="text-sm text-gray-500">TOTAL REVENUE</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-[#F0F5F3] border-2 border-[#D9D9D9]">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-secondary-500" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{mockAnalytics.totalOrders}</h2>
              <p className="text-sm text-gray-500">TOTAL ORDERS</p>
            </div>
          </div>
        </div>
        
        <div className="card bg-[#F0F5F3] border-2 border-[#D9D9D9]">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <Users className="w-6 h-6 text-secondary-500" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{mockAnalytics.totalClients}</h2>
              <p className="text-sm text-gray-500">TOTAL CLIENTS</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <h3 className="text-lg font-medium mb-4">Order Summary</h3>
          <div className="h-48">
            <Doughnut 
              data={pieChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }} 
            />
          </div>
          <div className="grid grid-cols-3 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold">09</div>
              <div className="text-sm text-gray-500">Served</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">05</div>
              <div className="text-sm text-gray-500">Dine In</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">06</div>
              <div className="text-sm text-gray-500">Take Away</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-medium mb-4">Revenue</h3>
          <div className="h-48">
            <Line 
              data={lineChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            {mockAnalytics.daysOfWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-medium mb-4">Tables</h3>
          <div className="grid grid-cols-7 gap-2">
            {tables.slice(0, 30).map((table, index) => {
              if (index < 30) {
                return (
                  <div 
                    key={table.id}
                    className={`table-mini flex items-center justify-center text-xs h-10 rounded ${
                      table.status === 'Available' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {table.id}
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="flex items-center mt-6">
            <span className="inline-block w-3 h-3 rounded-full bg-primary-500 mr-2"></span>
            <span className="text-sm mr-4">Available</span>
            <span className="inline-block w-3 h-3 rounded-full bg-gray-300 mr-2"></span>
            <span className="text-sm">Reserved</span>
          </div>
        </div>
      </div>
      
      {/* Chef Table */}
      <div className="card">
        <h3 className="text-lg font-medium mb-4">Chef Name / Order Taken</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chef Name</th>
                <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {chefs.map((chef) => (
                <tr key={chef.id}>
                  <td className="py-4 text-sm font-medium text-gray-900">{chef.name}</td>
                  <td className="py-4 text-sm text-gray-900">{chef.ordersTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;