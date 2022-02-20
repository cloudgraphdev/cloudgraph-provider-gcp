export default `mutation($input: [AddgcpFirestoreDatabaseInput!]!) {
  addgcpFirestoreDatabase(input: $input, upsert: true) {
    numUids
  }
}`;
