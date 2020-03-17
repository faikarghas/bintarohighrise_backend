const db = require('../db')
const nodemailer = require('nodemailer')

module.exports = {
    post : (req, res) => {
        let data = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            category: req.body.category,
            utmSource: req.body.utmSource,
        }

        console.log(data);

        let sql = 'insert into leads_form set ?'
        db.query(sql, data, (err, result)=>{
            if (err) {
                res.json({success:false,message:'gagal post'})
                console.log(err);
            } else {
                res.json({success:true,message:'post'})
                console.log(result);

            }
        })
    },

    get : (req,res) => {
        let sql = `select name,email,phoneNumber,category,utmSource, DATE_FORMAT(timestamp, '%d-%m-20%y   %H:%i:%S') AS timestamp from leads_form order by timestamp DESC`

        db.query(sql,(err,result)=>{
            console.log(result);
            res.send(result)
        })
    },

    postwa: (req,res) => {
        let data = {
            phoneNumber: req.body.phoneNumber,
        }

        let sql = 'insert into wa set ?'

        db.query(sql, data, (err, result)=>{
            if (err) {
                res.json({success:false,message:'gagal post'})
                console.log(err);
            } else {
                res.json({success:true,message:'post'})
                console.log(result);

            }
        })
    }
}