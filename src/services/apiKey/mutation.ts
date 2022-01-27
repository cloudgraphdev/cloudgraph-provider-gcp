export default `mutation($input: [AddgcpApiKeyInput!]!) {
  addgcpApiKey(input: $input, upsert: true) {
    numUids
  }
}`;
