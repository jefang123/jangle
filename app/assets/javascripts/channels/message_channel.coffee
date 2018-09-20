# App['chatroom' + roomId] = App.cable.subscriptions.create {
#   channel: 'ChatroomChannel',
#   room_id: roomId
# }