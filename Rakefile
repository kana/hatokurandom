# coding: utf-8

task :deploy, [:remote] do |t, args|
  sh 'git diff --quiet HEAD'
  version = %x{git describe --always --dirty}.chomp
  sh 'nanoc prune --yes'
  sh 'rm -f output/*.{html,appcache}'  # To replace versions correctly.
  sh 'nanoc compile'
  sh %Q{
    cd output &&
    git add --all . &&
    git commit -m 'Build #{version}' &&
    git push github gh-pages -f
  }
end
