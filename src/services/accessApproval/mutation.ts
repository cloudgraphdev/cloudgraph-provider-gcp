export default `mutation($input: [AddgcpAccessApprovalInput!]!) {
  addgcpAccessApproval(input: $input, upsert: true) {
    numUids
  }
}`;
