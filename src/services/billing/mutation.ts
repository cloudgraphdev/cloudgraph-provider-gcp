export default `mutation($input: [AddgcpBillingInput!]!) {
  addgcpBilling(input: $input, upsert: true) {
    numUids
  }
}`;
