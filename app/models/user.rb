class User < ApplicationRecord
 has_secure_password

  validates :name, presence: true
  validates :pesel, presence: true
  validates :role, presence: true
  validates :email, presence: true, uniqueness: true

  has_many :rides
  has_many :joins
end
