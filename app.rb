require 'sinatra/base'
require 'dotenv'

class App < Sinatra::Base
  Dotenv.load if %w(development test).include?(ENV['RACK_ENV'])

  get '/' do
    'hello'
  end
end
