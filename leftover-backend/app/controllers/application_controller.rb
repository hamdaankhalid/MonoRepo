class ApplicationController < ActionController::Base
  include ::ActionController::Cookies

  @account

  def authenticate_user
    auth_header = request.headers['Authorization']
    if auth_header
        account_id = AuthenticationTokenService.decode(auth_header.split(' ')[1])
        puts "account id of user #{account_id}"
        @account = Account.find(account_id)
    else
      head :unauthorized
    end
  rescue ActiveRecord::RecordNotFound, JWT::DecodeError => e
    puts "Error: #{e.inspect}"
    head :unauthorized
  end
end
