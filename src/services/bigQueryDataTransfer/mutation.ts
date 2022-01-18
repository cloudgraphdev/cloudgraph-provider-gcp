export default `mutation($input: [AddgcpBigQueryDataTransferInput!]!) {
  addgcpBigQueryDataTransfer(input: $input, upsert: true) {
    numUids
  }
}`;
