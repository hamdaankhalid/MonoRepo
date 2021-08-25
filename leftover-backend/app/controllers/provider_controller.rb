class ProviderController < ApplicationController

  rescue_from ActionController::ParameterMissing, with: :parameter_missing

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user, only:[ :show, :update, :destroy ]

  def create
    # Creates an account, Provider profile, and Provider Employee of type admin profile
      employee_profile = ProviderEmployeeProfile.create({
          :is_admin => true,
          :first_name => params.require[:first_name],
          :last_name => params.require[:last_name],
          :account_attributes => {
              :email => params.require[:email],
              :password => params.require[:password],
              :type_of => params.require[:type_of]
              },
          :provider_profile_attributes => {
              :name => params.require[:name],
              :type_of => params.require[:type_of],
              :address => params.require[:address],
              :email => params.require[:email],
              :phone => params.require[:phone],
              :approved_by_super_admin => false
      }})
  
      if employee_profile.save
          render json: {
            data: {
              account_id: employee_profile.account_id,
              employee_profile_id: employee_profile.id,
              provider_profile_id: employee_profile.provider_profile_id
            },
            status: :created
          }
      else
          render json: {
            errors: employee_profile.errors.full_messages
          }, status: :unprocessable_entity
      end
  end

  def show
    puts "params"
    puts params
    provider = ProviderProfile.find(params[:id])
    if provider
      render json: { data: provider },  status: :ok
    else
      head :not_found
    end
  end

  # only the account for providerEmployeeProfile with admin type as true can destroy themselves
  def destroy
    provider_employee = ProviderEmployeeProfile.find_by(account_id: @account.id);
    # check if the param id is the providerProfile id associated with provider employee id
    to_delete_profile_id = params[:id]
    if provider_employee.is_admin & provider_employee.provider_profile_id == to_delete_profile_id
      p params
      provider = ProviderProfile.find(params[:id])
      render json:{ data: "Deleted" }, status: :no_content
    else
      head :unauthorized
    end
  end

  # only the account for provider profile with admin type as true can update themselves
  def update
    account_is_admin = ProviderEmployeeProfile.find_by(account_id: @account.id).is_admin;
    if account_is_admin
      p params
      provider = ProviderProfile.find(params[:id])
      render json:{ data: "UPDATED" }, status: :ok
    else
      head :unauthorized
    end
  end

  private

  def parameter_missing(e)
    render json: { error: e.message }, status: :unprocessable_entity
  end
end
