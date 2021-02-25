import fetch from 'node-fetch'
import {
  Activity,
  ActivityResult,
  ActivityState,
  ActivityUpdate,
  CreatedActivity,
  Token
} from './types'

export class NakoIngestApi {
  static apiKey
  static nakoApiUrl = 'https://api.nako.co/v1/'

  static init(apiKey: String) {
    NakoIngestApi.apiKey = apiKey
    return new NakoIngestApi()
  }

  // TODO - add validation
  async createActivity(activity: Activity): Promise<CreatedActivity> {
    const response = await fetch(NakoIngestApi.nakoApiUrl + 'activities', {
      method: 'post',
      body: JSON.stringify({
        happened_at: activity.happenedAt,
        metadata: activity.metadata,
        operation: activity.operation,
        resources: activity.resources,
        actors: activity.actors.map(a => {
          return {
            id: a.id,
            type: a.type,
            first_name: a.firstName,
            last_name: a.lastName,
            is_primary: a.isPrimary
          }
        }),
        result: activity.result,
        state: activity.state
      }),
      headers: {
        Authorization: NakoIngestApi.apiKey
      }
    })

    // TODO - handle errors
    const json = await response.json()
    return json
  }

  async updateActivity(id: String, update: ActivityUpdate): Promise<CreatedActivity> {
    const response = await fetch(NakoIngestApi.nakoApiUrl + 'activities/' + id, {
      method: 'patch',
      body: JSON.stringify({
        result: update.result,
        state: update.state
      }),
      headers: {
        Authorization: NakoIngestApi.apiKey
      }
    })

    // TODO - handle errors
    const json = await response.json()
    return json
  }

  async getToken(): Promise<Token> {
    const response = await fetch(NakoIngestApi.nakoApiUrl + 'token', {
      headers: {
        Authorization: NakoIngestApi.apiKey
      }
    })

    // TODO - handle errors
    const json = await response.json()
    return json
  }
}
