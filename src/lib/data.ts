import type { Route, Bus, Alert } from './types';

export const routes: Route[] = [
  { id: 'route-1', name: 'Majestic to ITPL', number: '335E', status: 'On Time' },
  { id: 'route-2', name: 'KR Market to Marathahalli', number: '500D', status: 'Delayed' },
  { id: 'route-3', name: 'Shivajinagar to Kengeri', number: '225C', status: 'On Time' },
  { id: 'route-4', name: 'Yeshwantpur to Electronic City', number: 'V-500K', status: 'Early' },
  { id: 'route-5', name: 'Banashankari to Hebbal', number: '502H', status: 'On Time' },
];

export const buses: Bus[] = [
  { id: 'bus-1', routeId: 'route-1', occupancy: 35, capacity: 50, position: { x: 20, y: 30 }, status: 'Moving' },
  { id: 'bus-2', routeId: 'route-1', occupancy: 45, capacity: 50, position: { x: 60, y: 50 }, status: 'Moving' },
  { id: 'bus-3', routeId: 'route-2', occupancy: 20, capacity: 50, position: { x: 40, y: 80 }, status: 'Stopped' },
  { id: 'bus-4', routeId: 'route-3', occupancy: 50, capacity: 50, position: { x: 80, y: 10 }, status: 'Moving' },
  { id: 'bus-5', routeId: 'route-4', occupancy: 15, capacity: 50, position: { x: 10, y: 90 }, status: 'Moving' },
  { id: 'bus-6', routeId: 'route-5', occupancy: 25, capacity: 50, position: { x: 75, y: 65 }, status: 'Moving' },
];

export const alerts: Alert[] = [
  { id: 'alert-1', routeId: 'route-2', message: 'Heavy traffic on Outer Ring Road. Route 500D delayed by 15 mins. Rescheduling...', type: 'warning', timestamp: '2 mins ago' },
  { id: 'alert-2', routeId: 'route-4', message: 'Low demand detected for Route V-500K. Trip at 3:30 PM is under review.', type: 'info', timestamp: '5 mins ago' },
  { id: 'alert-3', routeId: 'route-1', message: 'Bus bunching detected for Route 335E near Marathahalli bridge.', type: 'warning', timestamp: '10 mins ago' },
  { id: 'alert-4', routeId: 'route-3', message: 'Schedule optimized for Route 225C. Wait times reduced by 5 mins.', type: 'info', timestamp: '12 mins ago' },
];

export const historicalDataString = `
Date,Hour,Passengers
2023-10-01,8,150
2023-10-01,9,250
2023-10-01,10,180
2023-10-02,8,160
2023-10-02,9,260
2023-10-02,10,190
2023-10-03,8,155
2023-10-03,9,255
2023-10-03,10,185
`;
