class AuthenticationController < ApplicationController

    def login
        user = User.find_by({ username: params[:userInfo][:username] })
        
        if(user && user.authenticate(params[:userInfo][:password]))
            session[:user_id] = user.id
            crops = user.garden.crops
            # byebug
            render(json:{ user: user, crops: crops, success: true, id: user.id})
            # render :json => user.to_json(:include => { :garden => {:include =>:crops} })
        else
            render(json: {success: false, id: nil })
        end
    #   byebug
    end

    def signUp
        # byebug
        if(!User.find_by({ username: params[:newUserInfo][:username]}))
            user = User.create({
                username: params[:newUserInfo][:username],
                password: params[:newUserInfo][:password],
                email: params[:newUserInfo][:email],
                city: params[:newUserInfo][:city]
            })
            session[:user_id] = user.id
            #create a garden with each unique user
            
            garden = Garden.create({
                name: "#{user.username}'s Garden",
                user_id: user.id
            })
            crops = garden.crops
            currentUser = {
                username: user.username,
                email:  user.email,
                id:     user.id,
                city: user.city,
                garden: garden
            }
        
            # render :json => @programs, :include => {:insurer => {:only => :name}}
            render json: { success: true, id: user.id, user: currentUser, crops: crops }
        else
            render json: { success: false, id: nil}
        end
    end

    def logout
        # reset_session
        session.clear
        session[:user_id] = nil
        render json: { status: 200, logged_out: true }
    end

    # def destroy
    #     logout!
    #     render json: {
    #       status: 200,
    #       logged_out: true
    #     }
    # end

    
end