export default `mutation($input: [AddgcpApiGatewayGatewayInput!]!) {
  addgcpApiGatewayGateway(input: $input, upsert: true) {
    numUids
  }
}`;
