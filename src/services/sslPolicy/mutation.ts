export default `mutation($input: [AddgcpSslPolicyInput!]!) {
  addgcpSslPolicy(input: $input, upsert: true) {
    numUids
  }
}`;
