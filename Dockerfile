
FROM minio/minio

EXPOSE 9000:9000

RUN mc mb /data/data && \
    mc anonymous set public -r /data/data

ENTRYPOINT [ "minio", "server", "/data" ]
