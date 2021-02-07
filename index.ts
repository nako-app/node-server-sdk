import fetch from 'node-fetch'
import { Activity } from './types'

export class NakoIngestApi {
  static apiKey

  static init(apiKey: String) {
    NakoIngestApi.apiKey = apiKey
    return new NakoIngestApi()
  }

  // TODO - add validation
  async createActivity(activity: Activity) {
    const response = await fetch('https://api.nako.co/v1/activities', {
      method: 'post',
      body: JSON.stringify({
        happened_at: activity.happenedAt,
        metadata: activity.metadata,
        operation: activity.operation,
        resources: activity.resources,
        actor: activity.actors.map(a => { return {
          id: a.id,
          type: a.type,
          first_name: a.firstName,
          last_name: a.lastName,
          is_primary: a.isPrimary
        }}),
        result: activity.result
      }),
      headers: {
        'x-api-key': NakoIngestApi.apiKey
      }
    })

    // TODO - handle errors
    const json = await response.json()

    return json
  }
}
