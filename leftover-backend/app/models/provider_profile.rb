class ProviderProfile < ApplicationRecord
    # a single providerProfile can be associated to many provider employee profiles
    has_many :provider_employee_profile, dependent: :destroy

    has_many :item, dependent: :destroy
    # name, type_of, address, email, phone, approved_by_admin cannot be nil
    # address, email, phone cannot be repeated
end
