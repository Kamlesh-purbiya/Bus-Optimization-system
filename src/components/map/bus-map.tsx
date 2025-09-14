"use client";

import React, { useState, useEffect } from "react";
import { buses as initialBuses, routes } from "@/lib/data";
import type { Bus as BusType } from "@/lib/types";
import { BusFront, User, Clock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MAP_BOUNDS = { x: 95, y: 95 };

export function BusMap() {
  const [buses, setBuses] = useState<BusType[]>(initialBuses);
  const [activeBus, setActiveBus] = useState<BusType | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          if (bus.status === "Stopped") return bus;

          const moveX = (Math.random() - 0.5) * 2;
          const moveY = (Math.random() - 0.5) * 2;

          let newX = bus.position.x + moveX;
          let newY = bus.position.y + moveY;

          newX = Math.max(0, Math.min(newX, MAP_BOUNDS.x));
          newY = Math.max(0, Math.min(newY, MAP_BOUNDS.y));

          return { ...bus, position: { x: newX, y: newY } };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  
  const getRouteInfo = (routeId: string) => routes.find(r => r.id === routeId);

  return (
    <div className="relative h-[60vh] w-full rounded-lg overflow-hidden border bg-muted/20">
      {buses.map((bus) => (
        <Popover key={bus.id} onOpenChange={(isOpen) => setActiveBus(isOpen ? bus : null)}>
          <PopoverTrigger asChild>
            <button
              className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none transition-all duration-1000 ease-linear"
              style={{ top: `${bus.position.y}%`, left: `${bus.position.x}%` }}
              aria-label={`Bus ${bus.id}`}
            >
              <BusFront
                className={cn(
                    "h-8 w-8 text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-125",
                    activeBus?.id === bus.id && "scale-125 text-accent animate-pulse"
                )}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
             <div className="space-y-2">
                <h3 className="font-semibold leading-none tracking-tight">Bus ID: {bus.id}</h3>
                <p className="text-sm text-muted-foreground">
                    Route: {getRouteInfo(bus.routeId)?.number} - {getRouteInfo(bus.routeId)?.name}
                </p>
                <div className="flex justify-between items-center pt-2 text-sm">
                    <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-muted-foreground" /> 
                        <span>{bus.occupancy} / {bus.capacity}</span>
                    </div>
                     <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{getRouteInfo(bus.routeId)?.status}</span>
                    </div>
                </div>
                 <Badge variant={bus.status === 'Moving' ? 'default' : 'secondary'} className="mt-2">{bus.status}</Badge>
             </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
