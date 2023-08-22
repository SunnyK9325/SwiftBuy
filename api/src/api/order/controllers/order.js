("use strict");
const stripe = require("stripe")(process.env.STRIPE_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// core controller which handles our CRUD operations, added one more function so that
// whenever a request is made at here, this function also called.

// ctx parameter stands for "context," which typically holds information about the incoming 
// request and provides a way to respond to that request.

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    async create(ctx) {
        const { products } = ctx.request.body;
        try {
            // Promise.all is a useful feature in JavaScript that allows you to work with multiple Promises concurrently and handle them as a single Promise. It takes an array of Promises as input and returns a new Promise that fulfills when all the input Promises have fulfilled or rejects if any of the input Promises reject.
            const lineItems = await Promise.all(
                // for each items that comes from the frontend we gonna search that item in our backend
                products.map(async (product) => {
                    const item = await strapi.service("api::product.product").findOne(product.id);
                    // after finding the item, we can use its name, price, whatever
                    return {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: Math.round(item.price * 100),
                        },
                        quantity: product.quantity,
                    };
                })
            );

            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: { allowed_countries: ['US', 'CA', 'IN'] },
                payment_method_types: ["card"],
                mode: "payment",
                success_url: process.env.CLIENT_URL + "?success=true",
                cancel_url: process.env.CLIENT_URL + "?success=false",
                line_items: lineItems,
            });
            // if everything gone well, we can write the info to our db (order collection)
            await strapi
                .service("api::order.order")
                .create({ data: { products, stripeId: session.id } });

            return { stripeSession: session };
        } catch (error) {
            ctx.response.status = 500;          // server error
            return { error };
        }
    },
}));


