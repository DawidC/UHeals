class Resolvers::CreateUser < GraphQL::Function
    AuthProviderInput = GraphQL::InputObjectType.define do
      name 'AuthProviderSignupData'
  
      argument :email, Types::AuthProviderEmailInput
    end
  
    argument :name, !types.String
    argument :pesel, !types.String
    argument :role, !types.String
    argument :authProvider, !AuthProviderInput
    argument :phonenumber, types.String
  
    type Types::UserType
  
    def call(_obj, args, _ctx)
      User.create!(
        name: args[:name],
        pesel: args[:pesel],
        role: args[:role],
        email: args[:authProvider][:email][:email],
        password: args[:authProvider][:email][:password],
        phonenumber: args[:phonenumber]
      )
    end
  end
  