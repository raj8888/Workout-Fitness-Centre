# WorkOut.com

Workout Fitness Center is a simple sports and wellness app where users can schedule a wellness class created by a wellness-certified trainer and certified trainers can create a wellness class and earn money from them.


## Features

- Authentication
- Authorization
- Responsive
- Mail Service
- Booking a class
- Create a class(Online / Offline)
- Payment Feature
- Google Oauth
- Chat Functionality

## Tech Stack

**Client:** HTML, CSS, JavaScript,Jquery

**Server:** Node.js, Express.js, Nodemailer,WebSockets,Mongoose

**Database:** MongoDB, Redis

## Run Locally

Clone the project

```bash
  git clone https://github.com/raj8888/kind-stitch-7991
```

Go to the project directory

```bash
  cd kind-stitch-7991
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`mongourl`

`port`

`salt`

`secretkey`

`refreshSecretKey`


## API Reference

#### Welcome

```http
  GET /api
```

#### User / Trainer Register

```http
  POST /api/user/register
```

#### User / Trainer Login

```http
  POST /api/user/login
```

#### All Classs

```http
  GET /api/class/all
```

#### All Users

```http
  GET /api/user/all
```

#### Create Class From Trainer Side

```http
  POST /api/class/create
```

#### Book Class From User Side

```http
  POST /api/order/checkAvailablity
```

#### Update Class (Trainer Only)

```http
  PATCH /api/order/update/:id
```

#### Delete Class (Trainer Only)

```http
  DELETE /api/order/delete/:id
```

## Screenshots

![App Screenshot](https://images.pexels.com/photos/14656105/pexels-photo-14656105.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)
![App Screenshot](https://images.pexels.com/photos/14656105/pexels-photo-14656105.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)
![App Screenshot](https://images.pexels.com/photos/14656105/pexels-photo-14656105.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)

## Demo

[https://velvety-starburst-b38fa3.netlify.app](https://velvety-starburst-b38fa3.netlify.app)

## Authors

- [@sarveshgupta1997](https://github.com/sarveshgupta1997)
- [@ajayjamage3](https://github.com/ajayjamage3)
- [@raj8888](https://github.com/raj8888)
- [@faisalpinitod](https://github.com/faisalpinitod)
- [@ramsarraf11](https://github.com/ramsarraf11)
