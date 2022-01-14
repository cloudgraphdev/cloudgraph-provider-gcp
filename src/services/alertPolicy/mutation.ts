export default `mutation($input: [AddgcpAlertPolicyInput!]!) {
  addgcpAlertPolicy(input: $input, upsert: true) {
    numUids
  }
}`;
