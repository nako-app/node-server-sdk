import { NakoIngestApi } from '../index'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Activity, ActivityActorType, ActivityResultStatus, ActivityStateStatus } from '../types'

const anActivity: Activity = {
  happenedAt: new Date(),
  operation: 'CREATE',
  resources: [
    {
      id: 'abcde',
      name: 'someResource'
    }
  ],
  actors: [
    {
      id: 'bcdef',
      firstName: 'someFirstName',
      lastName: 'someLastName'
    }
  ],
  state: {
    status: ActivityStateStatus.InProgress,
    details: new Map<string, string>([['progress', 'half']])
  },
  metadata: new Map<string, string>([
    ['customer_organization_id', 'cdefg'],
    ['version', '2']
  ])
}

describe('SDK functional tests', () => {
  it('Can create an activity', async () => {
    const sdk = NakoIngestApi.init(process.env['NAKO_API_KEY'] ?? '')

    const response = await sdk.createActivity(anActivity)

    expect(response.id).to.be.not.undefined
  })
  it('Can update an activity', async () => {
    const sdk = NakoIngestApi.init(process.env['NAKO_API_KEY'] ?? '')

    const createdActivityResponse = await sdk.createActivity(anActivity)

    expect(createdActivityResponse?.state?.status).to.equal(ActivityStateStatus.InProgress)
    expect(createdActivityResponse?.result?.status).to.be.undefined

    const response = await sdk.updateActivity(createdActivityResponse.id, {
      state: { status: ActivityStateStatus.Completed },
      result: { status: ActivityResultStatus.Success }
    })

    expect(response?.state?.status).to.equal(ActivityStateStatus.Completed)
    expect(response?.result?.status).to.equal(ActivityResultStatus.Success)
  })
})
