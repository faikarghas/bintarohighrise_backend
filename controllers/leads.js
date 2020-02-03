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
                res.json({success:true,message:'post'})
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