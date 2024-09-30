import nodemailer from "nodemailer";

//create a POST function

export async function POST(request) {
    const { amount, receiverEmail, receiverName, token, transId } = await request.json();
    console.log("amount", amount);

    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
        },

    })

    try {
        const testResult = transport.verify();

        console.log("testResult", testResult);
            
    } catch (error) {

        console.log("error While veryfying email", error);

        return new Response(JSON.stringify({ msg: "error While veryfying email", error}), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
    });
        
    }


    try {

        const sendResult = await transport.sendMail({
            from: "Philekoos",
            to: receiverEmail,
            subject: "Payment Successful",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; padding-bottom: 20px;">
                <div style="width: 50px; height: 50px; margin: 0 auto;">
                    <svg id="logo-35" width="50px" height="50px" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" fill="#007AFF"></path>
                        <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" fill="#312ECB"></path>
                    </svg>
                </div>
                <h1 style="color: #007AFF; margin: 10px 0;">Philekoos</h1>
            </div>
            <p style="font-size: 16px; color: #333;">Dear ${receiverName},</p>
            <p style="font-size: 16px; color: #333;">Thank you for your purchase! Your payment was successful. Here are the details:</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="font-size: 16px; color: #333;"><strong>Amount Paid:</strong> ${amount} RS</p>
                <p style="font-size: 16px; color: #333;"><strong>Tokens Purchased:</strong> ${token}</p>
                <p style="font-size: 16px; color: #333;"><strong>Transaction ID:</strong> ${transId}</p>
            </div>
            <p style="font-size: 16px; color: #333;">If you have any questions, feel free to contact our support team.</p>
            <p style="font-size: 16px; color: #333;">Best regards,</p>
            <p style="font-size: 16px; color: #007AFF;">The Philekoos Team</p>
            <div style="text-align: center; margin-top: 20px;">
                <small style="font-size: 12px; color: #777;">&copy; 2024 Philekoos. All rights reserved.</small>
            </div>
        </div>
        `,
        });

        return new Response(JSON.stringify({ msg: "Mail sent", amount }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
        
    } catch (error) {

        console.log("error While sending email", error);

        return new Response(JSON.stringify({ msg: "Mail not sent", error}), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
    });
    }


}