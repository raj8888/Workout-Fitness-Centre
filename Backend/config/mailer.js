const nodemailer = require("nodemailer");

const mailOrderDetail = (order, classes, user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "forsmmpanel@gmail.com",
      pass: "noymjrhbxjwiclin",
    },
  });

  transporter
    .sendMail({
      to: user.email,
      from: "forsmmpanel@gmail.com",
      subject: "Congratulations! Order successful from Workout Fitness Center",
      text: "from Workout Fitness Center",
      html: `
        <h1>Your OTP is :- sup</h1>
        <h1>Hello ${user.name}</h1>
        <p>Thank you for booking a fitness class with us.</p>
        <h2>Here are your order details:-<h2> 
        <p><b>Order ID: </b>${order._id}</p>
        <p><b>Order Total:: </b>₹ ${classes.price}</p>
        <p><b>Class: </b>${classes.title}</p>
        <p><b>Trainer: </b>${classes.trainerName}</p>
        <p><b>Class Date: </b>${classes.classDate}</p>
        <p><b>Class Time: </b>${classes.classTime}</p>
        <p><b>Venue: </b>${classes.venue}</p>
        <p><b>Class Link: </b>${classes.locationOrLink}</p>        
      `,
    })
    .then((info) => {
      console.log(info.response);
      console.log("mail send");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { mailOrderDetail };
