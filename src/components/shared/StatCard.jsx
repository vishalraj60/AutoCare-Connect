import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';

export default function StatCard({ label, value, badge, badgeColor = 'green', subLeft, subRight, progress, progressColor = 'blue', watermarkIcon: WatermarkIcon, children }) {
  return (
    <Card className="relative overflow-hidden">
      {/* Watermark */}
      {WatermarkIcon && (
        <div className="absolute right-4 bottom-4 opacity-5">
          <WatermarkIcon size={60} />
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <p className="stat-label">{label}</p>
        {badge && (
          <Badge color={badgeColor} className="text-xs">
            {badge}
          </Badge>
        )}
      </div>

      <p className="text-3xl font-bold text-text-primary mb-4">{value}</p>

      {progress !== undefined && (
        <ProgressBar value={progress} color={progressColor} className="mb-3" />
      )}

      {(subLeft || subRight) && (
        <>
          <div className="border-t border-border mt-3 pt-3 flex items-center justify-between">
            <span className="text-xs text-text-secondary">{subLeft}</span>
            <span className="text-sm font-semibold text-text-primary">{subRight}</span>
          </div>
        </>
      )}

      {children}
    </Card>
  );
}
