# coding: utf-8

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
  sh 'if test -d public/assets; then rm -r public/assets; fi'
  Rake::Task['assetpack:build'].invoke
  sh 'git add public/assets'
  sh 'git commit -am "Replace version numbers"'
  sh 'git reset --hard HEAD~1'
  sh "git push #{args.remote || 'heroku'} HEAD@{1}:master -f"
end
