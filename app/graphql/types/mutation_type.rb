Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createJoin, function: Resolvers::CreateJoin.new
  field :createRide, function: Resolvers::CreateRide.new
  field :createUser, function: Resolvers::CreateUser.new
  field :signinUser, function: Resolvers::SignInUser.new
end
