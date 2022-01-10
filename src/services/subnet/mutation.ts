export default `mutation($input: [AddgcpSubnetInput!]!) {
  addgcpSubnet(input: $input, upsert: true) {
    numUids
  }
}`;
