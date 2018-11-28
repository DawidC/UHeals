class Join < ActiveRecord::Base
  belongs_to :ride, validate: true
  belongs_to :user, validate: true
end
