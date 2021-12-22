import { Service } from '@google-cloud/common'
import fetch from 'node-fetch'

export const listData = async ({
    service,
    apiUri,
    dataFieldName,
  }: {
  service: Service,
  apiUri: string,
  dataFieldName: string,
}): Promise<any[]> => {
  const accessToken = await service.authClient.getAccessToken()

  const fullData = []
  let resp = await fetch(apiUri, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })

  let respJson = await resp.json()
  let pageToken = respJson.nextPageToken
  fullData.push(...respJson[dataFieldName])

  while (pageToken) {
    resp = await fetch(`${apiUri}?pageToken=${pageToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    respJson = await resp.json()
    pageToken = respJson.nextPageToken
    fullData.push(...respJson[dataFieldName])
  }
  return fullData
}

// TODO for future get data api call
export const getData = async (service: Service, apiUri: string): Promise<any> => {
  return undefined
}
