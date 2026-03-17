import { NextResponse } from "next/server";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

// Initialize the SNS Client
const snsClient = new SNSClient({
    region: process.env.AWS_SNS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(request: Request) {
    try {
        // 1. Parse the incoming data from your CSR form
        const body = await request.json();
        const { name, email, phone, preferredtimeslot } = body;

        // Basic validation
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // 2. Format the message for SNS
        const message = `
New Demo Schedule:
-------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Time: ${preferredtimeslot || "Not specified"}
        `.trim();

        // 3. Set up the SNS Publish Command
        const command = new PublishCommand({
            TopicArn: process.env.AWS_SNS_CONTACT_US_ARN,
            Message: message,
            Subject: `New Demo Schedule: ${name}`, // Optional: Good for email subscriptions
        });

        // 4. Send to AWS
        await snsClient.send(command);

        return NextResponse.json(
            { success: true, message: "Data sent successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("SNS Publish Error:", error);
        return NextResponse.json(
            { error: "Failed to process submission" },
            { status: 500 }
        );
    }
}