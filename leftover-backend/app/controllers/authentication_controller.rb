class AuthenticationController < ApplicationController
    class AuthenticationError < StandardError; end
    skip_before_action :verify_authenticity_token
    rescue_from ActionController::ParameterMissing, with: :parameter_missing
    rescue_from AuthenticationError, with: :handle_unauthenticated

    before_action :authenticate_user, only:[ :identity ]

    def create
        p params.require(:password).inspect
        account = Account.find_by(email: params.require(:email))
        if account
            raise AuthenticationError unless account.authenticate(params.require(:password))
            token = AuthenticationTokenService.call(account.id)
            cookies[:jwt] = {value:  token, httponly: true}
            render json: { token: token, type_of: account.type_of }, status: :created
        else
            head :not_found
        end
    end

    def identity
        render json: { type_of: @account.type_of }
    end

    private

    def parameter_missing(e)
        render json: { error: e.message }, status: :unprocessable_entity
    end

    def handle_unauthenticated(e)
        head :unauthorized
    end
end
