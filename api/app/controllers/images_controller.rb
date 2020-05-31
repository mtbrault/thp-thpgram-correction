class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :edit, :update, :destroy]

  # GET /images
  def index
    @images = Image.all

    render json: @images
  end

  # GET /images/1
  def show
    render json: @image
  end

  # POST /images
  def create
    @image = Image.new(image_params)
    # @image.stream = Base64.strict_encode64(image_params['stream'].read)

    if @image.save
      render json: @image, status: :created, location: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /images/1
  def update
    operation_successfull = @image.update(image_params)
    # if (operation_successfull and image_params.key?('stream'))
    #   @image.update(stream: Base64.strict_encode64(image_params['stream'].read))
    # end

    if operation_successfull
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /images/1
  def destroy
    @image.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def image_params
      params.require(:image).permit(:stream, :extention, :description, :private).merge(user_id: current_user.id)
    end

end
