# URL Shortener

A simple URL shortener built with Node.js, Express, MongoDB, and EJS.

## Features

- Shorten long URLs
- Redirect to original URL using short ID
- Track visit history with timestamps
- View analytics (total clicks) for each short URL
- Simple web interface

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **View Engine**: EJS
- **Other**: shortid

## Installation

1. Clone the repository
```
git clone https://github.com/raman123-mandal/URLShortner.git
```

2. Install dependencies
```
npm install
```

3. Make sure MongoDB is running on your machine

4. Start the server
```
npm start
```

The server will run on `http://localhost:3000`

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home page |
| POST | `/url` | Create short URL |
| GET | `/url/:shortId` | Redirect to original URL |
| GET | `/url/analytics/:shortId` | Get visit analytics |
