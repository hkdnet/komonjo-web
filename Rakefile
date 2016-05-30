require 'dotenv'

namespace :api do
  task :run do
    Dotenv.load
    `docker-compose up -d`
  end

  task :stop do
    Dotenv.load
    `docker-compose kill`
  end

  task :debug do
    Dotenv.load
    `export KOMONJO_DEBUG=TRUE && docker-compose up -d`
  end

  task :build do
    pid = spawn('docker build --tag=hkdnet/komonjo .')
    Process.waitpid(pid)
  end
end
