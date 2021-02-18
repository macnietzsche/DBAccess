function QueryStatus(response,requestType){
    if(response){
        if(`affectedRows` in response){
            if(response.affectedRows>0){
                return [true,`${requestType} successful`];
            }else{
                return [false,`${requestType} failed`]
            }
        }else if(`errno` in response){
            return [false,`${requestType} failed | Error ${response.errno}: ${response.sqlMessage}`]
        }else{
            return [false,`${requestType} failed`]     
        }
    }else{
        return [false,`${requestType} failed`]
    }
}



module.exports=QueryStatus;