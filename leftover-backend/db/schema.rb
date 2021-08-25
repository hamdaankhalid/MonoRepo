# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_22_183855) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "type_of"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "items", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "provider_profile_id"
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.bigint "unpublished_by_id"
    t.string "name"
    t.string "description"
    t.integer "units"
    t.string "unit_of_measurement"
    t.integer "amount_restriction"
    t.money "price_before", scale: 2
    t.money "price_after", scale: 2
    t.datetime "item_expiration"
    t.boolean "published"
    t.index ["created_by_id"], name: "index_items_on_created_by_id"
    t.index ["provider_profile_id"], name: "index_items_on_provider_profile_id"
    t.index ["unpublished_by_id"], name: "index_items_on_unpublished_by_id"
    t.index ["updated_by_id"], name: "index_items_on_updated_by_id"
  end

  create_table "provider_employee_profiles", force: :cascade do |t|
    t.boolean "is_admin"
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "account_id"
    t.bigint "provider_profile_id"
    t.index ["account_id"], name: "index_provider_employee_profiles_on_account_id"
    t.index ["provider_profile_id"], name: "index_provider_employee_profiles_on_provider_profile_id"
  end

  create_table "provider_profiles", force: :cascade do |t|
    t.string "name"
    t.string "type_of"
    t.string "address"
    t.string "email"
    t.string "phone"
    t.boolean "approved_by_super_admin"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "items", "provider_employee_profiles", column: "created_by_id"
  add_foreign_key "items", "provider_employee_profiles", column: "unpublished_by_id"
  add_foreign_key "items", "provider_employee_profiles", column: "updated_by_id"
  add_foreign_key "items", "provider_profiles"
end
