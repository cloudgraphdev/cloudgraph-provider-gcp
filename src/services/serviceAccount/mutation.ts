export default `mutation($input: [AddgcpServiceAccountInput!]!) {
  addgcpServiceAccount(input: $input, upsert: true) {
    numUids
  }
}`
