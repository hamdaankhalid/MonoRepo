class Account < ApplicationRecord
    # an account can have a provider_employee_profile associated with it
    has_secure_password
    has_one :provider_employee_profile, dependent: :destroy
    enum type_of: { food_bank: "food_bank", restaurant: "restaurant", grocery_store: "grocery_store" }

    validates :email, presence: true

    # make emails non repeatable and cannot be nil
    # make type_of as cannot be nil

end
