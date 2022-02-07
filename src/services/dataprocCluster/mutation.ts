export default `mutation($input: [AddgcpDataprocClusterInput!]!) {
  addgcpDataprocCluster(input: $input, upsert: true) {
    numUids
  }
}`;
