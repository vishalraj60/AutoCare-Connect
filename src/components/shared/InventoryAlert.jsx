import React from 'react';
import { ShoppingCart, AlertTriangle, Box } from 'lucide-react';

const ICON_MAP = {
  brake:   Box,
  filter:  Box,
  battery: Box,
  spark:   Box,
};

export default function InventoryAlert({ item }) {
  const { name, quantity, threshold, alert } = item;
  const isLow = alert === 'low';
  const Icon = ICON_MAP[item.icon] || Box;

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${isLow ? 'bg-red-50 border border-red-100' : 'bg-slate-50 border border-border'}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isLow ? 'bg-red-100' : 'bg-slate-200'}`}>
        <Icon size={16} className={isLow ? 'text-danger' : 'text-text-secondary'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary truncate">{name}</p>
        <p className={`text-xs font-medium ${isLow ? 'text-danger' : 'text-text-secondary'}`}>
          {isLow ? `Low Stock: ${quantity} left` : `${quantity} left`}
        </p>
      </div>
      <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors flex-shrink-0">
        <ShoppingCart size={16} className="text-text-secondary" />
      </button>
    </div>
  );
}
