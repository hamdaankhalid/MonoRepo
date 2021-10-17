class ApplicationController < ActionController::Base
  include ::ActionController::Cookies

  def authenticate_user
    auth_header = request.headers['Authorization']

    p auth_header
    if auth_header
        account_id = AuthenticationTokenService.decode(auth_header.split(' ')[1])
        puts "account id of user #{account_id.to_i}"
        @account = Account.find(account_id.to_i)
    else
      head :unauthorized
    end
  rescue ActiveRecord::RecordNotFound, JWT::DecodeError => e
    puts "Error: #{e.inspect}"
    head :unauthorized
  end

  def parameter_missing(e)
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def record_not_found
    head :not_found
  end

end
