class RemoveColumnProviderProfiel < ActiveRecord::Migration[6.1]
  def change
    remove_column :provider_profiles, :provider_employee_profile_id
  end
end
