class ProviderController < ApplicationController

  rescue_from ActionController::ParameterMissing, with: :parameter_missing
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  skip_before_action :verify_authenticity_token
  before_action :authenticate_user, only:[ :show, :update, :destroy ]

  def create
    # Creates an account, Provider profile, and Provider Employee of type admin profile
    employee_profile = ProviderEmployeeProfile.create({
        :is_admin => true,
        :first_name => params.require(:name),
        :last_name => "Admin",
        :account_attributes => {
            :email => params.require(:email),
            :password => params.require(:password),
            :type_of => params.require(:type_of)
            },
        :provider_profile_attributes => {
            :name => params.require(:name),
            :type_of => params.require(:type_of),
            :address => params.require(:address),
            :email => params.require(:email),
            :phone => params.require(:phone),
            :approved_by_super_admin => false
    }})

    if employee_profile.save
        render json: {
          data: {
            account_id: employee_profile.account_id,
            employee_profile_id: employee_profile.id,
            provider_profile_id: employee_profile.provider_profile_id
          },
          status: :ok
        }
    else
        render json: {
          errors: employee_profile.errors.full_messages
        }, status: :unprocessable_entity
    end
  end

  def show
    p 'fuvkssss'
    p @account.provider_employee_profile
    provider = params.require(:id) != 'me' ? ProviderProfile.find(params.require(:id)) : @account.provider_employee_profile.provider_profile
    if provider
      render json: { data: provider },  status: :ok
    else
      head :not_found
    end
  end

  # only the account for providerEmployeeProfile with admin type as true can destroy themselves
  def destroy
    provider_employee = ProviderEmployeeProfile.find_by(account_id: @account.id);
    to_delete_profile_id = params[:id]
    if provider_employee.is_admin and provider_employee.provider_profile_id == to_delete_profile_id.to_i
      provider = ProviderProfile.find(params[:id])
      provider.destroy
      if provider.destroyed?
        render json:{ data: "Deleted" }, status: :no_content
      else
        render json:{ data: "Error occurred not deleted" }, status: :internal_server_error
      end
    else
      head :unauthorized
    end
  end

  # only the account for provider profile with admin type as true can update themselves
  def update
    provider_account = ProviderEmployeeProfile.find_by(account_id: @account.id);
    to_update_profile_id = params[:id]
    if provider_account.is_admin and provider_account.provider_profile_id == to_update_profile_id.to_i
      provider = ProviderProfile.find(to_update_profile_id)
      p provider_profile_params
      provider.update(provider_profile_params)
      render json:{ data: provider }, status: :ok
    else
      head :unauthorized
    end
  end

  private

  def provider_profile_params
    params.require(:provider).permit(:name, :type_of, :address, :email, :phone)
  end
end
