import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function EventsFilter({ 
  onSortChange, 
  onFilterChange, 
  onSearch,
  searchTerm = '',
  currentFilters = { freeOnly: false, availableOnly: false, thisWeek: false }
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState('date-asc');
  const [filters, setFilters] = useState(currentFilters);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSortChange = (value) => {
    setSortOption(value);
    if (onSortChange) onSortChange(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };
  
  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearchTerm);
    }
  };

  return (
    <div className="mb-8 bg-white shadow-md rounded-lg font-kanit">
      <div className="p-4 flex flex-wrap justify-between items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center space-x-2 text-indigo-600 font-medium"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span>ตัวกรองและการเรียงลำดับ</span>
        </button>

        {/* Desktop layout */}
        <div className="hidden md:flex flex-1 items-center space-x-6">
          <div className="space-y-1">
            <label className="block text-sm text-gray-600">เรียงลำดับตาม</label>
            <select 
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2"
            >
              <option value="date-asc">วันที่: เร็วที่สุด</option>
              <option value="date-desc">วันที่: ช้าที่สุด</option>
              <option value="price-asc">ราคา: ต่ำ - สูง</option>
              <option value="price-desc">ราคา: สูง - ต่ำ</option>
              <option value="popularity">ความนิยม</option>
            </select>
          </div>
          
          <div className="flex space-x-4 flex-1">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.freeOnly}
                onChange={(e) => handleFilterChange('freeOnly', e.target.checked)}
                className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">เฉพาะกิจกรรมฟรี</span>
            </label>
            
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.availableOnly}
                onChange={(e) => handleFilterChange('availableOnly', e.target.checked)}
                className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">ยังมีที่นั่งว่าง</span>
            </label>
            
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.thisWeek}
                onChange={(e) => handleFilterChange('thisWeek', e.target.checked)}
                className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">ในสัปดาห์นี้</span>
            </label>
          </div>
        </div>
        
        <div className="hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="ค้นหากิจกรรม..."
              value={localSearchTerm}
              onChange={handleSearchChange}
              className="px-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
            />
            <button 
              type="submit"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Mobile filters - collapsible */}
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden md:hidden"
      >
        <div className="p-4 pt-0 space-y-4 border-t">
          <div className="space-y-1">
            <label className="block text-sm text-gray-600">เรียงลำดับตาม</label>
            <select 
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2"
            >
              <option value="date-asc">วันที่: เร็วที่สุด</option>
              <option value="date-desc">วันที่: ช้าที่สุด</option>
              <option value="price-asc">ราคา: ต่ำ - สูง</option>
              <option value="price-desc">ราคา: สูง - ต่ำ</option>
              <option value="popularity">ความนิยม</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">ตัวกรอง</label>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.freeOnly}
                  onChange={(e) => handleFilterChange('freeOnly', e.target.checked)}
                  className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">เฉพาะกิจกรรมฟรี</span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.availableOnly}
                  onChange={(e) => handleFilterChange('availableOnly', e.target.checked)}
                  className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">ยังมีที่นั่งว่าง</span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.thisWeek}
                  onChange={(e) => handleFilterChange('thisWeek', e.target.checked)}
                  className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">ในสัปดาห์นี้</span>
              </label>
            </div>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="ค้นหากิจกรรม..."
              value={localSearchTerm}
              onChange={handleSearchChange}
              className="px-4 pr-10 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
            />
            <button 
              type="submit"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
