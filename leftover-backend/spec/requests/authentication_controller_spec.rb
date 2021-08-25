require 'rails_helper'

describe AuthenticationController, type: :request do
  describe '.create' do
    it 'takes credentials and returns token' do
      puts 'ran test'
    end
    
    it 'returns unauthorized when password is incorrect' do
      puts 'ran test'
    end

    it 'returns unauthorized when non existent account' do
      puts 'ran test'
    end
  end
  
  describe '.identity' do
    it 'returns account type of when valid token in header' do
      puts 'ran test'
    end

    it 'returns unauthoirzed type of when in-valid token in header' do
      puts 'ran test'
    end

    it 'returns unauthoirzed type of when token not in header' do
      puts 'ran test'
    end
  end
end
