require 'cgi'
require 'haml'
require 'sinatra'




class App < Sinatra::Application
  NAME = 'hatokurandom'
  GITHUB_REPOS_URI = 'GITHUB_REPOS_URI'  # FIXME

  get '/' do
    haml :index
  end
end




__END__
