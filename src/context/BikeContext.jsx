import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { bikeService } from '../services/bikeService';

const BikeContext = createContext();

export function BikeProvider({ children }) {
  const [bikes, setBikes] = useState([]);
  const [stats, setStats] = useState({
    totalRegistered: 0,
    currentlyInService: 0,
    readyForDelivery: 0,
    completedToday: 0,
    pendingBookings: 0,
    avgServiceTimeHours: 2.8,
    revenueToday: 0,
    revenueThisMonth: 0,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // View state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const loadBikes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await bikeService.getBikes({
        search: searchQuery,
        brand: brandFilter,
        status: statusFilter,
        serviceType: serviceFilter,
        sortBy,
        page: currentPage,
        pageSize,
      });

      setBikes(res.bikes);
      setTotalCount(res.totalCount);
      setTotalPages(res.totalPages);
      setStats(res.stats);
    } catch (err) {
      console.error('Failed to load bikes:', err);
      setError(err.message || 'Failed to load bikes');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, brandFilter, statusFilter, serviceFilter, sortBy, currentPage, pageSize]);

  useEffect(() => {
    loadBikes();
  }, [loadBikes]);

  const handleRegisterBike = async (bikeData) => {
    try {
      const newBike = await bikeService.registerBike(bikeData);
      addToast(`Bike ${newBike.id} (${newBike.regNumber}) registered successfully!`, 'success');
      await loadBikes();
      return newBike;
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error');
      throw err;
    }
  };

  const handleUpdateBike = async (id, bikeData) => {
    try {
      const updated = await bikeService.updateBike(id, bikeData);
      addToast(`Bike ${id} updated successfully!`, 'success');
      await loadBikes();
      return updated;
    } catch (err) {
      addToast(err.message || 'Update failed', 'error');
      throw err;
    }
  };

  const handleDeleteBike = async (id) => {
    try {
      await bikeService.deleteBike(id);
      addToast(`Bike ${id} removed from fleet`, 'info');
      await loadBikes();
    } catch (err) {
      addToast(err.message || 'Deletion failed', 'error');
      throw err;
    }
  };

  const handleAssignMechanic = async (bikeId, mechanic) => {
    try {
      const updated = await bikeService.assignMechanic(bikeId, mechanic);
      addToast(`Mechanic ${mechanic.name} assigned to ${bikeId}`, 'success');
      await loadBikes();
      return updated;
    } catch (err) {
      addToast(err.message || 'Assignment failed', 'error');
      throw err;
    }
  };

  const handleUpdateStage = async (bikeId, stage) => {
    try {
      const updated = await bikeService.updateServiceStage(bikeId, stage);
      addToast(`Service stage updated to "${stage}" for ${bikeId}`, 'success');
      await loadBikes();
      return updated;
    } catch (err) {
      addToast(err.message || 'Stage update failed', 'error');
      throw err;
    }
  };

  const handleExportCSV = () => {
    bikeService.exportToCSV(bikes);
    addToast('Bike fleet exported to CSV file', 'success');
  };

  return (
    <BikeContext.Provider
      value={{
        bikes,
        stats,
        totalCount,
        totalPages,
        currentPage,
        pageSize,
        setCurrentPage,
        setPageSize,
        searchQuery,
        setSearchQuery,
        brandFilter,
        setBrandFilter,
        statusFilter,
        setStatusFilter,
        serviceFilter,
        setServiceFilter,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        loading,
        error,
        toasts,
        addToast,
        removeToast,
        loadBikes,
        registerBike: handleRegisterBike,
        updateBike: handleUpdateBike,
        deleteBike: handleDeleteBike,
        assignMechanic: handleAssignMechanic,
        updateServiceStage: handleUpdateStage,
        exportCSV: handleExportCSV,
      }}
    >
      {children}
    </BikeContext.Provider>
  );
}

export function useBikes() {
  const context = useContext(BikeContext);
  if (!context) {
    throw new Error('useBikes must be used within a BikeProvider');
  }
  return context;
}
