const bcrypt = require('bcryptjs')
const db = require('../db');


module.exports = {
    insertBannerPromo : (req,res) => {
        let sql = `insert into slider set ?`
        let imageFile = req.files.file;
        let filename = imageFile.name
        let fileNameWithoutSpace = filename.replace(/\s/g, '');

        let data ={
            imageName: fileNameWithoutSpace,
            page:req.body.page
        }

        if (req.files !== null) {
            imageFile.mv(`${__dirname}/../images/promo/${fileNameWithoutSpace}`, function (err) {
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
    getBannerPromo:(req,res) => {
        let sql = `select * from slider  where page = ${req.params.slug}`

        db.query(sql, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
                res.status(201).send(result)
            }
        })
    },
    deleteBannerPromo : (req,res) => {
        let sql = `delete from slider where idslider = ${req.body.id}`

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }

        })
    },
    insertTextPromo : (req,res) => {
        let sql = `insert into text set ?`

        let data = {
            description : req.body.description,
            page: req.body.pae
        }

        db.query(sql, data, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
                res.status(201).send(result)
            }
        })
    },
    editTextPromo : (req,res) => {
        let sql = `update text set ? where page = ${req.body.page}`;

        let data = {
            description : req.body.description
        }

        db.query(sql, data, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
                res.status(201).send(result)
            }
        })
    },
    getTextPromo : (req,res) => {
        let sql = `select * from global_data where pvar4 = '${req.params.slug}'`;


        db.query(sql, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
                res.status(201).send(result)
            }
        })
    },
    getPromo : (req,res) => {
        let sql = `select * from global_data where pvar2 = '${req.params.slug}'`;

        db.query(sql, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
                res.status(201).send(result)
            }
        })
    },

}