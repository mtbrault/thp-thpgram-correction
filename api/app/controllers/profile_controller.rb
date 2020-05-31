class Admin::CoursesController < Admin::BaseController
  before_action :authenticate_user!

  def show
  end

  def edit
  end

  def update
    if current_user.update(profile_params)
      render json: current_user
    else
      render json: @course, status: :bad_request
    end
  end


  private

  def profile_params
    params.require(:user).permit(:id, :first_name, :last_name, :username)
  end

end
