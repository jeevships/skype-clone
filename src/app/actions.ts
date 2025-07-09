"use server";

import { z } from "zod";

// Define a schema for validation
const phoneSchema = z.string().min(1, "Phone number is required.");

export interface ActionState {
  error?: string;
  message?: string;
  token?: string;
}

export async function startCall(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const to = formData.get("to");

    // 1. Validate the input
    const validationResult = phoneSchema.safeParse(to);
    if (!validationResult.success) {
      return { error: validationResult.error.errors[0].message };
    }

    // 2. Here, you would typically use the Twilio Node.js SDK
    // to create a new call. We're just returning a mock token for now.
    console.log(`Starting a mock call to: ${validationResult.data}`);

    const mockToken = `mock-token-for-${validationResult.data}-${Date.now()}`;

    // 3. Respond with a success message and the mock token
    return {
      message: "Call initiated successfully",
      token: mockToken,
    };
  } catch (error) {
    // 4. Handle any unexpected errors
    console.error("Action Error:", error);
    return { error: "An internal server error occurred." };
  }
} 