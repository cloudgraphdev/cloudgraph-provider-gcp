export default `mutation($input: [AddgcpLogBucketInput!]!) {
  addgcpLogBucket(input: $input, upsert: true) {
    numUids
  }
}`;
