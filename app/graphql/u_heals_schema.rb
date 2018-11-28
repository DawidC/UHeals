UHealsSchema = GraphQL::Schema.define do
  mutation(Types::MutationType)
  query(Types::QueryType)

  #require 'types/mutation_type'
end
