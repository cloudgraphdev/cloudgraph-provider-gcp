export default `mutation($input: [AddgcpBigQueryReservationCapacityCommitmentInput!]!) {
  addgcpBigQueryReservationCapacityCommitment(input: $input, upsert: true) {
    numUids
  }
}`;
