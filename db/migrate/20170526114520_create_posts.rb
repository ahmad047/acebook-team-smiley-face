class CreatePosts < ActiveRecord::Migration[5.1]
  # belongs_to :user

  def change
    create_table :posts do |t|
      t.string :message

      t.timestamps
    end
  end
end
