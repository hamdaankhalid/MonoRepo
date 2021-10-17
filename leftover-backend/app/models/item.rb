class Item < ApplicationRecord
    belongs_to :provider_profile, optional: true
    belongs_to :provider_employee_profile, optional: true
end
