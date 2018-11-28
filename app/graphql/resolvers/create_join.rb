class Resolvers::CreateJoin < GraphQL::Function
    argument :rideId, types.ID
  
    type Types::JoinType
  
    def call(_obj, args, ctx)
      Join.create!(
        ride: Ride.find_by(id: args[:rideId]),
        user: ctx[:current_user]
      )
    end
  end