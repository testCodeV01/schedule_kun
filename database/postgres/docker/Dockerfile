FROM postgres:14
EXPOSE 5432

RUN localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8
ENV LANG ja_JP.utf8
RUN chmod -R 750 /var/lib/postgresql/data

ENV TZ Asia/Tokyo
