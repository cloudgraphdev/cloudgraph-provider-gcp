export default `mutation($input: [AddgcpFolderInput!]!) {
  addgcpFolder(input: $input, upsert: true) {
    numUids
  }
}`;
