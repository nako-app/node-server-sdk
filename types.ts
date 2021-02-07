type ActivityType = 'user ' | 'system'

type ActivityResultStatus = 'error' | 'success'

type ActivityStateStatus = 'scheduled' | 'in_progress' | 'completed'

export interface ActivityActor {
  type?: ActivityType
  id: String
  firstName: String
  lastName: String
  isPrimary?: boolean
}

export interface ActivityResource {
  id: String
  name?: String
}

export interface ActivityResult {
  status: ActivityResultStatus
  details?: Map<String, Object>
}

export interface ActivityState {
  status: ActivityStateStatus
  details?: Map<String, Object>
}

export interface Activity {
  actors: ActivityActor[]
  happenedAt: Date
  metadata?: Map<String, Object>
  operation: String
  resources: ActivityResource[]
  result?: ActivityResult
  state?: ActivityState
}
