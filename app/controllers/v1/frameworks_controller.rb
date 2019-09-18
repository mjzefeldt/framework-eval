class V1::FrameworksController < ApplicationController
  def index
    render json: { :frameworks => [
      {
        :name => 'React',
        :votes => 1
      },
      {
        :name => 'Ember',
        :votes => 0
      }
    ]}.to_json
  end
end