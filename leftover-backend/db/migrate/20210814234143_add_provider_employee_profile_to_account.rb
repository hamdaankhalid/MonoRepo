class AddProviderEmployeeProfileToAccount < ActiveRecord::Migration[6.1]
  def change
    add_reference :accounts, :provider_employee_profile, null: true, foreign_key: true
    add_reference :provider_profiles, :provider_employee_profile, null: true, foreign_key: true
  end
end
