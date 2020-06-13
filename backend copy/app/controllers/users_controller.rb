class UsersController < ApplicationController 
    # before_action :define_current_user

    def index 
        users = User.all 
        render :json => users.to_json(:include => { :garden => {:include =>:crops} })
    end

    def show 
        user = User.find(params[:id])
        # render(json: user, include: [:garden, :crops])
        render :json => user.to_json(:include => { :garden => {:include =>:crops} })

    end

    def get_user 
        # byebug
        user = User.find(session[:user_id])
        render :json => user.to_json(:include => { :garden => {:include =>:crops} })
    end

    def user_params
        # byebug
        params.permit(:username)
    end

    #consider adding current user for authentication aspect
end