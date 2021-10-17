FactoryBot.define do
    factory :item do
        name { 'food' }
        description { 'Description added' }
        units { 27 }
        unit_of_measurement { 'packs' }
        amount_restriction { 1 }
        item_expiration { DateTime.current },
        published { true }
        # :provider_profile_id => provider_profile.id,
        # :created_by_id => created_by.id
    end
end