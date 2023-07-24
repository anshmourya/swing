const express = require('express');
const router = express.Router();
const passport = require("./auth/passport");

// Middleware function to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};

// Route for handling the payment request from the front end
router.post('/payment', async (req, res) => {
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

            success_url: process.env.CLIENT_URl,
            cancel_url: `${process.env.CLIENT_URl}/cart`

        })
        console.log(session.url);
        res.json({ url: session.url })
    } catch (error) {
        console.error(error)
    }

})


// Route for handling successful login
router.get("/success", isLoggedIn, (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "authorized",
            user: req.user
        });
    } else {
        res.status(401).json({
            error: true,
            message: "unauthorized"
        });
    }
});

// Route for initiating Google OAuth authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
    console.log("from callback url", req.user);
    res.status(200).json({
        error: false,
        message: "Successfully login",
        user: req.user
    });
});

// Route for handling the Google OAuth callback
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URl}/signin`, successRedirect: process.env.CLIENT_URl }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(process.env.CLIENT_URl);
    });

// Route for logging out
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        console.log("user logged out");
        res.redirect(process.env.CLIENT_URl); // Inside a callback… bulletproof!
    });
});

module.exports = router;
