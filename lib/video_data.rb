class VideoData
  attr_accessor :per_page

  def initialize(json)
    @data = JSON.parse(json)
    @per_page = 100
  end

  def all(query)
    offset = (query[:page].to_i || 0) * @per_page
    @data[offset, @per_page]
  end

  def total
    @data.length
  end
end
