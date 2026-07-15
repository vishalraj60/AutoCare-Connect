import React from 'react';
import StatusPill from '../ui/StatusPill';
import { FileText } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { ChevronRight } from 'lucide-react';

export default function DataTable({ columns, rows, onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map(col => (
              <th
                key={col.key}
                className="text-left text-[10px] font-semibold uppercase tracking-widest text-text-secondary py-3 px-4 whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={row.id || ri}
              className="border-b border-border/60 hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => onRowClick?.(row)}
            >
              {columns.map(col => (
                <td key={col.key} className="py-3.5 px-4 text-sm">
                  {col.render ? col.render(row[col.key], row) : (
                    <span className="text-text-primary">{row[col.key]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
