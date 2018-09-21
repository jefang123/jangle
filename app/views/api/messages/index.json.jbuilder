@messages.each do |message|
  json.set! message.id do
    json.id message.id
    json.channel_id message.channel_id
    json.body message.body
    json.user_id message.user_id
    json.created_at
  end
end