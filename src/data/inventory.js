// Mock inventory data for Admin dashboard alerts
export const inventory = [
  {
    id: 'inv-1',
    name: 'Brake Pads (Front)',
    quantity: 4,
    threshold: 10,
    alert: 'low', // 'low'|'ok'|'critical'
    icon: 'brake',
  },
  {
    id: 'inv-2',
    name: 'Oil Filters (Standard)',
    quantity: 12,
    threshold: 10,
    alert: 'ok',
    icon: 'filter',
  },
  {
    id: 'inv-3',
    name: 'Batteries (12V)',
    quantity: 18,
    threshold: 10,
    alert: 'ok',
    icon: 'battery',
  },
  {
    id: 'inv-4',
    name: 'Spark Plugs',
    quantity: 24,
    threshold: 10,
    alert: 'ok',
    icon: 'spark',
  },
];
