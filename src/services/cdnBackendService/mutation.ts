export default `mutation($input: [AddgcpCdnBackendServiceInput!]!) {
  addgcpCdnBackendService(input: $input, upsert: true) {
    numUids
  }
}`;
