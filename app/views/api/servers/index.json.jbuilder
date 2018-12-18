@servers.each do |server|
  json.set! server.id do
    json.id server.id
    json.creator_id server.creator_id
    json.server_name server.server_name
    json.private server.private
    json.user_ids server.user_ids
  end
end