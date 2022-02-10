export default `mutation($input: [AddgcpDataprocWorkflowTemplateInput!]!) {
  addgcpDataprocWorkflowTemplate(input: $input, upsert: true) {
    numUids
  }
}`;
