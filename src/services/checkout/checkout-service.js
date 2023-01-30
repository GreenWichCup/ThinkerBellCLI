import createStripe from "stripe-client";

const stripe = createStripe(
  "pk_test_51LnpLTLx0Z536MVK9hIV2ltGaxJpk7j1iZlO2e1PdKQwvumZ3dvh7UPjHkTfMqqcd5Kcyf9XYQt2BCeCdDPY6RZ600OFTi0BcA"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });
