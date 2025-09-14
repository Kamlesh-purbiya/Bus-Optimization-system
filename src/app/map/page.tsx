import { BusMap } from '@/components/map/bus-map';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function MapPage() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Real-Time Bus Map</CardTitle>
            <CardDescription>Live locations and statuses of all active buses. Click a bus for details.</CardDescription>
        </CardHeader>
        <CardContent>
            <BusMap />
        </CardContent>
    </Card>
  );
}
