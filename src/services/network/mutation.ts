export default `mutation($input: [AddgcpNetworkInput!]!) {
  addgcpNetwork(input: $input, upsert: true) {
    numUids
  }
}`;
