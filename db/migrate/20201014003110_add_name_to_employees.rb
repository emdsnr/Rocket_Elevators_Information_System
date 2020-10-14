class AddNameToEmployees < ActiveRecord::Migration[5.2]
  def change
    add_column :employees, :fname, :string
    add_column :employees, :lname, :string
    add_column :employees, :title, :string
  end
end
