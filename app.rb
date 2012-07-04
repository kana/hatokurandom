# coding: utf-8

require 'bundler/setup'
require 'cgi'
require 'haml'
require 'sinatra'
require 'socket'




class App < Sinatra::Application
  NAME = 'ハトクランダム'
  CODENAME = 'Hatokurandom'
  GITHUB_REPOS_URI = 'https://github.com/kana/hatokurandom'

  get '/' do
    haml :index
  end

  get '/spec' do
    send_file 'public/spec.html'
  end

  helpers do
    def development?
      @local_ip_addresses ||= Socket.ip_address_list.map {|a| a.ip_address}
      @local_ip_addresses.member?(request.ip)
    end
  end
end




__END__
