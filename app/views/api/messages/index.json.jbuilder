@messages.each do |message|
  json.set! message.id do
    json.id message.id
    json.channel_id message.channel_id
    json.body message.body
  end
end