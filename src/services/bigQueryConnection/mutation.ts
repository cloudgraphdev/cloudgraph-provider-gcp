export default `mutation($input: [AddgcpBigQueryConnectionInput!]!) {
  addgcpBigQueryConnection(input: $input, upsert: true) {
    numUids
  }
}`;
