const testRoute = async (req, res)=>{
  try{
    res.status(200).json({
      success:true,
      message:"Server Works"
    })
  }catch(error){
    res.status(500).json({
      success:false,
      message:error
    })
  }
}

module.exports ={
  testRoute
}