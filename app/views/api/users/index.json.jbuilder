@users.each do |user|
  json.set! user.id do
    json.id user.id
    json.username user.username
  end
  json.set! user.username do
    json.id user.id
    json.username user.username
  end
end