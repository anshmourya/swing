require("dotenv").config()
const express = require('express');
const app = express();
const passport = require("./auth/passport");
const cors = require('cors');
const stripe = require("stripe")(process.env.STRIPE_KEY)


app.use(cors({
    origin: process.env.CLIENT_URl
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URl);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Set the header to 'true'
    next();
});
app.use(express.json())

const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    maxAge: 600000,
}));

app.use(passport.initialize());
app.use(passport.session());





app.get("/", (req, res) => {
    res.send("ok")
})


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

            success_url: process.env.CLIENT_URl,
            cancel_url: `${process.env.CLIENT_URl}/cart`

        })
        console.log(session.url);
        res.json({ url: session.url })
    } catch (error) {
        console.error(error)
    }

})

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401)

}


app.get("/success", isLoggedIn, (req, res) => {
    console.log(req.user);
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


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
    console.log("from callback url", req.user);
    res.status(200).json({
        error: false,
        message: "Successfully login",
        user: req.user
    })
});

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URl}/login`, successRedirect: process.env.CLIENT_URl }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(process.env.CLIENT_URl);
    });

app.get('/logout', function (req, res) {
    console.log("logout: ", req);
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    });
});
app.listen(process.env.PORT || 3000)
