export default `mutation($input: [AddgcpApiGatewayApiConfigInput!]!) {
  addgcpApiGatewayApiConfig(input: $input, upsert: true) {
    numUids
  }
}`;
