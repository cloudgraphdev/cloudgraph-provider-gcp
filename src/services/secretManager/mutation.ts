export default `mutation($input: [AddgcpSecretInput!]!) {
  addgcpSecret(input: $input, upsert: true) {
    numUids
  }
}`;
