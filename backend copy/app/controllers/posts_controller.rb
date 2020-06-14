class PostsController < ApplicationController

    def index 
        posts = Post.all 
        render(json: posts, :methods => :url)
    end

    def show 
        post = Post.find(params[:id])
        render(json: post, :methods => :url)
    end

    def create
        # byebug
        post = Post.create({
            title: params[:title],
            body: params[:bodyInfo],
            image: params[:newImage],
            user_id: session[:user_id]
        })
        render(json: post)
    end

    def destroy 
        post = Post.find(params[:id])
        post.destroy 
        #checks for post and for correct user to protect against attacks
        # if(post.id && crop.id == session[:user_id])
        if(post.id)
            render(json:{success: true, id: nil})
        else 
            render(json:{success: false, id: crop.id})
        end
    end

end