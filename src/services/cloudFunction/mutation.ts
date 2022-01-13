export default `mutation($input: [AddgcpCloudFunctionInput!]!) {
  addgcpCloudFunction(input: $input, upsert: true) {
    numUids
  }
}`;
