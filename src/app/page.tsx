"use client";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { startCall, type ActionState } from "./actions";

const initialState: ActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Calling..." : "Start Call"}
    </Button>
  );
}

export default function Home() {
  const [state, formAction] = useActionState(startCall, initialState);

  useEffect(() => {
    if (state.token) {
      // In a real application, this token would be used to connect to Twilio.
      console.log("Call initiated successfully. Mock Token:", state.token);
    }
  }, [state.token]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Skype Clone</CardTitle>
          <CardDescription>
            Enter a number to start your call
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                name="to"
                type="tel"
                placeholder="e.g., +15551234567"
                required
              />
            </div>

            <SubmitButton />

            {state.error && (
              <p className="text-sm font-medium text-destructive">
                {state.error}
              </p>
            )}
            {state.message && (
              <p className="text-sm font-medium text-green-600">
                {state.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
