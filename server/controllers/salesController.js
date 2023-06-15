import Sales from "../models/Sales.js";

export const getSales = async(req, res)=>{
    try {
        const response = await Sales.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getSalesByDate = async(req, res)=>{
    try {
        const response = await Sales.getByDate({
            where:{
                id : req.body.tanggal_transaksi
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getSalesByCustomer = async(req, res)=>{
    try {
        const response = await Sales.getByCustomer({
            where:{
                id : req.params.customer_id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveSale = async(req, res)=>{
   try {
    const isSalesExist = await Sales.findSales(req.body.code_transaksi);
    if(isSalesExist !== null) {
      res.status(400).json({msg: "Sales Already Existed"});
    } else {
      const {data: newSales, error} = await Sales.create(req.body);
      if(error !== null){
        res.status(400).json({msg: "Customer Not Found"});
      } else {
        const result = await Sales.update(newSales, req.body.items)
        res.status(200).json({msg: "Sales Updated Successfuly"});
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export const deleteSale = async(req, res)=>{
    try {
    const isSalesExist = await Sales.findSales(req.body.code_transaksi);
    if(isSalesExist === null) {
      res.status(400).json({msg: "Sales Not Found"});
    }

    const deleted = await Sales.delete(isSalesExist.id);
    res.status(200).json({msg: "Delete Sales Success"}); 
  } catch (error) {
    res.status(500).json({msg: "Internal Server Error"});
  }
}