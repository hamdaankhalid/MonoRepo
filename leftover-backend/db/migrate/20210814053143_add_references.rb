class AddReferences < ActiveRecord::Migration[6.1]
  def change
    add_reference :provider_employee_profiles, :account, index: true
    add_reference :provider_employee_profiles, :provider_profile, index: true
  end
end
