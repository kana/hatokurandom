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
  ONE_WEEK = 7 * 24 * 60 * 60

  set :static_cache_control, [:public, :max_age => ONE_WEEK]

  get '/' do
    haml :index
  end

  get '/stylesheets/app.css' do
    cache_control :public, :max_age => ONE_WEEK
    last_modified File::Stat.new('views/app.sass').mtime
    sass :app
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
