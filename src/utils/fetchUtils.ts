import { Service } from '@google-cloud/common'
import fetch from 'node-fetch'
import isEmpty from 'lodash/isEmpty'

export const listData = async ({
    service,
    apiUri,
    dataFieldName,
    method = 'GET',
  }: {
  service: Service,
  apiUri: string,
  dataFieldName?: string,
  method?: string,
}): Promise<any[]> => {
  const accessToken = await service.authClient.getAccessToken()

  const fullData = []
  let resp = await fetch(apiUri, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  let respJson = await resp.json()
  let pageToken = respJson.nextPageToken
  const payload = dataFieldName ? respJson[dataFieldName] : [respJson]

  if (isEmpty(respJson.error) && payload) {
    fullData.push(...payload)

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
      fullData.push(...payload)
    }
  }

  return fullData
}

// TODO for future get data api call
export const getData = async (service: Service, apiUri: string): Promise<any> => {
  return undefined
}
