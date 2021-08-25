class ChnageColumnNames < ActiveRecord::Migration[6.1]
  def change
    rename_column :provider_profiles, :type, :type_of
    rename_column :accounts, :type, :type_of
  end
end
