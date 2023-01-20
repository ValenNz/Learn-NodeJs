const {
    add,
    get,
    getId,
    update,
    del,
    serviceGetUserByEmail
 } = require('../service/petugasService');
 const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
 const { sign } = require('jsonwebtoken');
 module.exports = {
    controllerAdd:(req,res)=>{
        data_petugas = {
            id_petugas : req.body.id_petugas,
            nama_petugas : req.body.nama_petugas,
            jabatan    : req.body.jabatan,
            telepon : req.body.telepon,
            email : req.body.email,
            password : req.body.password
        }
        const salt = genSaltSync(10);
        data_petugas.password = hashSync(data_petugas.password, salt);
        add(data_petugas,(err,results)=>{
            if(err){
                console.log(err)
                return
            }else{
                return res.json({
                    success:1,
                    data:results
                }) 
            }
        })
    },
 
    controllerGet:(req,res)=>{
        get((err,results)=>{
            if(err){
                console.log(err)
                return
            }else{
                return res.json({
                    success:1,
                    data:results
                })
            }
        })
    },
 
    controllerGetId:(req,res)=>{
        const body = req.body.id_petugas
        getId(body,(err,results)=>{
            if(err){
                console.log(err)
                return
            }else{
                return res.json({
                    success:1,
                    data:results
                })
            }
        })
    },
 
    controllerUpdate:(req,res)=>{
        const data_petugas = {
            id_petugas : req.body.id_petugas,
            nama_petugas: req.body.nama_petugas,
            jabatan : req.body.jabatan,
            telepon : req.body.telepon
        }
       
        update(data_petugas,(err,results)=>{
            if(err){
                console.log(err)
                return 
            }else if(!results){
                return res.json({
                    success : 0,
                    message : "Not Found"
                })
            }else{
                return res.json({
                    success:1,
                    data:results
                })
            }
        })
    },
 
    controllerDelete:(req,res)=>{
        const body = req.body.id_petugas
        del(body,(err,results)=>{
            if(err){
                console.log(err)
                return
            }else if(!results){
                return res.json({
                    success:0,
                    message:"Not Found"
                })
            }else{
                return res.json({
                    success:1,
                    message:"Delete Success"
                })
            }
        })
    },
 
    controllerLogin:(req,res)=>{
        const body = req.body;
        serviceGetUserByEmail(body.email,(err,results)=>{
            if(err){
                console.log(err)
            }if(!results){
                return res.json({
                    success:0,
                    message:"Invalid email"
                })
            } 
            const result= compareSync(body.password,results.password)
            console.log(result);
            console.log(results.password);
            console.log(body.password);
 
            if(result ){
                results.password = undefined
                const jsonwebtoken = sign({result:results},"secretkey",{
                    expiresIn:"1h"
                })
                return res.json({
                    success:1,
                    message:"Login succesfuly, Your Acount Already Use",
                    account: results,
                    token:jsonwebtoken
                })
            }else{
                return res.json({
                    success:0,
                    message:"Password invalid"
                })
            }
        })
    }
 } 