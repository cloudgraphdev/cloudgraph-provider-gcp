export default `mutation($input: [AddgcpDataprocJobInput!]!) {
  addgcpDataprocJob(input: $input, upsert: true) {
    numUids
  }
}`;
