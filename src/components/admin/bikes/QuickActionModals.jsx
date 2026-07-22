import React, { useState } from 'react';
import { X, FileText, AlertTriangle, CheckCircle2, Printer, Download } from 'lucide-react';

/**
 * Generate Invoice Modal
 */
export function GenerateInvoiceModal({ isOpen, bike, onClose, onAddInvoice }) {
  const [partsCost, setPartsCost] = useState(bike?.currentJob?.partsUsed?.reduce((a, b) => a + b.total, 0) || 1850);
  const [labourCost, setLabourCost] = useState(bike?.currentJob?.labourCost || 1200);
  const [discount, setDiscount] = useState(200);
  const [paymentMode, setPaymentMode] = useState('UPI');

  if (!isOpen || !bike) return null;

  const subtotal = Number(partsCost) + Number(labourCost);
  const gst = Number((subtotal * 0.18).toFixed(2));
  const grandTotal = Number((subtotal + gst - Number(discount)).toFixed(2));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-backdrop">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden modal-enter flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-emerald-400" />
            <h2 className="text-base font-bold">Generate Service Invoice</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        {/* Invoice Summary */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-slate-900">{bike.brand} {bike.model}</p>
              <p className="font-mono text-slate-500">{bike.regNumber} • {bike.owner?.name}</p>
            </div>
            <span className="font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
              INV-2026-{Math.floor(100 + Math.random() * 900)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parts Cost (₹)</label>
              <input
                type="number"
                value={partsCost}
                onChange={e => setPartsCost(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Labour Charge (₹)</label>
              <input
                type="number"
                value={labourCost}
                onChange={e => setLabourCost(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Discount (₹)</label>
              <input
                type="number"
                value={discount}
                onChange={e => setDiscount(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Mode</label>
              <select
                value={paymentMode}
                onChange={e => setPaymentMode(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="UPI">UPI (GPay / PhonePe)</option>
                <option value="Cash">Cash</option>
                <option value="Card">Credit / Debit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal (Parts + Labour)</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>GST @ 18%</span>
              <span>₹{gst.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Discount</span>
              <span>-₹{Number(discount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-sans font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
              <span>Grand Total</span>
              <span className="text-emerald-700">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
          >
            <Printer size={15} /> Print Invoice
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={() => {
                onAddInvoice(bike.id, { totalAmount: grandTotal });
                onClose();
              }}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
            >
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Delete Confirmation Modal
 */
export function DeleteConfirmModal({ isOpen, bikeId, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-backdrop">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden modal-enter p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertTriangle size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Delete Registered Vehicle?</h3>
          <p className="text-xs text-slate-500 mt-1">
            Are you sure you want to delete <span className="font-mono font-bold text-slate-800">{bikeId}</span> from the fleet database? This action cannot be undone.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(bikeId);
              onClose();
            }}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md"
          >
            Delete Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}
