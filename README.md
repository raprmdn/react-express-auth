## React Express Authentication

This is a simple example of how to use React with Express to create a simple authentication system.

Authentication is done using JSON Web Tokens (JWT), Google OAuth2 using [gsi](https://developers.google.com/identity/gsi/web/guides/overview).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- Google OAuth2 credentials (see [here](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) for more info)

### Installation

Clone the repository
```bash
git clone https://github.com/raprmdn/react-express-auth.git
```

Install dependencies in both the client and express directories
```bash
npm install
```

configure the environment variable in both the client and express directories.

Go to the [Google Cloud Platform](https://console.cloud.google.com/apis/credentials) to get your Client ID and Client Secret. Then, paste to the following line.

```bash
# copy the .env.example file to .env
cp .env.example .env

# client
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

REACT_APP_SERVER_URL=http://localhost:5000

# express
NODE_ENV=

PORT=5000

DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_DIALECT=

ACCESS_TOKEN_SECRET_KEY=
REFRESH_TOKEN_SECRET_KEY=

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/login/google
```

### Running the app
To start the app, run the following command.
```bash
# start the client
npm start

# start the express server
npm run dev
```

## Screenshots application
![sign-with-google](https://user-images.githubusercontent.com/71953516/200273130-c2978854-9e4b-495e-82d6-cea82eff7a13.jpg)
![sign-with-google-2](https://user-images.githubusercontent.com/71953516/200273190-55321be1-3bed-4e48-8be5-d3eb7b719d1d.jpg)
![sign-with-google-3](https://user-images.githubusercontent.com/71953516/200273209-aa647cb3-c641-4231-ae69-e037a5a1a4fa.jpg)

