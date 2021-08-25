class FicReferences < ActiveRecord::Migration[6.1]
  def change
    remove_column :accounts, :provider_employee_profile_id
    remove_columns :provider_profiles, :provider_employee_profile_id
    add_reference :provider_employee_profiles, :account, index: true
    add_reference :provider_employee_profiles, :provider_profile, index: true
  end
end
