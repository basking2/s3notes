# S3 Notes

## Dev

S3 Test Server

```
docker run -p 9000:9000 -e MINIO_ACCESS_KEY=minioadmin \
                        -e MINIO_SECRET_KEY=minioadmin \
                        -v `pwd`/data:/data minio/minio server /data

```
