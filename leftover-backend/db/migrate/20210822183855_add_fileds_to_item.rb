class AddFiledsToItem < ActiveRecord::Migration[6.1]
  def change
    # FK providerProfile Id A provider profile has many items
    add_reference :items, :provider_profile, foreign_key: { to_table: :provider_profiles }


    # FK ProviderEmployeeId created_by
    add_reference :items, :created_by, foreign_key: { to_table: :provider_employee_profiles }

    # FK ProviderEmployeeId updated_by
    add_reference :items, :updated_by, foreign_key: { to_table: :provider_employee_profiles }
  
    # FK ProviderEmployeeId unpublished_by
    add_reference :items, :unpublished_by, foreign_key: { to_table: :provider_employee_profiles }
    
    add_column :items, :name, :string
    add_column :items, :description, :string
    add_column :items, :units, :integer
    add_column :items, :unit_of_measurement, :string
    add_column :items, :amount_restriction, :integer
    add_column :items, :price_before, :money
    add_column :items, :price_after, :money
    add_column :items, :item_expiration, :timestamp
    add_column :items, :published, :boolean
  end
end
