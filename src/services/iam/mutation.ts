export default `mutation($input: [AddgcpIamPolicyInput!]!) {
  addgcpIamPolicy(input: $input, upsert: true) {
    numUids
  }
}`;
