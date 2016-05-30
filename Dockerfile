FROM ruby:2.3
MAINTAINER hkdnet<hkdnet@users.noreply.github.com>

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
