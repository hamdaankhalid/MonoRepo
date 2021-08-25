class ItemController < ApplicationController
    rescue_from ActionController::ParameterMissing, with: :parameter_missing

    skip_before_action :verify_authenticity_token
    before_action :authenticate_user

    # any authenitcated can get list of items
    def get
        puts "SHOWS A LIST"
    end

    # any authenticated can get particular item
    def show
        item = Item.find(params[:id])
        if item
        render json: { data: item },  status: :ok
        else
            head :not_found
        end
    end

    # providerProfileEmployee can create an item
    def create
        puts "CREATED ITEM BY #{@account}"
    end

    # providerProfileEmployee can update their item
    def update
        puts "UPDATED ITEM BY #{@account}"
    end

    # providerProfileEmployee can delete their item
    def destroy
        puts "DESTROYED ITEM BY #{@account}"
    end

end
