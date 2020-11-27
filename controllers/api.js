const bcrypt = require('bcryptjs')
const db = require('../db');


module.exports = {
    insertBannerHome : (req,res) => {
        let sql = `insert into slider set ?`
        let imageFile = req.files.file;
        let filename = imageFile.name
        let fileNameWithoutSpace = filename.replace(/\s/g, '');

        let data ={
            imageName: fileNameWithoutSpace,
            page:'home'
        }

        if (req.files !== null) {
            imageFile.mv(`${__dirname}/../images/homeslider/${fileNameWithoutSpace}`, function (err) {
                if (err) {
                    return res.status(500).send({success:false,file:req.files,body:req.body});
                } else{
                    db.query(sql, data, (err, result) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log(result);
                            res.status(201).send(result)
                        }
                    })
                }
            });
        } else {
            return res.status(200).send({success:false,message:'File tidak ada'});
        }

    },
    getBannerHome:(req,res) => {
        let sql = `select * from slider2`

        db.query(sql, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
                res.status(201).send(result)
            }
        })
    },
    deleteBannerHome : (req,res) => {
        let sql = `delete from slider where idslider = ${req.body.id}`

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }

        })
    },

}