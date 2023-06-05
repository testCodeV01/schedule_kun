FROM node:16

RUN apt-get update
RUN apt-get -y install vim

RUN mkdir -p /app/frontend
ENV APP_ROOT /app/frontend

WORKDIR $APP_ROOT

COPY package*.json $APP_ROOT
# ADD yarn.lock $APP_ROOT
