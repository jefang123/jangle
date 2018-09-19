@channels.each do |channel|
  json.set! channel.id do
    json.id channel.id
    json.server_id channel.server_id
    json.channel_name channel.channel_name
    json.channel_topic channel.topic
  end
end