type ActivityType = 'user ' | 'system'

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

export interface Activity {
  happenedAt: Date
  operation: String
  resource: ActivityResource
  actor: ActivityActor
}
