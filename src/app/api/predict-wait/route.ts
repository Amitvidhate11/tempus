import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { dept, currentLength } = await request.json();

    // Simulate network delay to mimic LLM inference time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate historical data influence and current length calculation
    const baseWait = currentLength * 3;
    const timeOfDay = new Date().getHours();

    let predicted_wait = baseWait;
    let confidence: "low" | "medium" | "high" = "medium";
    let reason = "Standard queue flow.";

    // Logic representing "AI's analysis of historical patterns"
    if (timeOfDay >= 11 && timeOfDay <= 14) {
      predicted_wait = Math.floor(baseWait * 1.4);
      confidence = "high";
      reason = "Peak hours detected. Wait times are historically higher.";
    } else if (currentLength > 8) {
      predicted_wait = Math.floor(baseWait * 1.2);
      confidence = "high";
      reason = "Queue is unusually long. Service may be slightly delayed.";
    } else if (currentLength <= 2) {
      predicted_wait = Math.max(1, Math.floor(baseWait * 0.8));
      confidence = "medium";
      reason = "Queue is light. Expect faster than average service.";
    } else {
      confidence = "low";
      reason = "Normal volume. Fluctuations possible based on staff availability.";
    }

    return NextResponse.json({
      predicted_wait,
      confidence,
      reason
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to predict wait time" }, { status: 500 });
  }
}
