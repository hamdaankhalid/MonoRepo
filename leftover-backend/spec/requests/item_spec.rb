require 'rails_helper'

describe 'Item api', type: :request do
  
  describe "GET /item/:id" do
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
    it "returns item if authenticated user" do
      
    end

    it "returns unauthorized if un-authenticated user" do
      
    end
  end

  describe "POST /item" do
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

  it "posts item to database for auth users" do

  end
    
  end

  describe "DELETE /item" do
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
    it "deletes item from database for auth users" do

    end

  end

  describe "UPDATE /item" do
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
    it "deletes item from database for auth users" do

    end
    
  end
end
