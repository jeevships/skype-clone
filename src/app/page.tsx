"use client";
import { useState } from "react";
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

export default function Home() {
  // --- State Management ---
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handles the logic for initiating a call by sending a request to our API.
   */
  const handleStartCall = async () => {
    // 1. Reset state before starting the new request
    setError("");
    setIsLoading(true);

    try {
      // 2. Call the API endpoint using the Fetch API
      const response = await fetch("/api/calls/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: phoneNumber }),
      });

      const data = await response.json();

      // 3. Handle a non-successful response (e.g., status 400 or 500)
      if (!response.ok) {
        // Use the error message from the API, or provide a fallback
        throw new Error(data.error || "An unknown error occurred.");
      }

      // 4. Handle a successful response
      // For now, we just log the mock token to the developer console.
      // In a real application, this token would be used to connect to Twilio.
      console.log("Call initiated successfully. Mock Token:", data.token);

    } catch (err: any) {
      // 5. Catch any errors (from the network or the `throw` above)
      setError(err.message);
    } finally {
      // 6. This block runs regardless of success or failure.
      // It's the perfect place to stop the loading indicator.
      setIsLoading(false);
    }
  };

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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                type="tel"
                placeholder="e.g., +15551234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <Button
              onClick={handleStartCall}
              disabled={isLoading || !phoneNumber}
              className="w-full"
            >
              {isLoading ? "Calling..." : "Start Call"}
            </Button>

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
