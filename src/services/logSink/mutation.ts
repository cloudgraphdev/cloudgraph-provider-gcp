export default `mutation($input: [AddgcpLogSinkInput!]!) {
  addgcpLogSink(input: $input, upsert: true) {
    numUids
  }
}`;
