export default `mutation($input: [AddgcpBigQueryDataTransferRunInput!]!) {
  addgcpBigQueryDataTransferRun(input: $input, upsert: true) {
    numUids
  }
}`;
