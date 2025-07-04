import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { to } = await request.json();

    //basic validation: If "to" is not a valid phone number, return an error
    if (!to) {
        return NextResponse.json(
            { error: 'The "to" field (phone number) is required.'},
            { status: 400 }
        );
    }
}
