export default `mutation($input: [AddgcpTargetHttpsProxyInput!]!) {
  addgcpTargetHttpsProxy(input: $input, upsert: true) {
    numUids
  }
}`;
