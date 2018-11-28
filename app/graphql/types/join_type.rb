Types::JoinType = GraphQL::ObjectType.define do
    name 'Join'
  
    field :id, types.ID
    field :user, -> { Types::UserType }
    field :ride, -> { Types::RideType }
  end