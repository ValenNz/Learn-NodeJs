const db = require('../config/connection');
module.exports={
    add:(data,callBack)=>{
        db.query(`insert into anggota set ?`,
        [data],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null,results)
            }
        })
    }, 
    get:(callBack)=>{
        db.query(`select * from anggota`,
        [],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null, results)
            }
        })
    },
    getId:(data,callBack)=>{
        db.query(`select * from anggota where id_anggota = ?`,
        [data],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null,results)
            }
        })
    },
    update:(data,callBack)=>{
        db.query(`select * from anggota where id_anggota=?`,
        [data.id_anggota],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                db.query(`update anggota set ? where id_anggota = ?`,
                [
                    data,
                    data.id_anggota
                ]);
                return callBack(null,results[0])
            }
        })
    },
    del:(data,callBack)=>{
        db.query(`select id_anggota from anggota where id_anggota = ?`,
        [data],
        (err,results)=>{
            if(err){
                return callBack(err)
            }else{
                db.query(`delete from anggota where id_anggota = ?`, 
                [data]); 
                return callBack(null,results[0])
            }
        })
    }
} 