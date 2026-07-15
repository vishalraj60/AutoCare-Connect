import React from 'react';

export default function Button({ variant = 'primary', size = 'md', children, className, ...props }) {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-lg transition-colors duration-150 cursor-pointer border-0';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    accent:  'bg-accent text-white hover:bg-accent/90',
    outline: 'bg-white text-text-primary border border-border hover:bg-slate-50',
    ghost:   'bg-transparent text-text-secondary hover:bg-slate-100',
    danger:  'bg-danger text-white hover:bg-danger/90',
  };
  const sizes = {
    sm:  'px-3 py-1.5 text-xs',
    md:  'px-4 py-2 text-sm',
    lg:  'px-5 py-2.5 text-sm',
    xl:  'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${base} ${variants[variant] || ''} ${sizes[size] || ''} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
