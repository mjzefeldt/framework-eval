class V1::FrameworksController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  # before_action :authenticate_user!

  def index
    puts 'hitting get(index) endpoint'
    framework_votes = Framework.all || {}
    if framework_votes.present?
      render json: framework_votes, status: :ok
    else
      render json: {}, status: :bad_request
      return
    end
  end

  def create
    if current_user && params[:framework].present?
      if session[:voted] && session[:voted] == true # don't create if already voted this session
        render json: {}, status: :too_many_requests
        return
      else
        framework = params[:framework]
        vote_params = {
          framework_id: framework[:id],
          user_id: current_user[:id]
        }
        Vote.create(vote_params)
        session[:voted] = true 
        render json: {}, status: :ok
      end
    else
      render json: {}, status: :bad_request
      return
    end
  end
end