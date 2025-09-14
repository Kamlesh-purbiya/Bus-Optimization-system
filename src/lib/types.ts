import type { LucideIcon } from 'lucide-react';

export type Route = {
  id: string;
  name: string;
  number: string;
  status: 'On Time' | 'Delayed' | 'Early';
};

export type Bus = {
  id: string;
  routeId: string;
  occupancy: number;
  capacity: number;
  position: { x: number; y: number };
  status: 'Moving' | 'Stopped';
};

export type Alert = {
  id: string;
  routeId: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error';
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};
