export default `mutation($input: [AddgcpDnsManagedZoneInput!]!) {
  addgcpDnsManagedZone(input: $input, upsert: true) {
    numUids
  }
}`;
