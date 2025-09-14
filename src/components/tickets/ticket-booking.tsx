"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { routes } from "@/lib/data";
import { Ticket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";

const formSchema = z.object({
  routeId: z.string().min(1, "Please select a route."),
  time: z.string().min(1, "Please select a time"),
  passengers: z.coerce.number().min(1, "Please enter at least 1 passenger."),
});

type FormValues = z.infer<typeof formSchema>;

export function TicketBooking() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { routeId: "", time: "", passengers: 1 },
    });

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const route = routes.find(r => r.id === data.routeId);

    toast({
        title: "Ticket Booked!",
        description: `You've successfully booked ${data.passengers} ticket(s) for route ${route?.number} at ${data.time}.`,
    });
    setIsLoading(false);
    form.reset();
  }

  return (
    <div className="max-w-md mx-auto">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="routeId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bus Route</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a route" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {routes.map((route) => (
                                    <SelectItem key={route.id} value={route.id}>
                                    {route.number} - {route.name}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Departure Time</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a time" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'].map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="passengers"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Number of Passengers</FormLabel>
                            <FormControl>
                                <Input type="number" min="1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                    <Ticket className="mr-2 h-4 w-4" />
                    Book Ticket
                </Button>
            </form>
        </Form>
    </div>
  );
}
