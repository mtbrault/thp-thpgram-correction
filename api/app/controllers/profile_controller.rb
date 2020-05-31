class ProfileController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: current_user
  end

  def update
    if current_user.update(profile_params)
      render json: current_user
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:user).permit(:first_name, :last_name, :username).merge(id: current_user.id)
  end

end
