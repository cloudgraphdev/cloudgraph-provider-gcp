export default `mutation($input: [AddgcpSqlInstanceInput!]!) {
  addgcpSqlInstance(input: $input, upsert: true) {
    numUids
  }
}`;
