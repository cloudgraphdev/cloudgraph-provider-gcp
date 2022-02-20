export default `mutation($input: [AddgcpLabelInput!]!) {
  addgcpLabel(input: $input, upsert: true) {
    numUids
  }
}`;
