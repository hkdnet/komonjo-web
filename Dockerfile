FROM ubuntu:14.04.3
MAINTAINER hkdnet<hkdnet@users.noreply.github.com>

RUN apt-get update
RUN sudo apt-get install -y git build-essential libssl-dev libsqlite3-dev nodejs wget curl libreadline-dev
RUN apt-get clean

# ruby-build
RUN git clone https://github.com/sstephenson/ruby-build.git .ruby-build
RUN .ruby-build/install.sh
RUN rm -rf .ruby-build

# ruby　2.3.0のインストール
RUN sudo ruby-build 2.3.0 /usr/local

# bundlerの導入
RUN gem update --system
RUN gem install bundler --no-rdoc --no-ri

# Define working directory.
WORKDIR /data

# bundle install
ADD ./Gemfile  /data/Gemfile
ADD ./Gemfile.lock /data/Gemfile.lock
RUN bundle install

# add app
ADD . /data

# Define default command.
CMD ["bash"]
