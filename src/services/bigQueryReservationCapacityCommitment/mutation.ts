export default `mutation($input: [AddgcpBigQueryReservationCapacityInput!]!) {
  addgcpBigQueryReservationCapacity(input: $input, upsert: true) {
    numUids
  }
}`;
