Types::UserType = GraphQL::ObjectType.define do
  name 'User'

  field :id, !types.ID
  field :name, !types.String
  field :pesel, !types.String
  field :email, !types.String
  field :role, !types.Int
  field :phonenumber, types.String

  field :joins, -> { !types[Types::JoinType] }
end
