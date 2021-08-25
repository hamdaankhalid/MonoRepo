class CreateAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts do |t|
      t.string :email
      t.string :password_digest
      t.string :type

      t.timestamps
    end
  end
end
