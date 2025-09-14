"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { alerts } from "@/lib/data";
import { AlertCircle, Info } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export function AlertsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications & Alerts</CardTitle>
        <CardDescription>
          Live updates and system alerts will appear here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
            {alerts.map((alert) => (
                <Alert key={alert.id} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
                    {alert.type === 'warning' ? <AlertCircle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                    <AlertTitle>Route {alert.routeId.split('-')[1]}</AlertTitle>
                    <AlertDescription>
                        {alert.message}
                        <div className="text-xs text-muted-foreground mt-1">{alert.timestamp}</div>
                    </AlertDescription>
                </Alert>
            ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
