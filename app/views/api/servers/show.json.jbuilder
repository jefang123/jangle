json.extract! @server, :id, :server_name, :creator_id
json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username
    end
  end
end
  