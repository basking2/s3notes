# S3 Notes

This is a simple static webpage that, if published through S3,
should allow a user to enter keying credentials and publish back to the
S3 bucket this is served from.

In this way, a user could have a easily publishable site on an 
S3 compliant service such as 
[IBM Cloud Object Store](https://www.ibm.com/cloud/object-storage)
for free or host their own with [Minio](https://min.io/).

## Development

### Testing Reading and Writing Files

Start a Min.io docker container to host the application.

```
docker run -p 9000:9000 -e MINIO_ACCESS_KEY=minioadmin \
                        -e MINIO_SECRET_KEY=minioadmin \
                        -v `pwd`/data:/data minio/minio server /data
```

Now build and publish the application.

```
npm run build && npm run publish
```

### Normal Vue Development

```
npm run serve
```
