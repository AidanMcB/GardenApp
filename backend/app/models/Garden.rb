class Garden < ApplicationRecord
    has_many :crops
    belongs_to :user
end