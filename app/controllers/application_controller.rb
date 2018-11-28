class ApplicationController < ActionController::API
    #protect_from_forgery with: :null_session
    # API POST REGUEST ALLOW CROSS DOMAIN
#   before_action :cor
#   def cor
#     headers["Access-Control-Allow-Origin"]  = "*"
#     headers["Access-Control-Allow-Methods"] = %w{GET POST PUT DELETE}.join(",")
#     headers["Access-Control-Allow-Headers"] = %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(",")
#     head(:ok) if request.request_method == "OPTIONS"
#   end
    
   
end
