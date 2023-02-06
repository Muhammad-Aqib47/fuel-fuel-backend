const { usersTableQueries } = require("../utils/user-queries");
const {pool} = require("../connections/postgre");
const { createUserQueries } = usersTableQueries;

const createQuery = async(req, res)=>{
  const{name, email, query} =req.body;
 
  try{
    const result = await pool.query(createUserQueries,[name, email, query])  
    res.status(200).json({message: "You query has been received."});

  }
  catch(error){
     res.json({message: error});
  }
};

module.exports = { createQuery };
