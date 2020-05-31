class Profile::CommentsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    render json: current_user.comments
  end

end
