class User < ApplicationRecord
    has_secure_password 
    
    has_one :garden
    has_many :crops, through: :garden
    has_many :posts
    has_many :comments, through: :posts
end