# == Schema Information
#
# Table name: messages
#
#  id         :bigint(8)        not null, primary key
#  body       :string           not null
#  channel_id :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ApplicationRecord
  belongs_to :user
  belongs_to :channel 
  validates :user, :channel, :body, presence:true 
end
