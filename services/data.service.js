
  let  accountDetails={
      1000:{acno:1000,balance:1000,username:"userone",password:"testuser"},
  
      1001:{acno:1001,balance:1000,username:"usertwo",password:"testuser2"},
  
      1002:{acno:1002,balance:1500,username:"userthree",password:"testuser3"}
  }

let currentUser;

  const register=(acno,username,password)=>{
      console.log('register called')
    if(acno in accountDetails){
        return{
            status:false,
            statusCode:401,
            message:"User already exists"
        }
    }
    accountDetails[acno]={
        acno,
        balance:0,
        username,
        password
    }
    return{
        status:true,
        statusCode:201,
        message:"Registration successful"
    }
  }


  const login=(req,acno,password)=>{
    if(acno in accountDetails){
      var p=accountDetails[acno].password
      if(password==p){
        req.session.currentUser=accountDetails[acno]
        //this.saveDetails();
        return{
            status:true,
            statusCode:201,
            message:"Login successful"
        }
      }
      else{
        return{
            status:false,
            statusCode:401,
            message:"Incorrect password"
        }
      }
    }
    else{
      return{
        status:false,
        statusCode:423,
        message:"User doesnt exists"
    }
    }
  }

  const deposit=(req,acno,password,amt)=>{
    var amount=parseInt(amt);
    if(acno in accountDetails){
      var p=accountDetails[acno].password
      console.log(p);
      console.log(password);
      if(password==p){ 
        accountDetails[acno].balance+=amount;
        return{
          status:true,
          statusCode:201,
          balance:accountDetails[acno].balance,
          message:"Account credited with amount "+amount
        }
      }
      else{
        return{
          status:false,
          statusCode:401,
          message:"Invalid Password"
      }
      }
  }
  else{
    return{
      status:false,
      statusCode:423,
      message:"Invalid Account Number"
  }
  }

}

const withdraw=(req,acno,password,amt)=>{
  var amount=parseInt(amt);
  if(acno in accountDetails){
    var p=accountDetails[acno].password
    if(password==p){ 
      if(accountDetails[acno].balance<amount){
        return{
          status:true,
          statusCode:450,
          balance:accountDetails[acno].balance,
          message:"Low Balance"
      }
      }
      else{
        accountDetails[acno].balance-=amount;
        return{
          status:true,
          statusCode:201,
          balance:accountDetails[acno].balance,
          message:"Account debited with amount "+amount
      }
      }
    }
    else{
      return{
        status:false,
        statusCode:423,
        message:"Invalid Password"
    }
    }
}
else{
  return{
    status:false,
    statusCode:423,
    message:"Invalid Account Number"
}
}

}

  module.exports={
      register,login,deposit,withdraw
  }