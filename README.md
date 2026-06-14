# Caterers Near Me

A full-stack web application that helps users discover and explore catering services for events, weddings, parties, and corporate functions.

## Live Demo

URL = https://caterers-near-me-iota.vercel.app/caterers

## GitHub Repository

URL = https://github.com/biradarvivek/Caterers-near-me

---

## Features

### Frontend

* View all caterers
* Search caterers by name
* Filter caterers by maximum price per plate
* Sort caterers by:

  * Price: Low to High
  * Price: High to Low
  * Rating
* Add new caterers through a form
* Responsive modern UI
* Loading and empty states

### Backend

* RESTful API using Express.js
* MongoDB Atlas integration
* Create caterers
* Fetch all caterers
* Fetch caterer by ID
* Search, filter, and sort functionality
* Input validation and error handling

---

## Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* CORS
* Dotenv

---


## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/biradarvivek/Caterers-near-me
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend will run on:

```text
http://localhost:3000
```

Backend will run on:

```text
http://localhost:5000
```

---

## Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

---
