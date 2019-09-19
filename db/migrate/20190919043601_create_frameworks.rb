class CreateFrameworks < ActiveRecord::Migration[5.2]
  def change
    create_table :frameworks do |t|
      t.string :name
      t.integer :framework_id
      t.integer :vote_total
      t.timestamps
    end
  end
end
