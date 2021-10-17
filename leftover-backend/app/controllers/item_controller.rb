class ItemController < ApplicationController
    rescue_from ActionController::ParameterMissing, with: :parameter_missing
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found


    skip_before_action :verify_authenticity_token
    before_action :authenticate_user, only: [:create, :get, :show, :unpublish, :update]

    def index
        provider_profile_id = params.require(:providerProfile)
    
        items = Item.where(:provider_profile_id => provider_profile_id).all
        render json: {
            data: items
        },
          status: :ok
    end

    def show
        item = Item.find(params.require(:id))
        if item
            render json: { data: item },  status: :ok
        else
            head :not_found
        end
    end

    def create
        provider_profile = @account.provider_employee_profile.provider_profile
        created_by = @account.provider_employee_profile

        food_bank_item = Item.new(
            {
                :name => params.require(:name),
                :description => params.require(:description),
                :units => params.require(:units),
                :unit_of_measurement => params.require(:unit_of_measurement),
                :amount_restriction => params.require(:amount_restriction),
                :item_expiration => params.require(:item_expiration),
                :published => true,
                :provider_profile_id => provider_profile.id,
                :created_by_id => created_by.id
            }
        )

        if food_bank_item.save
            render json: {
                data: food_bank_item
            },
              status: :created
        else
            p food_bank_item.errors.full_messages
            render json: {
                errors: food_bank_item.errors.full_messages
              }, status: :unprocessable_entity
        end
    end

    def update
        provider_employee = ProviderEmployeeProfile.find_by(account_id: @account.id)
        provider_profile = provider_employee.provider_profile
        to_update_item = Item.find(params.require(:id))
        if to_update_item.provider_profile == provider_profile

            to_update_item.update(item_update_params)
            to_update_item.update({
                :updated_by_id => provider_employee.id
            })
            
            render json:{ data: to_update_item }, status: :ok
        else
            head :unauthorized
        end
    end

    def unpublish
        provider_employee = ProviderEmployeeProfile.find_by(account_id: @account.id)
        provider_profile = provider_employee.provider_profile
        to_update_item = Item.find(params.require(:itemId))
        p provider_profile
        p to_update_item
        if to_update_item.provider_profile == provider_profile
            to_update_item.update({
                :published => false,
                :unpublished_by_id => provider_employee.id
            })

            render json:{ data: "Unpublished" }, status: :no_content
        else
            head :unauthorized
        end
    end

    private

    def item_update_params
        params.require(:item).permit(
            :name,
            :description,
            :units,
            :unit_of_measurement,
            :amount_restriction,
            :item_expiration
            )
    end

end
