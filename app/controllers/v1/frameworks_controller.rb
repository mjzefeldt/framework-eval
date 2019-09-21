class V1::FrameworksController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

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
      if session[:voted] && session[:voted] == true
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

  def check_vote
    if session[:voted] && session[:voted] == true
      voted = true
    else
      voted = false
    end
    render json: voted, status: :ok
  end
end