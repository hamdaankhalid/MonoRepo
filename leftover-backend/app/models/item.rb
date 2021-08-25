class Item < ApplicationRecord
    belongs_to :provider_profile
    belongs_to :provider_employee_profile
end
