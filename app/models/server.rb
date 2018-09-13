# == Schema Information
#
# Table name: servers
#
#  id          :bigint(8)        not null, primary key
#  creator_id  :integer          not null
#  server_name :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  image_url   :string
#

class Server < ApplicationRecord
  validates :creator, :server_name, presence:true 
  belongs_to :creator, class_name: 'User', foreign_key: :creator_id
  has_many :userjoins, class_name: 'UserJoin', foreign_key: :server_id, inverse_of: :server, dependent: :destroy
  has_many :users, through: :userjoins
     
end
