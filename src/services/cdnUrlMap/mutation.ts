export default `mutation($input: [AddgcpCdnUrlMapInput!]!) {
  addgcpCdnUrlMap(input: $input, upsert: true) {
    numUids
  }
}`;
