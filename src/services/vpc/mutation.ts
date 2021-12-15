export default `mutation($input: [AddgcpVpcConnectorInput!]!) {
  addgcpVpcConnector(input: $input, upsert: true) {
    numUids
  }
}`;
