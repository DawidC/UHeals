class Ride < ApplicationRecord
    belongs_to :user, optional: true

    validates :from, presence: true, length: { minimum: 1 }
    validates :to, presence: true, length: { minimum: 1 }
    validates :date, presence: true, length: { minimum: 1 }
    validates :current_seats, presence: true, length: { minimum: 1 }
    validates :max_seats, presence: true, length: { minimum: 1 }

    has_many :joins
end
