class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.binary :stream, limit: 20971520, null: false
      t.string :extention
      t.string :description
      t.boolean :private, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
