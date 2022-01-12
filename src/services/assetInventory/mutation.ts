export default `mutation($input: [AddgcpAssetInput!]!) {
  addgcpAsset(input: $input, upsert: true) {
    numUids
  }
}`;
