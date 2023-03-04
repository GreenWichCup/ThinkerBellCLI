const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createStripeCheckout = functions.https.onCall((data, context) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key)
  const session = stripe.checkout.session.create({

  })
})