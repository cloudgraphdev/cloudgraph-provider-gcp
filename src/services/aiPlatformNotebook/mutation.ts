export default `mutation($input: [AddgcpAiPlatformNotebookInput!]!) {
  addgcpAiPlatformNotebook(input: $input, upsert: true) {
    numUids
  }
}`;
