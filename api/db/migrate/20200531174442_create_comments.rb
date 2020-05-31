class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :content, null: false
      t.integer :user_id, null: false
      t.integer :image_id, null: false
      t.integer :parent_id

      t.timestamps
    end
  end
end
