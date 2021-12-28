export default `mutation($input: [AddgcpLogViewInput!]!) {
  addgcpLogView(input: $input, upsert: true) {
    numUids
  }
}`;
