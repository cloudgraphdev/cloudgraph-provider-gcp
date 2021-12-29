import { ServiceConnection } from '@cloudgraph/sdk'

// const findServiceInstancesWithTag = (tag: any, service: any): any => {
//   const { id } = tag
//   return service.filter(({ Tags }) => {
//     for (const [key, value] of Object.entries(Tags)) {
//       if (id === `${key}:${value}`) {
//         return true
//       }
//     }
//     return false
//   })
// }

export default ({
  service: tag,
  data,
}: {
  service: any
  data: Array<{ name: string; data: { [property: string]: any[] } }>
}): {
  [property: string]: ServiceConnection[]
} => {
  const connections: ServiceConnection[] = []
  // TODO old implementation. need a generic method to replace this
  // for (const region of regions) {
  //   /**
  //    * Find related KMS
  //    */
  //   const kms: {
  //     name: string
  //     data: { [property: string]: any[] }
  //   } = data.find(({ name }) => name === services.kms)
  //   if (kms?.data?.[region]) {
  //     const dataAtRegion: any = findServiceInstancesWithTag(
  //       tag,
  //       kms.data[region],
  //     )

  //     if (!isEmpty(dataAtRegion)) {
  //       for (const kmsKeyRing of dataAtRegion) {
  //         const { name } = kmsKeyRing
  //         connections.push({
  //           id: name,
  //           resourceType: services.kms,
  //           relation: 'child',
  //           field: 'kms',
  //         })
  //       }
  //     }
  //   }
  // }
  
  const tagResult = {
    [tag.id]: connections,
  }
  return tagResult
}
