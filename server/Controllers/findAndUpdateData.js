const Patients_listSchema = require("../Models/patients_list");
exports.findAndUpdateData=  (req, res)=>{
    try {
        const arrResData=[]
        req.body.length &&  req.body.forEach((el, i)=>{
            Patients_listSchema.findOneAndUpdate({_id:el._id}, el, {new:true}).then((doc, err)=>{
                arrResData.push(doc)
                if(i===req.body.length-1){
                    res.send(arrResData)
                }
             }).catch((e)=>console.log('Ошибка update'))
        })

    }catch (e) {
        res.status(400).send({message:'Ошибка findAndUpdateData'})
    }
}