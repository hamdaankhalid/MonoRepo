FactoryBot.define do
    factory :account, class: 'Account' do
    end

    factory :food_bank_type_account_1, class: 'Account' do
        email {'test_user_provider@gmail.com'}
        password {'12345678'}
        type_of {'food_bank' }
        # after(:create) do |account|
        #     account.provider_employee_profile ||= create(:provider_employee_profile_1)
        # end
    end

    factory :food_bank_type_account_2, class: 'Account' do
        email {'test_user_provider_2@gmail.com'}
        password {'12345678'}
        type_of {'food_bank' }
        # after(:create) do |account|
        #     account.provider_employee_profile ||= create(:provider_employee_profile_2)
        # end
    end
end