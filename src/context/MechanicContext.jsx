import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import {
  getMechanics, addMechanic as apiAdd, updateMechanic as apiUpdate,
  deleteMechanic as apiDelete, assignJob as apiAssignJob,
} from '../services/mechanicService';

// ─── State shape ──────────────────────────────────────────────────────────────
const initialState = {
  mechanics: [],
  loading: true,
  error: null,
  selectedMechanic: null,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function mechanicReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'LOAD_SUCCESS':
      return { ...state, mechanics: action.payload, loading: false, error: null };
    case 'ADD_MECHANIC':
      return { ...state, mechanics: [...state.mechanics, action.payload] };
    case 'UPDATE_MECHANIC':
      return {
        ...state,
        mechanics: state.mechanics.map(m => m.id === action.payload.id ? action.payload : m),
        selectedMechanic: state.selectedMechanic?.id === action.payload.id ? action.payload : state.selectedMechanic,
      };
    case 'DELETE_MECHANIC':
      return { ...state, mechanics: state.mechanics.filter(m => m.id !== action.payload) };
    case 'SET_SELECTED':
      return { ...state, selectedMechanic: action.payload };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const MechanicContext = createContext(null);

export function MechanicProvider({ children }) {
  const [state, dispatch] = useReducer(mechanicReducer, initialState);

  // Initial load
  useEffect(() => {
    loadMechanics();
  }, []);

  const loadMechanics = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await getMechanics();
      dispatch({ type: 'LOAD_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  }, []);

  const addMechanic = useCallback(async (data) => {
    const result = await apiAdd(data);
    dispatch({ type: 'ADD_MECHANIC', payload: result.mechanic });
    return result; // { mechanic, tempPassword }
  }, []);

  const updateMechanic = useCallback(async (id, data) => {
    const updated = await apiUpdate(id, data);
    dispatch({ type: 'UPDATE_MECHANIC', payload: updated });
    return updated;
  }, []);

  const deleteMechanic = useCallback(async (id) => {
    await apiDelete(id);
    dispatch({ type: 'DELETE_MECHANIC', payload: id });
  }, []);

  const assignJob = useCallback(async (mechanicId, jobData) => {
    await apiAssignJob(mechanicId, jobData);
    const updated = state.mechanics.find(m => m.id === mechanicId);
    if (updated) {
      dispatch({
        type: 'UPDATE_MECHANIC',
        payload: { ...updated, status: 'working', currentJob: jobData, pendingJobs: (updated.pendingJobs || 0) + 1 },
      });
    }
  }, [state.mechanics]);

  const selectMechanic = useCallback((mechanic) => {
    dispatch({ type: 'SET_SELECTED', payload: mechanic });
  }, []);

  const getMechanicById = useCallback((id) => {
    return state.mechanics.find(m => m.id === id) || null;
  }, [state.mechanics]);

  return (
    <MechanicContext.Provider value={{
      mechanics: state.mechanics,
      loading: state.loading,
      error: state.error,
      selectedMechanic: state.selectedMechanic,
      loadMechanics,
      addMechanic,
      updateMechanic,
      deleteMechanic,
      assignJob,
      selectMechanic,
      getMechanicById,
    }}>
      {children}
    </MechanicContext.Provider>
  );
}

export function useMechanic() {
  const ctx = useContext(MechanicContext);
  if (!ctx) throw new Error('useMechanic must be used within MechanicProvider');
  return ctx;
}
