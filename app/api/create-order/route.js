// app/api/create-order/route.js
import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { amount } = await req.json(); // Extract JSON data from the request

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in the smallest currency unit (paise)
      currency: "INR",
      payment_capture: 1,
    });

    return new Response(JSON.stringify({ id: order.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating Razorpay order" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
