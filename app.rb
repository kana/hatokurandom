# coding: utf-8

require 'bundler/setup'
require 'cgi'
require 'haml'
require 'sass'
require 'sinatra'
require 'socket'




class App < Sinatra::Application
  NAME = 'ハトクランダム'
  CODENAME = 'Hatokurandom'
  GITHUB_REPOS_URI = 'https://github.com/kana/hatokurandom'

  get '/' do
    haml :index
  end

  get '/offline' do
    haml :index
  end

  get '/spec' do
    send_file 'public/spec.html'
  end

  helpers do
    def offline_mode?
      request.path == '/offline'
    end
  end
end




__END__
