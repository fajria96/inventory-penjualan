import Customer from "../models/Customer.js";
import path from "path";
import fs from "fs";

export const getCustomers = async(req, res)=>{
    try {
        const response = await Customer.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCustomerById = async(req, res)=>{
    try {
        const response = await Customer.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveCustomer = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const nama = req.body.nama;
    const contact = req.body.contact;
    const email = req.body.email;
    const alamat = req.body.alamat;
    const diskon = req.body.diskon;
    const tipe_diskon = req.body.tipe_diskon;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Customer.create({nama: nama, contact: contact, email: email, alamat: alamat, diskon: diskon, tipe_diskon: tipe_diskon, ktp: fileName, url: url});
            res.status(201).json({msg: "Item Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateCustomer = async(req, res)=>{
    const customer = await Customer.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!customer) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = customer.ktp;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${customer.ktp}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }

    const nama = req.body.nama;
    const contact = req.body.contact;
    const email = req.body.email;
    const alamat = req.body.alamat;
    const diskon = req.body.diskon;
    const tipe_diskon = req.body.tipe_diskon;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Customer.update({nama: nama, contact: contact, email: email, alamat: alamat, diskon: diskon, tipe_diskon: tipe_diskon, ktp: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Customer Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCustomer = async(req, res)=>{
    const customer = await Customer.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!customer) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${customer.ktp}`;
        fs.unlinkSync(filepath);
        await Customer.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Item Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}