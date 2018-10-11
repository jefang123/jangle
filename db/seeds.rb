# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Server.destroy_all
Channel.destroy_all
UserJoin.destroy_all

demo = User.create(username:"Demo-User", email:"demo", password:"123456")
demo_home = Server.create(creator_id: demo.id, server_name:"Home", private: true)
UserJoin.create(user_id: demo.id, server_id: demo_home.id)
jeff = User.create(username:"jeff", email:"jeff", password:"123456")
jeff_home = Server.create(creator_id: jeff.id, server_name:"Home", private: true)
UserJoin.create(user_id: jeff.id, server_id: jeff_home.id)

money = User.create(username:"MakeMoney", email:"makemoney", password:"111111111")
stocks = Server.create(creator_id: money.id, server_name:"Stocks")
UserJoin.create(user_id: money.id, server_id: stocks.id)
stocksgeneral = Channel.create(server_id: stocks.id, channel_name:"general", channel_topic:"Anything is fine here")
Message.create(body:stocks.id, user_id:money.id, channel_id:stocksgeneral.id)
advice = Channel.create(server_id: stocks.id, channel_name:"advice", channel_topic:"BUY or SELL?")

ranchguy = User.create(username:"RanchDude", email:"ranchdude", password:"111111")
diy = Server.create(creator_id:ranchguy.id, server_name:"DIY")
UserJoin.create(user_id: ranchguy.id, server_id: diy.id)
diygeneral = Channel.create(server_id: diy.id, channel_name:"general", channel_topic:"Anything is fine here")
Message.create(body:diy.id, user_id:ranchguy.id, channel_id:diygeneral.id)
projects = Channel.create(server_id: diy.id, channel_name:"currentprojects", channel_topic:"What are you working on?")

musicguy = User.create(username:"Musicguy", email:"makemusic", password:"111111111")
music = Server.create(creator_id: money.id, server_name:"Music")
UserJoin.create(user_id: musicguy.id, server_id: music.id)
musicgeneral = Channel.create(server_id: music.id, channel_name:"general", channel_topic:"Anything is fine here")
Message.create(body:music.id, user_id:musicguy.id, channel_id:musicgeneral.id)
youtube = Channel.create(server_id: music.id, channel_name:"youtube", channel_topic:"What's streaming")

stuff = Server.create(creator_id: jeff.id, server_name:"Stuff")
UserJoin.create(user_id: jeff.id, server_id: stuff.id)
stuffgeneral = Channel.create(server_id: stuff.id, channel_name:"general", channel_topic:"Anything is fine here")
Message.create(body:stuff.id, user_id:jeff.id, channel_id:stuffgeneral.id)
bughunt = Channel.create(server_id: stuff.id, channel_name:"bugs", channel_topic:"Post your bugs")


bear = User.create(username:"Bear", email:"makemoney1", password:"111111111")
bull = User.create(username:"Bull", email:"makemone2y", password:"111111111")

rowdyguy = User.create(username:"Rawl", email:"rawll", password:"123456")

UserJoin.create(user_id: demo.id, server_id: stocks.id)
UserJoin.create(user_id: ranchguy.id, server_id: stocks.id)
UserJoin.create(user_id: musicguy.id, server_id: stocks.id)
UserJoin.create(user_id: jeff.id, server_id: stocks.id)
UserJoin.create(user_id: bear.id, server_id: stocks.id)
UserJoin.create(user_id: bull.id, server_id: stocks.id)
UserJoin.create(user_id: rowdyguy.id, server_id: stocks.id)

UserJoin.create(user_id: demo.id, server_id: diy.id)
UserJoin.create(user_id: musicguy.id, server_id: diy.id)
UserJoin.create(user_id: rowdyguy.id, server_id: diy.id)


UserJoin.create(user_id: demo.id, server_id: music.id)
UserJoin.create(user_id: money.id, server_id: music.id)
UserJoin.create(user_id: ranchguy.id, server_id: music.id)

UserJoin.create(user_id: jeff.id, server_id: stuff.id)
UserJoin.create(user_id: demo.id, server_id: stuff.id)

Message.create(body:"FIRST", user_id:musicguy.id, channel_id: advice.id)
Message.create(body:"SECOND", user_id:musicguy.id, channel_id: advice.id)
Message.create(body:"third", user_id:musicguy.id, channel_id: advice.id)
Message.create(body:"Time to BUY BUY BUY", user_id:bull.id, channel_id:advice.id)
Message.create(body:"Time to SELL SELL SELL", user_id:bear.id, channel_id:advice.id)
Message.create(body:"help i just lost 2 grand in 20 minutes", user_id:ranchguy.id, channel_id:advice.id)
Message.create(body:"are u made of money", user_id:rowdyguy.id, channel_id:advice.id)
Message.create(body:"prob", user_id:money.id, channel_id:advice.id)

Message.create(body:"Youtube sucks", user_id:musicguy.id, channel_id:youtube.id)

Message.create(body:"nature calls", user_id:rowdyguy.id, channel_id:diygeneral.id)


jeff_food = Server.create(creator_id: jeff.id, server_name:"Food")
UserJoin.create(user_id: jeff.id, server_id: jeff_food.id)
UserJoin.create(user_id: demo.id, server_id: jeff_food.id)

foodgeneral = Channel.create(server_id: jeff_food.id, channel_name:"general", channel_topic:"Anything is fine here")
Message.create(body:jeff_food.id, user_id:jeff.id, channel_id:foodgeneral.id)
foodfav = Channel.create(server_id: jeff_food.id, channel_name:"Recipes", channel_topic:"Share your recipes!")

50.times do 
  foodie = User.create(email:Faker::Food.fruits, username:Faker::Food.vegetables, password:"Foodie")
  UserJoin.create(user_id: foodie.id, server_id: jeff_food.id)
  Message.create(body:Faker::Food.dish, user_id:foodie.id, channel_id:foodfav.id)
  Message.create(body:Faker::Food.description, user_id:foodie.id, channel_id:foodfav.id)
end 

ActiveRecord::Base.connection.reset_pk_sequence!(Model.users)
ActiveRecord::Base.connection.reset_pk_sequence!(Model.servers)
ActiveRecord::Base.connection.reset_pk_sequence!(Model.channels)
ActiveRecord::Base.connection.reset_pk_sequence!(Model.userjoins)