export default `mutation($input: [AddgcpDnsPolicyInput!]!) {
  addgcpDnsPolicy(input: $input, upsert: true) {
    numUids
  }
}`;
