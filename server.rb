require "bundler/setup"
require "sinatra"
require "erb"

get "/" do
  erb :index
end
