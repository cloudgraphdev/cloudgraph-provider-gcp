export default `mutation($input: [AddgcpKmsKeyRingInput!]!) {
  addgcpKmsKeyRing(input: $input, upsert: true) {
    numUids
  }
}`;
