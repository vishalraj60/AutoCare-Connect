// Mock activity feed for Customer dashboard timeline
export const activity = [
  {
    id: 'act-1',
    type: 'message', // 'message'|'payment'|'service'|'booking'
    date: 'Today, 2:30 PM',
    title: 'New Message from Mechanic',
    description: null,
    quote: 'Quality check is nearly complete on the Classic 350. Brake pads looked good, no replacement needed.',
    color: 'blue', // 'blue'|'gray'|'green'|'amber'
    read: false,
  },
  {
    id: 'act-2',
    type: 'payment',
    date: 'Oct 12, 2023',
    title: 'Invoice Paid',
    description: 'Invoice #INV-2023-847 for ₹4,500.00 was successfully processed.',
    quote: null,
    color: 'gray',
    read: true,
  },
  {
    id: 'act-3',
    type: 'service',
    date: 'Oct 10, 2023',
    title: 'Service Completed',
    description: 'Routine Maintenance - 2020 KTM Duke 390.',
    quote: null,
    color: 'green',
    read: true,
  },
];
