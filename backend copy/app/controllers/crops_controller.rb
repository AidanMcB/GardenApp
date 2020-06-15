class CropsController < ApplicationController

    def index 
        crops = Crop.all 
        render(json: crops)
    end

    def show 
        crop = Crop.find(params[:id])
        render(json: crop)
    end

    def create 
        crop = Crop.create({
            name: params[:name],
            description: params[:description],
            sun_requirements: params[:sun_requirements],
            sowing_method: params[:sowing_method],
            height: params[:height],
            image_path: params[:image_path],
            growing_days: params[:growing_days],
            day_planted: params[:day_planted],
            number_planted: params[:number_planted],
            garden_id: params[:garden_id],
        })
        render(json: crop)
    end

    def update
        crop = Crop.find(params[:id])
        # byebug
        crop = Crop.update({
            # name: params[:cropInfo][:name],
            # description: params[:cropInfo][:description],
            # sun_requirements: params[:cropInfo][:sun_requirements],
            # sowing_method: params[:cropInfo][:sowing_method],
            # height: params[:cropInfo][:height],
            # image_path: params[:cropInfo][:image_path],
            # growing_days: params[:cropInfo][:growing_days],
            # day_planted: params[:cropInfo][:day_planted],
            # number_planted: params[:cropInfo][:number_planted],
            # garden_id: params[:cropInfo][:garden_id],
            current_height: params[:cropInfo][:current_height],
            quantity_returned: params[:cropInfo][:quantity_returned],
            status_of_plant: params[:cropInfo][:status_of_plant]
        })
        # byebug
        render(json: crop)
    end

    def destroy 
        crop = Crop.find(params[:id])
        crop.destroy 
        if(crop.id)
            render(json:{success: true, id: nil})
        else 
            render(json:{success: false, id: crop.id})
        end
    end

    
end