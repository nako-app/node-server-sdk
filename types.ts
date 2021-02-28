export enum ActivityActorType {
  System = 'system',
  User = 'user'
}

export enum ActivityResultStatus {
  Error = 'error',
  Success = 'success'
}

export enum ActivityStateStatus {
  Scheduled = 'scheduled',
  InProgress = 'in_progress',
  Completed = 'completed'
}

export interface ActivityActor {
  type?: ActivityActorType
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

export interface ActivityUpdate {
  result?: ActivityResult
  state?: ActivityState
}

export interface CreatedActivity extends Activity {
  createdAt: Date
  id: String
}

export interface Token {
  token: string
}
