require 'rails_helper'

describe ProviderController, type: :request do
  describe '.create' do
    it 'takes params and creates Account, ProviderProfile, ProviderEmployee Profile' do
      puts 'ran test'
    end
    
    it 'returns error when param missing and rollsback the state of database' do
      puts 'ran test'
    end

    it 'returns unauthorized when non existent account' do
      puts 'ran test'
    end
  end
  
  describe '.show' do
    it 'returns provider profile when valid token in header' do
      puts 'ran test'
    end

    it 'returns unauthorized when in-valid token in header' do
      puts 'ran test'
    end

    it 'returns unauthorized when token not in header' do
      puts 'ran test'
    end
  end
end

