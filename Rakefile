require 'dotenv'

namespace :api do
  task :run do
    Dotenv.load
    `eval $(docker-machine env komonjo) && docker-compose up -d`
  end

  task :debug do
    Dotenv.load
    `eval $(docker-machine env komonjo) && export KOMONJO_DEBUG=TRUE && docker-compose up -d`
  end

  task :build do
    pid = spawn('eval $(docker-machine env komonjo) && docker build --tag=hkdnet/komonjo .')
    Process.waitpid(pid)
  end
end
