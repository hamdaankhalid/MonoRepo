require 'rails_helper'

describe 'Authentication api', type: :request do
  before(:each) do
    FactoryBot.create(:food_bank_type_account_1)
  end
  
  describe 'POST /authenticate' do
    it 'takes credentials and returns token if email and password correct in database' do
      post '/authenticate', :params => { :email => 'test_user_provider@gmail.com', :password => '12345678' }
      expect(response).to have_http_status(:created)
    end

    it 'returns unauthorized when password is incorrect' do
      post '/authenticate', :params => { :email => 'test_user_provider@gmail.com', :password => '123' }
      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns not found when non existent account' do
      post '/authenticate', :params => { :email => 'test_user@gmail.com', :password => '123' }
      expect(response).to have_http_status(:not_found)
    end

    it 'returns unprocessable entity if a param is missing' do
      post '/authenticate', :params => {}
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
  
  describe 'GET /identity' do
    it 'returns account type of when valid token in header' do
      post '/authenticate', :params => { :email => 'test_user_provider@gmail.com', :password => '12345678' }
      token = JSON.parse(response.body)["token"]
      get '/identity', params: {} ,headers: {:Authorization => "Bearer #{token}"}
      expect(response).to have_http_status(:ok)
    end

    it 'returns unauthorized type of when in-valid token in header' do
      get '/identity'
      expect(response).to have_http_status(:unauthorized)
    end

    it 'returns unauthorized type of when token not in header' do
      get '/identity'
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
