export default `mutation($input: [AddgcpProjectInput!]!) {
  addgcpProject(input: $input, upsert: true) {
    numUids
  }
}`;
