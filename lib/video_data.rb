class VideoData
  def initialize(json)
    @data = JSON.parse(json)
  end

  def all
    @data
  end
end
