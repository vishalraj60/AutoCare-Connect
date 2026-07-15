import React from 'react';
import { Bell, Settings, Plus, Search } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { useRole } from '../../context/RoleContext';

// TopBar is role-aware through props passed by each page
export default function TopBar({
  title,
  greeting,
  searchPlaceholder = 'Search...',
  showNewBooking = true,
  unreadCount = 0,
  user = null,
  onNewBooking,
  children,
}) {
  const { role } = useRole();

  return (
    <header className="h-14 flex-shrink-0 bg-white border-b border-border flex items-center gap-3 px-5">
      {/* Left: title or greeting */}
      {greeting ? (
        <div className="flex-shrink-0">
          <h2 className="text-lg font-bold text-text-primary leading-tight">{greeting}</h2>
        </div>
      ) : title ? (
        <div className="flex-shrink-0">
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
        </div>
      ) : null}

      {/* Search */}
      <div className="flex-1 max-w-xs">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-50 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-accent/50 text-text-primary placeholder-text-secondary"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        {children}

        {/* Bell */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          <Bell size={17} className="text-text-secondary" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
          )}
        </button>

        {/* Settings */}
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          <Settings size={17} className="text-text-secondary" />
        </button>

        {/* New Booking */}
        {showNewBooking && (
          <Button variant="primary" size="sm" onClick={onNewBooking} className="gap-1">
            <Plus size={14} />
            New Booking
          </Button>
        )}

        {/* Avatar */}
        {user && (
          <Avatar
            name={user.name}
            initials={user.initials}
            src={user.avatar}
            size="sm"
            className="cursor-pointer"
          />
        )}
      </div>
    </header>
  );
}
