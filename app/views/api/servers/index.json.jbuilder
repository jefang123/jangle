@servers.each do |server|
  json.set! server.id do
    json.id server.id
    json.creator_id server.creator_id
    json.server_name server.server_name
  end
end