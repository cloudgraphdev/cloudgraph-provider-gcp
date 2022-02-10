export default `mutation($input: [AddgcpDataprocAutoscalingPolicyInput!]!) {
  addgcpDataprocAutoscalingPolicy(input: $input, upsert: true) {
    numUids
  }
}`;
