# Instagram NodeJS

This is a Node.js application that uses the Instagram API to fetch data about a user's profile and their recent posts. It allows users to authenticate with their Instagram account and view their photos and videos.

## Technologies Used

The Instagram NodeJS application uses the following technologies:

- Node.js
- Express
- Mongoose
- JWT
- dotenv
- request

## Features
1. User Authentication: Implement user authentication to ensure that only authorized users can access the Instagram API.
2. User Profile: Create user profiles that include their basic information, profile picture, and other relevant details.
3. Post Creation: Allow users to create new posts, including photos, videos, and captions.
4. Post Management: Allow users to manage their posts, including editing or deleting them.
5. Likes and Comments: Implement the ability for users to like and comment on posts.


## API Endpoints
# Authentication

1. `POST /api/signUp`: Endpoint to allow a user to sign up for an account.
    - Request body should include the user's name, email, and password.
    - Request should be validated using the `signUpValidation` middleware.
    - Response should include a JWT token for the user's session.

2. `POST /api/signIn`: Endpoint to allow a user to sign in to their account.
    - Request body should include the user's email and password.
    - Request should be validated using the `signInValidation` middleware.
    - Response should include a JWT token for the user's session.

3. `POST /api/signOut`: Endpoint to allow a user to sign out of their account.
    - Request should include the JWT token for the user's session.
    - Request should be authorized using the `authAPI.logout` middleware.
    - Response should indicate that the user has been successfully logged out.

4. `GET /api/confirm/:token`: Endpoint to confirm a user's email address.
    - Request should include the confirmation token sent to the user's email.
    - Response should indicate whether the confirmation was successful.

5. `GET /api/reSend/:id`: Endpoint to resend a confirmation token to a user's email.
    - Request should include the user's ID.
    - Response should indicate whether the email was successfully sent.

6. `GET /api/reconfirm/:token`: Endpoint to confirm a user's email address again after a token has been resent.
    - Request should include the new confirmation token sent to the user's email.
    - Response should indicate whether the confirmation was successful.

7. `POST /api/resetPassword`: Endpoint to allow a user to request a code to reset their password.
    - Request should include the user's email.
    - Response should indicate whether the code was successfully sent.

8. `PATCH /api/forgetPassword`: Endpoint to allow a user to reset their password using a code.
    - Request should include the user's email, new password, and the code sent to their email.
    - Request should be validated using the `ResetPasswordValidation` middleware.
    - Response should indicate whether the password reset was successful.

# Post

1. POST /api/addPost: Endpoint to create a new post.

    - Request body should include the post's title and description.
    - Request should include images uploaded using the multerFn middleware, which will store the images in the posts directory.
    - Request should be validated using the addPostValidation middleware.
    - Request should be authorized using the postAPI.addPost middleware.
    - Response should include the new post's data.

2. PUT /api/:id/like_unlike: Endpoint to like or unlike a post.

- Request should include the post ID.
- Request should be validated using the LikePostValidation middleware.
- Request should be authorized using the postAPI.addPost middleware.
- Response should include the updated post's data with the user's like status.

# Comments

1. `POST /api/:id/addComment`: Endpoint to add a comment to a post.
    - Request should include the post ID.
    - Request body should include the comment text.
    - Request should be validated using the `addCommentValidation` middleware.
    - Request should be authorized using the `postAPI.addPost` middleware.
    - Response should include the updated post's data with the new comment.

2. `PUT /api/:id/like_unlike`: Endpoint to like or unlike a post's comment.
    - Request should include the post ID and comment ID.
    - Request should be validated using the `LikePostValidation` middleware.
    - Request should be authorized using the `postAPI.addPost` middleware.
    - Response should include the updated post's data with the user's like status for the comment.

3. `PATCH /api/:postId/replayComment/:commentId`: Endpoint to add a reply to a comment.
    - Request should include the post ID and comment ID.
    - Request body should include the reply text.
    - Request should be authorized using the `postAPI.addPost` middleware.
    - Response should include the updated post's data with the new reply.

# Admin

1. `GET /api/AllUsers`: Endpoint to get all users.
    - Request should be authorized using the `adminAPI.getAllUsers` middleware.
    - Response should include an array of all the user's data.

2. `GET /api/AllPosts`: Endpoint to get all posts.
    - Request should be authorized using the `adminAPI.getAllPosts` middleware.
    - Response should include an array of all the post's data.

3. `PATCH /api/:id/changeRole`: Endpoint to change a user's role.
    - Request should include the user ID.
    - Request should include the new role in the request body.
    - Request should be authorized using the `adminAPI.changeRole` middleware.
    - Response should include the updated user's data.

4. `PATCH /api/:id/blockUser`: Endpoint to block a user.
    - Request should include the user ID.
    - Request should include the `isBlocked` boolean value in the request body.
    - Request should be authorized using the `adminAPI.changeRole` middleware.
    - Response should include the updated user's data.

# User

1. `GET /api/AllDetails`: Endpoint to get user's profile details.
    - Request should be authorized using the `userAPI.geDetails` middleware.
    - Request should include the user ID in the request body.
    - Response should include the user's profile details.

2. `PUT /api/uploadProfilePic`: Endpoint to upload a user's profile picture.
    - Request should be authorized using the `userAPI.changePicture` middleware.
    - Request should include an image file with the key `image` in the request body.
    - Response should include the URL of the uploaded image.

3. `PUT /api/uploadCoverPics`: Endpoint to upload multiple cover pictures for a user's profile.
    - Request should be authorized using the `userAPI.changePicture` middleware.
    - Request should include an array of image files with the key `images` in the request body.
    - Response should include an array of URLs of the uploaded images.

4. `PUT /api/uploadPDF`: Endpoint to upload a PDF file to a user's profile.
    - Request should be authorized using the `userAPI.changePicture` middleware.
    - Request should include a PDF file with the key `pdf` in the request body.
    - Response should include the URL of the uploaded PDF.

5. `PATCH /api/editPassword`: Endpoint to update a user's password.
    - Request should be authorized using the `userAPI.changePicture` middleware.
    - Request should include the user's ID, old password, and new password in the request body.
    - Response should include a message confirming that the password has been updated.

6. `GET /api/qr`: Endpoint to get a user's QR code.
    - Request should be authorized using the `userAPI.changePicture` middleware.
    - Request should include the user ID in the request body.
    - Response should include the QR code as an image.
## Getting Started

To get started with the Instagram NodeJS application, you'll need to do the following:

1. Clone the repository:

   ```bash
   git clone https://github.com/engyahmed7/instagram_nodeJs.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the project with the following keys:

   - `MONGODB_CONN`     - Add Your MongoDB_URL 
   - `KEY_JWT`          - Add Your JWT Key
   - `SENDGRID_API_KEY` - Add Your SendGrid API Key

4. Run the application:

   ```bash
   npm start
   ```


# Authorization
To access the API endpoints, you'll need to authenticate with your Instagram account by sending an authorization header with the value Bearer <access_token>. You can obtain an access token by authenticating with your Instagram account using the /auth/instagram route.

## Contributing

If you'd like to contribute to the Instagram NodeJS application, please follow these steps:

1. Fork the repository
2. Create a new branch for your changes:

   ```bash
   git checkout -b my-new-branch
   ```

3. Make your changes and commit them:

   ```bash
   git commit -am 'Add some feature'
   ```

4. Push your changes to your fork:

   ```bash
   git push origin my-new-branch
   ```

5. Submit a pull request
