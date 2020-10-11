class ApplicationController < ActionController::API
    # before_action(:check_login)

    def fallback_index_html
        render :file => 'public/index.html'
      end
    
    # def check_login
    #     if(session[:user_id] == nil)
    #         #redirect
    #     else
    # end
end
