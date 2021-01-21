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
        operation: activity.operation,
        resource: activity.resource,
        actor: {
          id: activity.actor.id,
          type: activity.actor.type,
          first_name: activity.actor.firstName,
          last_name: activity.actor.lastName
        }
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
