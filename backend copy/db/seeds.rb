User.destroy_all
Crop.destroy_all
Garden.destroy_all
Post.destroy_all
Comment.destroy_all


10.times do 
    User.create( {username: Faker::Name.name, email: "myEmail@gmail.com" , password: "123", city: Faker::Address.city })
end