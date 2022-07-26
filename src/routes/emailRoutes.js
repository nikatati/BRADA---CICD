
import express from 'express';
import nodemailer from 'nodemailer';
import User from '../dbModels/user.js';
import expressAsyncHandler from 'express-async-handler';
const emailRouter = express.Router();

emailRouter.post('/', (req, res) => {
  const { name, email, topic, message } = req.body;
  if (message.length > 2000){
    res.status(500).send({ message: 'Max length of text 2000 chars' });
  }
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'theperfectgroup8@gmail.com',
      pass: 'project2022'
    }
  });
  transporter.sendMail({
    from: `${email}`,
    to: 'theperfectgroup8@gmail.com',
    subject: `${topic}`,
    html: `<h3>Contact Details</h3>
    <ul>  
      <li>Name: ${name}</li>
      <li>Email: ${email}</li>
    </ul>
    <h3>${topic}</h3>
    <p>${message}</p>`, // html body
  },
    (error, body) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: 'Error in sending email' });
      } else {
        console.log(body);
        res.send({ message: 'Email sent successfully' });
      }
    });
});

emailRouter.post('/resetpassword', (req, res) => {
  const { pin, email } = req.body;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'theperfectgroup8@gmail.com',
      pass: 'project2022'
    }
  });
  transporter.sendMail({
    from: 'theperfectgroup8@gmail.com',
    to: `${email}`,
    subject: 'Verification Code',
    html: `<h3>Verification Code</h3>
    <p>Your verification code is: ${pin}</p>`, // html body
  },
    (error, body) => {
      if (error) {
        console.log(error);
        res.status(500).send({ message: 'Error in sending verification code' });
      } else {
        console.log(body);
        res.send({
          pin: pin,
          email: email,
          message: 'Verification code sent to email'
        });
      }
    });
});

emailRouter.post('/push',
  expressAsyncHandler(async (req, res) => {
    const { topic, message } = req.body;
    const usersEmail = await User.find({}, 'email');
    const temp = [];
    for (let useremail in usersEmail) {
      console.log(usersEmail[useremail].email);
      temp.push(usersEmail[useremail].email);
    }
    const tempSpace = temp.join(', ');

    console.log(tempSpace);

    if (usersEmail) {
      //console.log(usersEmail);
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'theperfectgroup8@gmail.com',
          pass: 'project2022'
        }
      });
      transporter.sendMail({
        from: 'theperfectgroup8@gmail.com',
        to: `${tempSpace}`,
        subject: `${topic}`,
        html: `<h3>${topic}</h3>
        <p>${message}</p>`, // html body
      },
        (error, body) => {
          if (error) {
            console.log(error);
            res.status(500).send({ message: 'Error in sending email to all users' });
          } else {
            console.log(body);
            res.send({
              message: 'Email sent to all users'
            });
          }
        });
    }
    else {
      res.status(500).send({ message: 'Error in find users email' });
    }
  })
);

export default emailRouter;
// emailRouter.post('/', (req, res) => {
//     const { name, email, topic, message } = req.body;
//     mailgun()
//       .messages()
//       .send(
//         {
//           from: `${name} <${email}>`,
//           to: 'theperfectgroup8@gmail.com',
//           subject: `${topic}`,
//           html: `<p>${message}</p>`,
//         },
//         (error, body) => {
//           if (error) {
//             console.log(error);
//             res.status(500).send({ message: 'Error in sending email' });
//           } else {
//             console.log(body);
//             res.send({ message: 'Email sent successfully' });
//           }
//         }
//       );
//   });
