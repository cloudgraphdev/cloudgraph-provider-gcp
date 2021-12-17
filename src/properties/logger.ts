export default {
  platform: 'Platform: GCP',
  fetchingResourceData: (resource: string) => `Fetching ${resource} data...`,
  doneFetchingResourceData: (resource: string, num: number) =>
    `✅ Done fetching ${resource} data in ${num}s ✅`,
  lookingForResourcesAddToRegion: (region: string, resource: string) =>
    `Looking for ${resource} to add to Region ${region}...`,
  addingServiceToRegion: (region: string, resource: string, num: number) =>
    `Adding ${num} ${resource} to Region ${region}`,
  lookingForResourcesAddToProject: (resource: string) =>
    `Looking for ${resource} to add to the Project...`,
  addingServiceToProject: (resource: string, num: number) =>
    `Adding ${num} ${resource} to the Project`,
  /**
  * VPC
  */
  foundVpcs: (num: number): string => `Found ${num} VPCs`,
  /**
  * Projects
  */
  foundProjects: (num: number): string => `Found ${num} Projects`,
  /**
  * IAM
  */
  foundPolicies: (num: number): string => `Found ${num} IAM Policies`
}
