class Profile::ImagesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    render json: current_user.images
  end

end
