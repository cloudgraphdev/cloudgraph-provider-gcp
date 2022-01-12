export default `mutation($input: [AddgcpLogMetricInput!]!) {
  addgcpLogMetric(input: $input, upsert: true) {
    numUids
  }
}`;
