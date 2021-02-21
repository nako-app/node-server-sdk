import { NakoIngestApi } from '../index';
import { expect } from 'chai'
import 'mocha'
import { ActivityActorType, ActivityResultStatus, ActivityStateStatus } from '../types';

describe('SDK functional tests', () => {
  it('can get activities', async () => {
    
    const sdk = NakoIngestApi.init(process.env['API_KEY'] ?? '')

    console.log(process.env.API_KEY)

    const response = await sdk.createActivity({
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
          lastName: 'someLastName',
        }
      ],
      result: {
        status: ActivityResultStatus.Success
      },
      state: {
        status: ActivityStateStatus.Completed
      },
      metadata: new Map<string, string>([
        ['customer_organization_id', 'cdefg'],
        ['version', '2']
      ])
    })

    expect(response).to.be.not.null;
    expect(response.operation).to.be.not.empty;  
  });
});