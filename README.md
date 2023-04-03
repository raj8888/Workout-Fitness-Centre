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


## Tech Stack

**Client:** HTML, CSS, JavaScript,Jquery

**Server:** Node.js, Express.js, Nodemailer,Mongoose

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

Client Dashboard:

![App Screenshot](https://i.ibb.co/m95Smws/Screenshot-294.png)

Trainer Dashboard:

![App Screenshot](https://i.ibb.co/ZNMxpLR/Screenshot-296.png)

Search Class Page:

![App Screenshot](https://i.ibb.co/0VNx6jQ/Screenshot-288.png)

Class Information Page:

![App Screenshot](https://i.ibb.co/44QG3dL/Screenshot-290.png)

System Design:

![App Screenshot](https://i.ibb.co/nMXhWhk/SD-Workout-fitness-center.png)




## Demo

[https://velvety-starburst-b38fa3.netlify.app](https://velvety-starburst-b38fa3.netlify.app)

## Authors

- [@sarveshgupta1997](https://github.com/sarveshgupta1997)
- [@ajayjamage3](https://github.com/ajayjamage3)
- [@raj8888](https://github.com/raj8888)
- [@faisalpinitod](https://github.com/faisalpinitod)
- [@ramsarraf11](https://github.com/ramsarraf11)
