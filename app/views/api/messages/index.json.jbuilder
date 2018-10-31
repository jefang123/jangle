@messages.each do |message|

  json.set! message.id do
    json.id message.id
    json.channel_id message.channel_id
    json.body message.body
    json.user_id message.user_id

    if message.created_at.getlocal.strftime("%m/%d/%Y") == Time.now.getlocal.strftime("%m/%d/%Y")
      json.created_at message.created_at.getlocal.strftime("%I:%M %p")
    elsif message.created_at.getlocal.strftime("%m/%Y") == Time.now.getlocal.strftime("%m/%Y")
      if Time.now.getlocal.strftime("%d").to_i - message.created_at.getlocal.strftime("%d").to_i == 1
        json.created_at "Yesterday at " + message.created_at.getlocal.strftime("%I:%M %p")
      elsif (Time.now.getlocal.strftime("%d").to_i - message.created_at.getlocal.strftime("%d").to_i).between?(2,6)
        json.created_at "Last " + message.created_at.getlocal.strftime("%A") + " at " + message.created_at.getlocal.strftime("%I:%M %p")
      end 
    else 
      json.created_at message.created_at.getlocal.strftime("%m/%d/%Y")
    end
    
  end
end