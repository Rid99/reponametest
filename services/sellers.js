const db = require('./db');

const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM sellers LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


  async function create(sellers){
    const result = await db.query(
      `INSERT INTO sellers 
      (firstname,lastname,address,sellerID,activeMark,contactno,email) 
      VALUES 
      ('${sellers.firstname}', '${sellers.lastname}', '${sellers.address}','${sellers.sellerID}','${sellers.activeMark}','${sellers.contactno}','${sellers.email}')`
    );
  
    let message = 'Error in creating sellers';
  
    if (result.affectedRows) {
      message = 'seller created successfully';
    }
  
    return {message};
  }

 

  async function remove(sellerID){
    const result = await db.query(
      `DELETE FROM sellers WHERE sellerID='${sellerID}'`
    );
  
    let message = 'Error in deleting seller';
  
    if (result.affectedRows) {
      message = 'seller deleted successfully';
    }
  
    return {message};
  }

  module.exports = {
    getMultiple,
    create,
    remove
  };