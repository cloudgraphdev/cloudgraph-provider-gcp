export default `mutation($input: [AddgcpBigQueryDatasetInput!]!) {
  addgcpBigQueryDataset(input: $input, upsert: true) {
    numUids
  }
}`;
