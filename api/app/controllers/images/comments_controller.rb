class Images::CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_image, only: [:index]

  def index
    render json: @image.comments
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

end
