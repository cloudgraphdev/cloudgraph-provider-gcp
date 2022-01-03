export default `mutation($input: [AddgcpStorageBucketInput!]!) {
  addgcpStorageBucket(input: $input, upsert: true) {
    numUids
  }
}`;
