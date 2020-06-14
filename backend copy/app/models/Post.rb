class Post < ApplicationRecord
    include Rails.application.routes.url_helpers
    
    has_one_attached :image
    belongs_to :user
    has_many :crops
    
    def url
        begin
            url_for(self.image)
        rescue => error
            nil
        end 
    end 

end