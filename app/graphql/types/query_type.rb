Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
 
  # field :allRides, !types[Types::RideType] do
  #   # resolve would be called in order to fetch data for that field
  #   resolve -> (obj, args, ctx) { Ride.all }
  # end
  field :allRides, function: Resolvers::RidesSearch
end
