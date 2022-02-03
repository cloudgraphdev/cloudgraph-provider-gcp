export default `mutation($input: [AddgcpCloudRouterInput!]!) {
  addgcpCloudRouter(input: $input, upsert: true) {
    numUids
  }
}`;
