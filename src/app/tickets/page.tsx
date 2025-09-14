import { TicketBooking } from "@/components/tickets/ticket-booking";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function TIcketPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Book Your Bus Ticket</CardTitle>
                <CardDescription>
                    Select your route and time to book a ticket.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <TicketBooking />
            </CardContent>
        </Card>
    );
}
