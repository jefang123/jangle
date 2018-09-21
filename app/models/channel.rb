# == Schema Information
#
# Table name: channels
#
#  id            :bigint(8)        not null, primary key
#  channel_name  :string           not null
#  channel_topic :string
#  server_id     :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Channel < ApplicationRecord
  belongs_to :server
  validates :server, :channel_name, presence: true
  has_many :messages, dependent: :destroy
  has_one :creator, through: :server
end
