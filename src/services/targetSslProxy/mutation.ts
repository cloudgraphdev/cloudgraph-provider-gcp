export default `mutation($input: [AddgcpTargetSslProxyInput!]!) {
  addgcpTargetSslProxy(input: $input, upsert: true) {
    numUids
  }
}`;