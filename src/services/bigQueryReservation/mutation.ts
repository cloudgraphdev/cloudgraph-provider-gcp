export default `mutation($input: [AddgcpBigQueryReservationInput!]!) {
  addgcpBigQueryReservation(input: $input, upsert: true) {
    numUids
  }
}`;
