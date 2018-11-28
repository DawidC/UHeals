# defines a new GraphQL type
Types::RideType = GraphQL::ObjectType.define do
    # this type is named `Ride`
    name 'Ride'
  
    # it has the following fields
    field :id, !types.ID
    field :from, !types.String
    field :to, !types.String
    field :date, !types.String
    field :current_seats, !types.Int
    field :max_seats, !types.Int
    field :client_ids, !types.String

    field :driver, -> { Types::UserType }, property: :user
    field :joins, -> {!types[Types::JoinType]}
  end