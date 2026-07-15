import React from 'react';

export default function Avatar({ name, initials, src, size = 'md', color = '#0F2A4A', className = '' }) {
  const sizes = {
    sm:  'w-7 h-7 text-xs',
    md:  'w-9 h-9 text-sm',
    lg:  'w-11 h-11 text-base',
    xl:  'w-14 h-14 text-lg',
  };
  const display = initials || (name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?');

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'avatar'}
        className={`${sizes[size]} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${className}`}
      style={{ backgroundColor: color }}
    >
      {display}
    </div>
  );
}
