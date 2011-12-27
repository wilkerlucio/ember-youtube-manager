# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'coffeescript', :input => 'public/javascripts'
guard 'process', :name => 'Sinatra', :command => 'ruby server.rb' do
  watch "server.rb"
  watch %r{^lib/(.+)\.rb$}
end
