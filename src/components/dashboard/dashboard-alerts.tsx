"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { alerts } from "@/lib/data";

export function DashboardAlerts() {
  const { toast } = useToast();

  useEffect(() => {
    alerts.forEach((alert, index) => {
      setTimeout(() => {
        toast({
          title: `Alert: Route ${alert.routeId.split('-')[1]}`,
          description: alert.message,
          variant: alert.type === "warning" ? "destructive" : "default",
        });
      }, index * 1500); // Stagger the toasts
    });
  }, [toast]);

  return null;
}
