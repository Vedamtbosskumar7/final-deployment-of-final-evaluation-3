import { Search } from 'lucide-react';

const SearchFilter = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="w-[438px] h-[65px] bg-white rounded-[32px] shadow-sm flex items-center px-4">
        <Search className="w-5 h-5 text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Filter..."
          className="flex-1 h-full border-none bg-transparent focus:outline-none text-gray-700"
        />
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm rounded-full bg-primary-50 text-primary-700">
            Analytics
          </button>
          <button className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
            Tables
          </button>
          <button className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
            Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;