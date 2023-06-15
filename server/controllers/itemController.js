import Item from "../models/Item.js";
import path from "path";
import fs from "fs";

export const getItems = async(req, res)=>{
    try {
        const response = await Item.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getItemById = async(req, res)=>{
    try {
        const response = await Item.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveItem = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const nama_item = req.body.title;
    const unit = req.body.unit;
    const stok = req.body.stok;
    const harga_satuan = req.body.harga_satuan;
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
            await Item.create({nama_item: nama_item, unit: unit, stok: stok, harga_satuan: harga_satuan, barang: fileName, url: url});
            res.status(201).json({msg: "Item Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateItem = async(req, res)=>{
    const item = await Item.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!item) return res.status(404).json({msg: "No Data Found"});
    
    let fileName = "";
    if(req.files === null){
        fileName = item.barang;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filepath = `./public/images/${item.barang}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }

    const nama_item = req.body.title;
    const unit = req.body.unit;
    const stok = req.body.stok;
    const harga_satuan = req.body.harga_satuan;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Item.update({nama_item: nama_item, unit: unit, stok: stok, harga_satuan: harga_satuan, barang: fileName, url: url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Item Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteItem = async(req, res)=>{
    const item = await Item.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!item) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./public/images/${item.barang}`;
        fs.unlinkSync(filepath);
        await Item.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Item Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}