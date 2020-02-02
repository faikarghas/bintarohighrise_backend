const db = require('../db')
const nodemailer = require('nodemailer')

module.exports = {
    post : (req, res) => {
        let data = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            category: req.body.category
        }

        console.log(data);

        let sql = 'insert into leads_form set ?'
        db.query(sql, data, (err, result)=>{
            if (err) {
                res.json({success:false,message:'gagal post'})
            } else {
                var transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
					port: 465,
					secure: true,
					pool:true,
                    auth: {
                            user: '',
                            pass: ''
                       }
                });
                const mailOptions = {
                    from: 'Bintaro High Rise" email@gmail.com', // sender address
                    to: 'email@gmail.com', // list of receivers
                    subject: 'Leads Form', // Subject line
                    html:   `
                            <h4>Name :</h4>
                            <p style="margin:0;">${req.body.name}</p> <br/>
                            <h4>Email :</h4>
                            <p style="margin:0;">${req.body.email}</p> <br/>
                            <h4>Phone Number :</h4>
                            <p style="margin:0;">${req.body.phoneNumber}</p> <br/>
                            <h4>Category :</h4>
                            <p style="margin:0;">${req.body.category}</p> <br/>
                            `,
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if(err){
                        res.send(err)
                    }else {
                        res.send(info)
                    }
                    res.status(201).send(err,info)
                });
            }
        })
    },

    get : (req,res) => {
        let sql = 'select * from leads_form order by timestamp ASC'

        db.query(sql,(err,result)=>{
            res.send(result)
        })
    }
}