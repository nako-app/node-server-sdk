type ActivityType = 'user ' | 'system'

type ActivityResultStatus = 'error' | 'success'

export interface ActivityActor {
  type?: ActivityType
  id: String
  firstName: String
  lastName: String
}

export interface ActivityResource {
  id: String
  name?: String
}

export interface ActivityResult {
  status: ActivityResultStatus
  details?: Map<String, Object>
}

export interface Activity {
  happenedAt: Date
  operation: String
  resource: ActivityResource
  actor: ActivityActor
  result?: ActivityResult
}
