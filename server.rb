require "bundler/setup"
require "sinatra"
require "erb"
require "json"
require "./lib/video_data"

def json_data(name)
  path = File.expand_path("../data/#{name}.json", __FILE__)
  File.read(path)
end

dataProxies = {
  "uploads" => VideoData.new(json_data("uploads"))
}

["", "uploads", "playlists", "history", "watch-later", "favorites", "likes"].each do |page|
  get "/#{page}" do
    if request.xhr?
      proxy = dataProxies[page]

      if proxy
        proxy.all.to_json
      else
        "[]"
      end
    else
      @page = page.length > 0 ? page : "uploads"
      erb :index
    end
  end
end
