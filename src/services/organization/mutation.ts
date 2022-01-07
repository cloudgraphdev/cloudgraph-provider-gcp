export default `mutation($input: [AddgcpOrganizationInput!]!) {
  addgcpOrganization(input: $input, upsert: true) {
    numUids
  }
}`;
