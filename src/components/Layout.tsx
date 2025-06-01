import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import SearchFilter from './SearchFilter';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 pl-20 pr-6 py-6">
        <SearchFilter />
        <main className="mt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;