require 'rails_helper'

describe 'Provider API', type: :request do
  describe 'POST /provider' do
    it 'takes params and creates Account, ProviderProfile, ProviderEmployee Profile' do
      post '/provider', :params => {
        :email => 'test_user@gmail.com', :password => '12345678', 
        :name => 'Target Admin' ,
         :address => '123 columbus ohio 43215',
          :phone => '2246074296',
           :type_of => 'food_bank'
      }

      expect(response).to have_http_status(:ok)
    end
    
    it 'returns error when param missing and rollsback the state of database' do
      post '/provider', :params => {
        :email => 'test_user@gmail.com', :password => '12345678', 
        :name => 'Target Admin' ,
          :phone => '2246074296'
      }

      expect(response).to have_http_status(:unprocessable_entity)
    end

  end
  
  describe 'GET /provider/:id' do
    let(:test_account) { FactoryBot.create(:food_bank_type_account_1) }
    let(:test_provider_profile) {
      FactoryBot.create(
        :provider_profile,
        name: 'Target Admin' ,
        address: '123 columbus ohio 43215',
        phone: '2246074296',
        type_of: 'food_bank',
        approved_by_super_admin: true,
        email: 'test_user_provider@gmail.com'
      )
    }
    let(:test_provider_employee_profile) {
      FactoryBot.create(
        :provider_employee_profile,
        first_name: 'Target' ,
        last_name: 'Admin',
        is_admin: true,
        account_id: test_account.id,
        provider_profile_id: test_provider_profile.id
      )
    } 
    it 'returns provider profile when valid token in header' do
      p test_provider_employee_profile
      post '/authenticate', :params => { :email => 'test_user_provider@gmail.com', :password => '12345678' }
      token = JSON.parse(response.body)["token"] 
      get "/provider/#{test_provider_profile.id}", params: {} ,headers: {:Authorization => "Bearer #{token}"}

      expect(response).to have_http_status(:ok)
    end

    it 'returns not found when non existent id is called' do
      p test_provider_employee_profile
      post '/authenticate', :params => { :email => 'test_user_provider@gmail.com', :password => '12345678' }
      token = JSON.parse(response.body)["token"] 
      get "/provider/100000", params: {} ,headers: {:Authorization => "Bearer #{token}"}

      expect(response).to have_http_status(:not_found)
    end

    it 'returns the requesting provider profiles when id is /me' do
      p test_provider_employee_profile
      post '/authenticate', :params => { :email => 'test_user_provider@gmail.com', :password => '12345678' }
      token = JSON.parse(response.body)["token"] 
      get "/provider/me", params: {} ,headers: {:Authorization => "Bearer #{token}"}
      expect(response).to have_http_status(:ok)
      
      expect(JSON.parse(response.body)["data"]["id"]).to equal(test_provider_profile.id)
    end

    it 'returns unauthorized when token not in header' do
      get "/provider/1", params: {} ,headers: {}
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'PATCH /provider/:id' do
    let(:test_account) { FactoryBot.create(:account, email: 'test_user_provider@gmail.com', password: '12345678', type_of:'food_bank' ) }
    let(:test_provider_profile) {
      FactoryBot.create(
        :provider_profile,
        name: 'Target Admin' ,
        address: '123 columbus ohio 43215',
        phone: '2246074296',
        type_of: 'food_bank',
        approved_by_super_admin: true,
        email: 'test_user_provider@gmail.com'
      )
    }
    let(:test_provider_employee_profile) {
      FactoryBot.create(
        :provider_employee_profile,
        first_name: 'Target' ,
        last_name: 'Admin',
        is_admin: true,
        account_id: test_account.id,
        provider_profile_id: test_provider_profile.id
      )
    }
    let(:test_account_2) { FactoryBot.create(:account, email: 'test_user_provider_2@gmail.com', password: '12345678', type_of:'food_bank' ) }

    let(:test_provider_profile_2) {
      FactoryBot.create(
        :provider_profile,
        name: 'Walmart Admin' ,
        address: '123 columbus ohio 43215',
        phone: '2246074296',
        type_of: 'food_bank',
        approved_by_super_admin: true,
        email: 'test_user_provide_2r@gmail.com'
      )
    }
    let(:test_provider_employee_profile_2) {
      FactoryBot.create(
        :provider_employee_profile,
        first_name: 'Walmart' ,
        last_name: 'Admin',
        is_admin: true,
        account_id: test_account_2.id,
        provider_profile_id: test_provider_profile_2.id
      )
    }

    it 'updates providerProfile when request is from the providerProfile owner admin' do
      p test_provider_employee_profile
      post '/authenticate', :params => { :email => 'test_user_provider@gmail.com', :password => '12345678' }
      token = JSON.parse(response.body)["token"] 
      patch "/provider/#{test_provider_profile.id}", params: { provider: {name: 'New Name'}} ,headers: {:Authorization => "Bearer #{token}"}
      expect(response).to have_http_status(:ok)
    end

    it 'returns unauthorized when non owner tries to update the provider profile' do
      p test_provider_employee_profile_2
      post '/authenticate', :params => { :email => 'test_user_provider_2@gmail.com', :password => '12345678' }
      token = JSON.parse(response.body)["token"] 
      patch "/provider/#{test_provider_profile.id}", params: { provider: {name: 'New Name'}} ,headers: {:Authorization => "Bearer #{token}"}
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'DELETE /provider/:id' do
    let(:test_account) { FactoryBot.create(:account, email: 'test_user_provider@gmail.com', password: '12345678', type_of:'food_bank' ) }
    let(:test_provider_profile) {
      FactoryBot.create(
        :provider_profile,
        name: 'Target Admin' ,
        address: '123 columbus ohio 43215',
        phone: '2246074296',
        type_of: 'food_bank',
        approved_by_super_admin: true,
        email: 'test_user_provider@gmail.com'
      )
    }
    let(:test_provider_employee_profile) {
      FactoryBot.create(
        :provider_employee_profile,
        first_name: 'Target' ,
        last_name: 'Admin',
        is_admin: true,
        account_id: test_account.id,
        provider_profile_id: test_provider_profile.id
      )
    }
    let(:test_account_2) { FactoryBot.create(:account, email: 'test_user_provider_2@gmail.com', password: '12345678', type_of:'food_bank' ) }

    let(:test_provider_profile_2) {
      FactoryBot.create(
        :provider_profile,
        name: 'Walmart Admin' ,
        address: '123 columbus ohio 43215',
        phone: '2246074296',
        type_of: 'food_bank',
        approved_by_super_admin: true,
        email: 'test_user_provide_2r@gmail.com'
      )
    }
    let(:test_provider_employee_profile_2) {
      FactoryBot.create(
        :provider_employee_profile,
        first_name: 'Walmart' ,
        last_name: 'Admin',
        is_admin: true,
        account_id: test_account_2.id,
        provider_profile_id: test_provider_profile_2.id
      )
    }

    it 'deletes providerProfile when request is from the providerProfile owner admin' do
      p test_provider_employee_profile
      post '/authenticate', :params => { :email => 'test_user_provider@gmail.com', :password => '12345678' }
      token = JSON.parse(response.body)["token"] 
      delete "/provider/#{test_provider_profile.id}", params: { provider: {name: 'New Name'}} ,headers: {:Authorization => "Bearer #{token}"}
      expect(response).to have_http_status(:no_content)
    end

    it 'returns unauthorized when non owner tries to delete the provider profile' do
      p test_provider_employee_profile_2
      post '/authenticate', :params => { :email => 'test_user_provider_2@gmail.com', :password => '12345678' }
      token = JSON.parse(response.body)["token"] 
      delete "/provider/#{test_provider_profile.id}", params: { provider: {name: 'New Name'}} ,headers: {:Authorization => "Bearer #{token}"}
      expect(response).to have_http_status(:unauthorized)
    end
  end
end

