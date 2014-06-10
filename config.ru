require './app'

# TODO: Do not compress binary files, especially images.
use Rack::Deflater

run App
