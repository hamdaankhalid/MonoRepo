class ProviderEmployeeProfile < ApplicationRecord
    # An account can have an association to ProviderEmployee Profile
    # one provider can have many ProviderEmployeeProfiles
    belongs_to :account, foreign_key: 'account_id', dependent: :destroy
    belongs_to :provider_profile, foreign_key: 'provider_profile_id'

    accepts_nested_attributes_for :account
    accepts_nested_attributes_for :provider_profile

    has_many :item

    # is_admin, first_name, last_name cannot be nil
end
