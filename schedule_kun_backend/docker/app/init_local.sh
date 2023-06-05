#!/bin/sh
echo "start rails initial script..."

cd /app/rails

bundle exec rails db:create RAILS_ENV=$RAILS_ENV
bundle exec rails db:migrate RAILS_ENV=$RAILS_ENV

# bundle exec rails s -b 0.0.0.0

while :; do sleep 10; done
