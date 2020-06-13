class GardensController < ApplicationController 

    def index 
        gardens = Garden.all 
        render(json: gardens, include: [:crops])
    end

    def show 
        garden = Garden.find(params[:id])
        render(json: garden, include: [:crops])
    end

    # def create
    #     byebug
    #     garden = Garden.create(
    #         name: params[:name],
    #         user_id: params[:user_id]
    #     )
    #     render(json: garden)
    # end
    
end