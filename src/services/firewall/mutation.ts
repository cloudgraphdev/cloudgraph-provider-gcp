export default `mutation($input: [AddgcpFirewallInput!]!) {
  addgcpFirewall(input: $input, upsert: true) {
    numUids
  }
}`;
