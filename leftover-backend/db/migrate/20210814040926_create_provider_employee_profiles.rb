class CreateProviderEmployeeProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :provider_employee_profiles do |t|
      t.boolean :is_admin
      t.string :first_name
      t.string :last_name

      t.timestamps
    end
  end
end
