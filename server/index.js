require("dotenv").config()
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())

const stripe = require("stripe")(process.env.STRIPE_KEY)


//route to accept the request for payment from the front end
app.post('/payment', async (req, res) => {
    console.log(req.body);
    // creating the session for stripe
    try {
        const session = await stripe.checkout.sessions.create({

            payment_method_types: ["card"], //payment method types
            mode: "payment", //one time payment

            //mapping to the cart data recieved from the front end
            line_items: req.body.item.map((item) => {
                const { price, cartItems: quantity, title, image } = item

                return {
                    price_data: {
                        currency: "inr", //accepting currency [RUPEE]

                        product_data: {
                            name: title,
                            images: [image]
                        },

                        unit_amount: price * 100

                    },
                    quantity: quantity,

                }
            }),

            success_url: "http://localhost:5173/",
            cancel_url: "http://localhost:5173/"

        })
        console.log(session.url);
        res.json({ url: session.url })
    } catch (error) {
        console.error(error)
    }

})

app.listen(3000)