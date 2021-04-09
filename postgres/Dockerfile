FROM postgres

USER postgres

RUN whoami

VOLUME /var/lib/postgresql/data

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["postgres"]
