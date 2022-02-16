export default `mutation($input: [AddgcpCdnBackendBucketInput!]!) {
  addgcpCdnBackendBucket(input: $input, upsert: true) {
    numUids
  }
}`;
