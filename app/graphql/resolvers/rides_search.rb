require 'search_object/plugin/graphql'

class Resolvers::RidesSearch
    
    # include SearchObject for GraphQL
  include SearchObject.module(:graphql)

  # scope is starting point for search
  scope { Ride.all }

  # return type
  type !types[Types::RideType]

  # inline input type definition for the advance filter
  RideFilter = GraphQL::InputObjectType.define do
    name 'RideFilter'

    argument :OR, -> { types[RideFilter] }
    #argument :description_contains, types.String
    #argument :url_contains, types.String
    argument :from_contains, types.String
    argument :to_contains, types.String
    argument :date_contains, types.String
  end

  # when "filter" is passed "apply_filter" would be called to narrow the scope
  option :filter, type: RideFilter, with: :apply_filter
  option :first, type: types.Int, with: :apply_first
  option :skip, type: types.Int, with: :apply_skip

  def apply_first(scope, value)
    scope.limit(value)
  end

  def apply_skip(scope, value)
    scope.offset(value)
  end

  # apply_filter recursively loops through "OR" branches
  def apply_filter(scope, value)
    # normalize filters from nested OR structure, to flat scope list
    branches = normalize_filters(value).reduce { |a, b| a.or(b) }
    scope.merge branches
  end

  def normalize_filters(value, branches = [])
    # add like SQL conditions
    scope = Ride.all
    #scope = scope.where('description LIKE ?', "%#{value['description_contains']}%") if value['description_contains']
    #scope = scope.where('url LIKE ?', "%#{value['url_contains']}%") if value['url_contains']
    scope = scope.where('from LIKE ?', "%#{value['from_contains']}%") if value['from_contains']
    scope = scope.where('to LIKE ?', "%#{value['to_contains']}%") if value['to_contains']
    scope = scope.where('date LIKE ?', "%#{value['date_contains']}%") if value['date_contains']
    branches << scope

    # continue to normalize down
    value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?

    branches
  end
end
