require "bundler/setup"
require "sinatra"
require "erb"

["", "uploads", "playlists", "history", "watch-later", "favorites", "likes"].each do |page|
  get "/#{page}" do
    @page = page.length > 0 ? page : "uploads"
    erb :index
  end
end
