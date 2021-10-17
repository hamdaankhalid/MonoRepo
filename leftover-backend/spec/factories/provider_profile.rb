FactoryBot.define do
    factory :provider_profile, class: 'ProviderProfile' do
    end
    factory :food_bank_provider_profile_1, class: 'ProviderProfile' do
        name { 'Target Admin' }
        address { '123 columbus ohio 43215' }
        phone { '2246074296' }
        type_of { 'food_bank' }
        approved_by_super_admin { true }
        email { 'test_user_provider@gmail.com' }
        provider_employee_profile factory: :provider_employee_profile_1
    end

    factory :food_bank_provider_profile_2, class: 'ProviderProfile' do
        name { 'Target Admin' }
        address { '123 columbus ohio 43215' }
        phone { '2246074296' }
        type_of { 'food_bank' }
        approved_by_super_admin { true }
        email { 'test_user_provider_2@gmail.com' }
        provider_employee_profile factory: :provider_employee_profile_1
    end
end