export default `mutation($input: [AddgcpTagInput!]!) {
  addgcpTag(input: $input, upsert: true) {
    numUids
  }
}`;
