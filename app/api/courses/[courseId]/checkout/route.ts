import { db } from "@/lib/db";
import { auth } from "@/lib/auth-new";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { convertGhsToUsd } from "@/lib/format";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {

        // We are creating a customer but we don't know when their payment 
        // method will be charged. We need to create a customer in Stripe
        // and then create a session for them to pay for the course.

        // The metadata is used to identify the user and the course they are
        // purchasing. We will use this information in the webhook to update
        // the database.

        const authSession = await auth();
        const userId = authSession?.user?.id;
        const userEmail = authSession?.user?.email;   

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                isPublished: true,
            },
        });

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId: params.courseId,
                },
            },
        });

        if (purchase) {
            return new NextResponse("Already Purchased", { status: 400 });
        }

        if (!course) {
            return new NextResponse("Not Found", { status: 404 });
        }   

         // Convert Cedi price to USD for Stripe processing
        const priceInUsd = convertGhsToUsd(course.price!);
        
        // define line items for stripe check out page.
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: course.title,
                        description: `Price: ₵${course.price!.toFixed(2)} (≈$${priceInUsd.toFixed(2)})`,
                    },
                    unit_amount: Math.round(priceInUsd * 100),
                },
                quantity: 1,
            },
        ];

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId,
            },
            select: {
                stripeCustomerId: true,
            },
        });

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: userEmail || undefined,
            });

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId,
                    stripeCustomerId: customer.id,
                },
            });
        }

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items: lineItems,
            mode: "payment",
            success_url: `${baseUrl}/api/courses/${course.id}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/courses/${course.id}?canceled=1`,
            metadata: {
                courseId: course.id,
                userId,
            },
        });

        return NextResponse.json({ url: session.url });
        
    } catch (error) {
        console.log("COURSE_ID_CHECKOUT", error);
        console.log("Environment variables:", {
            NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
            STRIPE_API_KEY: process.env.STRIPE_API_KEY ? "Set" : "Not set"
        });
        return new NextResponse("Internal Error", { status: 500 });
    }
}