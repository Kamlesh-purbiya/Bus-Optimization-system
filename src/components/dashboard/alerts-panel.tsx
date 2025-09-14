import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { alerts } from "@/lib/data";
import { AlertTriangle, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AlertsPanel() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alerts & Notifications</CardTitle>
        <CardDescription>Real-time system updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          <div className="space-y-4">
            {alerts.map((alert) => {
              const Icon = alert.type === "warning" ? AlertTriangle : Info;
              return (
                <Alert key={alert.id} variant={alert.type === 'warning' ? 'destructive' : 'default'} className="flex items-start">
                   <Icon className="h-5 w-5 mt-0.5" />
                   <div className="ml-3">
                    <AlertTitle className="font-semibold">Route {alert.routeId.split('-')[1]}</AlertTitle>
                    <AlertDescription className="text-sm">
                        {alert.message}
                        <div className="text-xs text-muted-foreground mt-1">{alert.timestamp}</div>
                    </AlertDescription>
                   </div>
                </Alert>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
