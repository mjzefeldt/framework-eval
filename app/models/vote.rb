class Vote < ApplicationRecord
  belongs_to :user, required: false
  belongs_to :framework, required: false
  
  after_commit :update_framework_vote_total, on: :create

  def update_framework_vote_total
    framework_votes = Vote.where(framework_id: self.framework_id).count
    framework = Framework.find_by(framework_id: self.framework_id)
    framework.update(vote_total: framework_votes)    
  end
end
