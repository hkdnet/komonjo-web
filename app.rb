require 'sinatra/base'
require 'sinatra/reloader'
require 'dotenv'
require 'komonjo'
require 'json'

# App
class App < Sinatra::Base
  configure :development do
    Dotenv.load
    register Sinatra::Reloader
  end

  def komonjo_config
    if ENV['KOMONJO_DEBUG'] == 'TRUE'
      { debug: true }
    else
      { token: ENV['KOMONJO_SLACK_API_TOKEN'] }
    end
  end

  def client
    @client ||= Komonjo::Client.new(komonjo_config)
  end

  get '/api/channels' do
    headers(
      'Access-Control-Allow-Origin' => '*',
      'Access-Control-Allow-Headers' => 'Content-Type',
      'Access-Control-Allow-Methods' => 'GET'
    )
    client.channels.map(&:name).to_json
  end

  get '/api/messages' do
    headers(
      'Access-Control-Allow-Origin' => '*',
      'Access-Control-Allow-Headers' => 'Content-Type',
      'Access-Control-Allow-Methods' => 'GET'
    )
    channel_name = params[:channel_name]
    client.messages(channel_name).to_json
  end

  get '/' do
    'hello'
  end
end
