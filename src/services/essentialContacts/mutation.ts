export default `mutation($input: [AddgcpEssentialContactInput!]!) {
  addgcpEssentialContact(input: $input, upsert: true) {
    numUids
  }
}`;
