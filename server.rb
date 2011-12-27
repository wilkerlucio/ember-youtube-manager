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
        {"per_page" => proxy.per_page, "total" => proxy.total, "content" => proxy.all(params)}.to_json
      else
        {"per_page" => 0, "total" => 0, "content" => []}.to_json
      end
    else
      @page = page.length > 0 ? page : "uploads"
      erb :index
    end
  end
end
