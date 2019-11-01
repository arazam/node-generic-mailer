const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");


// routes
router.post('/', mail);

module.exports = router;

async function mail(req, res, next) {


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: "mail.trueverifier.com",
        // port: 465,587,
        // secure: true, // true for 465, false for other ports
        // auth: {
        //   user: "app@trueverifier.com", // generated ethereal user
        //   pass: "#5=K~2_5TUPo" // generated ethereal password
        // host : "smtp.zoho.in" host : "smtp.gmail.com",}
        host : "smtp.usedpartsus.com",
        port: 465,
        secure: false, // true for 465, false for other ports
        auth: {
         // user: "fredsmith.1376@gmail.com", // generated ethereal user
         // pass: "GjsAUnXCK5vt" // generated ethereal password
	 user: "enquiries@usedpartsus.com", // generated ethereal user
         pass: "tzBw[d-69B4a" // generated ethereal password	
        }
      });

      let fullMessaage = '';
      let keys = Object.keys(req.body);
      let index = keys.indexOf("name");
      let relevantKeys = keys.splice(index);

      relevantKeys.forEach(x => {
	      fullMessaage = fullMessaage.concat(x+":"+req.body[x]+"\n")
      })

      // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"${req.body.name}""${req.body.email}"`, // sender address
     // to: "app@trueverifier.com,info@databeyz.com, sufianada@gmail.com, info.trueverfier@gmail.com", // list of receivers
     // to: "zaxonppc2019@gmail.com,shahid@emsoftware.in,",  
	to: "zaxonppc2019@gmail.com,fredsmith.1376@gmail.com,",
      subject: `"${req.body.subject}"`, // Subject line
      text: `${fullMessaage}`, // plain text body
    }).then(cb => {
      res.status(250);
      res.end('mail sending ok');
    })
    .catch(err => next(err));
}
