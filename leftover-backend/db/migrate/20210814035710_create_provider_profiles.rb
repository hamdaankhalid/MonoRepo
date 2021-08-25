class CreateProviderProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :provider_profiles do |t|
      t.string :name
      t.string :type
      t.string :address
      t.string :email
      t.string :phone
      t.boolean :approved_by_super_admin

      t.timestamps
    end
  end
end
