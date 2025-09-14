import { DemandPrediction } from "@/components/prediction/demand-prediction";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PredictionPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger Demand Prediction</CardTitle>
        <CardDescription>
          Use our AI tool to forecast passenger demand for specific routes in
          the upcoming hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DemandPrediction />
      </CardContent>
    </Card>
  );
}
