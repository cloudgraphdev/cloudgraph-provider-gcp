export default `mutation($input: [AddgcpComputeProjectInput!]!) {
  addgcpComputeProject(input: $input, upsert: true) {
    numUids
  }
}`;
