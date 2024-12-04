### Video Uploader APP

This app has 4 endpoints:

1. POST "/videos" - to upload a new video, taking in form (file: the video you want to upload, title: a string that specifies the title of the video, description: the description you want the file to have).
2. GET "/videos" - to get all videos paginated with (pageSize of type int, pageNum of type int) in the query params to return paginated results.
3. GET "/videos/:id" - to get the specified video by id.
4. DELETE "/videos/:id" - to delete the specified video by id.

##### Assuming you already have nodeJS and Typescript installed on your machine

You can simply run the code by running the following commands:

- install dependancies:
  If you're using npm, run:
  `npm install`
  If you're using yarn, run:
  `yarn install`

- install runner nodemon:
  `npm i -g nodemon ts-node`

- run the code using the command:
  `nodemon src/server.ts`
