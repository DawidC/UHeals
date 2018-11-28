class Resolvers::CreateRide < GraphQL::Function
    # arguments passed as "args"
    argument :from, !types.String
    argument :to, !types.String
    argument :date, !types.String
    argument :current_seats, !types.Int
    argument :max_seats, !types.Int
    argument :client_ids, !types.String
    # return type from the mutation
    type Types::RideType
  
    # the mutation method
    # _obj - is parent object, which in this case is nil
    # args - are the arguments passed
    # _ctx - is the GraphQL context (which would be discussed later)
    def call(obj, args, ctx)
      
      puts("LALALALAL", ctx, ctx[:current_user],ctx[:session].values(),ctx[:session][:token])
      puts("args:", args, args[:token], args[:user])
      Ride.create!(
        #description: args[:description],
        #url: args[:url],
        from: args[:from],
        to: args[:to],
        date: args[:date],
        current_seats: args[:current_seats],
        max_seats: args[:max_seats],
        client_ids: args[:client_ids],
        user: ctx[:current_user]#AuthToken.user_from_token(ctx)#
      )
     rescue ActiveRecord::RecordInvalid => e
        # this would catch all validation errors and translate them to GraphQL::ExecutionError
        GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
    end
  end