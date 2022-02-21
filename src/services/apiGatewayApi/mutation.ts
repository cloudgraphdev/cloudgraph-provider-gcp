export default `mutation($input: [AddgcpApiGatewayApiInput!]!) {
  addgcpApiGatewayApi(input: $input, upsert: true) {
    numUids
  }
}`;
