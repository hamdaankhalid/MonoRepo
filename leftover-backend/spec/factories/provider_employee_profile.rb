FactoryBot.define do
    factory :provider_employee_profile, class: 'ProviderEmployeeProfile' do
    end

    factory :provider_employee_profile_1, class: 'ProviderEmployeeProfile' do
        first_name { 'Target' }
        last_name { 'Admin' }
        is_admin { true }
        account factory: :food_bank_type_account_1
        provider_profile factory: :food_bank_provider_profile_1
    end

    factory :provider_employee_profile_2, class: 'ProviderEmployeeProfile' do
        first_name { 'Target' }
        last_name { 'Admin' }
        is_admin { true }
        account factory: :food_bank_type_account_2
        provider_profile factory: :food_bank_provider_profile_2
    end
end