# coding: utf-8

# To avoid Encoding::UndefinedConversionError while packing assets.
Encoding.default_internal = Encoding::UTF_8
Encoding.default_external = Encoding::UTF_8

APP_FILE  = 'app.rb'
APP_CLASS = 'App'
require 'sinatra/assetpack/rake'

task :deploy, [:remote] do |t, args|
  sh 'git diff --quiet HEAD'
  sh <<-'END'
    sed -i -e "s!@@VERSION@@!$(git describe --always --dirty)!g" $(
      for i in $(git ls-files)
      do
        test -f "$i" && ! test -h "$i" && echo "$i"
      done
    )
  END
  sh 'git commit -am "Replace version numbers"'
  sh 'git reset --hard HEAD~1'
  sh "git push #{args.remote || 'heroku'} HEAD@{1}:master -f"
end
