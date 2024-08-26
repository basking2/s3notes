# S3 Notes

This is a simple static webpage that, if published through S3,
should allow a user to enter credentials and publish back to the
S3 bucket.

In this way, a user could have a easily publishable site on an 
S3 compliant service such as 
[IBM Cloud Object Store](https://www.ibm.com/cloud/object-storage)
for free or host their own with [Minio](https://min.io/).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Development

### Testing Reading and Writing Files

Start a Min.io docker container to host the application.

```
docker run -p 9000:9000 -e MINIO_ACCESS_KEY=minioadmin \
                        -e MINIO_SECRET_KEY=minioadmin \
                        --name minio \
                        -v `pwd`/data:/data minio/minio server /data
```

Once the minio sever is running, run the following to create a bucket
named `data`.

```shell
docker exec minio mc mb /data/data
docker exec minio bash -c 'mc alias set lo http://localhost:9000 $MINIO_ACCESS_KEY $MINIO_SECRET_KEY'
docker exec minio mc anonymous set download -r lo/data
```

Now build and publish the application.

```
# Build the application to be served off of /data on the host.
PUBLIC_URL=/data npm run build

# Now publish to the bucket that has the same name as the VUE_PUBLIC_PATH.
npm run publish -- -s minioadmin \
                   -i minioadmin \
                   -e http://localhost:9000 \
                   -b data
```

### Normal Vue Development

```
npm run serve
```

## Adding Dependencies

We currently isolate the encryption routines in a separate module.

```shell
npm install 'git+https://github.com/basking2/doccryptjs.git#main'
```
