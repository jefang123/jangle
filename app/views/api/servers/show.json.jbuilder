json.server do
  json.extract! @server, :id, :server_name, :creator_id, :private
end
json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username
    end
  end
end
json.channels do
  @channels.each do |channel|
    json.set! channel.id do
      json.extract! channel, :id, :channel_name, :channel_topic
      json.creator channel.server.creator.username
      json.server_id channel.server_id
      json.private channel.server.private 
    end
  end
end
  