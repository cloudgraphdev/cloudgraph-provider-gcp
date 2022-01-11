export default `mutation($input: [AddgcpVmInstanceInput!]!) {
  addgcpVmInstance(input: $input, upsert: true) {
    numUids
  }
}`;
