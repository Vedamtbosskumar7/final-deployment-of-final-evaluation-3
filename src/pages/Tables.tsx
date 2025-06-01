import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { PlusCircle, Trash2 } from 'lucide-react';

const Tables = () => {
  const { tables, addTable, updateTableStatus } = useAppContext();
  const [showAddTable, setShowAddTable] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [chairCount, setChairCount] = useState(2);
  const [tableList, setTableList] = useState(tables);

  const handleAddTable = () => {
    if (newTableName.trim()) {
      const newTable = {
        name: newTableName,
        chairs: chairCount,
        status: 'Available',
      };
      addTable(newTable);
      
      // Update local table list
      const nextTableId = `${tableList.length + 1}`.padStart(2, '0');
      setTableList([...tableList, { ...newTable, id: nextTableId }]);
      
      setNewTableName('');
      setChairCount(2);
      setShowAddTable(false);
    }
  };

  const handleDeleteTable = (tableId: string) => {
    const updatedTables = tableList.filter(table => table.id !== tableId);
    // Reorder remaining tables
    const reorderedTables = updatedTables.map((table, index) => ({
      ...table,
      id: `${index + 1}`.padStart(2, '0'),
      name: `Table ${index + 1}`,
    }));
    setTableList(reorderedTables);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Tables</h1>
        <button
          className="btn btn-primary flex items-center"
          onClick={() => setShowAddTable(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Table
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {tableList.map((table) => (
          <div
            key={table.id}
            className={`table-card ${
              table.status === 'Available' ? 'table-card-available' : 'table-card-reserved'
            } hover:shadow-md`}
          >
            <div className="flex justify-between w-full">
              <span className="text-sm text-gray-500">Table</span>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleDeleteTable(table.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-3xl font-bold mt-2">{table.id}</h3>
            <div className="mt-2 flex items-center justify-center space-x-1">
              {Array.from({ length: table.chairs }).map((_, i) => (
                <span
                  key={i}
                  className="inline-block w-3 h-3 rounded-full bg-gray-300"
                ></span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">{table.chairs} chairs</p>
            <div className="mt-4 w-full">
              <select
                value={table.status}
                onChange={(e) =>
                  updateTableStatus(table.id, e.target.value as 'Available' | 'Reserved')
                }
                className="w-full text-sm p-1 rounded border border-gray-300 bg-white"
              >
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
          </div>
        ))}

        {/* Add new table placeholder */}
        {!showAddTable && (
          <div
            className="table-card border-dashed border-gray-300 hover:border-gray-500 cursor-pointer flex items-center justify-center"
            onClick={() => setShowAddTable(true)}
          >
            <PlusCircle className="w-10 h-10 text-gray-400" />
          </div>
        )}
      </div>

      {/* Add Table Modal */}
      {showAddTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Table</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Table Name
              </label>
              <input
                type="text"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                placeholder="Table 31"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chair Count
              </label>
              <select
                value={chairCount}
                onChange={(e) => setChairCount(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {[2, 3, 4, 5, 6, 8].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                className="btn btn-outline"
                onClick={() => setShowAddTable(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAddTable}
                disabled={!newTableName.trim()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;