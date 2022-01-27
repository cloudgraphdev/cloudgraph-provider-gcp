export default `mutation($input: [AddgcpKmsCryptoKeyInput!]!) {
  addgcpKmsCryptoKey(input: $input, upsert: true) {
    numUids
  }
}`;