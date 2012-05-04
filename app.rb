# coding: utf-8

require 'cgi'
require 'haml'
require 'sinatra'




class App < Sinatra::Application
  NAME = 'ハトクランダム'
  GITHUB_REPOS_URI = 'https://github.com/kana/hatokurandom'

  get '/' do
    haml :index
  end
end




__END__
