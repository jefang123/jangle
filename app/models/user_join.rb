# == Schema Information
#
# Table name: user_joins
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  server_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserJoin < ApplicationRecord
  validates :user, :server, presence:true
  validates :user, uniqueness: { scope: :server, message: "already joined server"}

  belongs_to :server, touch: true
  belongs_to :user, touch: true 
end
