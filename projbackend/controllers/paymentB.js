import braintree from "braintree";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey",
});

export const getToken = (req, res) => {
  gateway.clientToken
    .generate({
      customerId: aCustomerId,
    })
    .then((response) => {
      // pass clientToken to your front-end
      const clientToken = response.clientToken;
    });
};

export const processPayment = (req, res) => {
  gateway.transaction
    .sale({
      amount: "10.00",
      paymentMethodNonce: nonceFromTheClient,
      deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    })
    .then((result) => {});
};
