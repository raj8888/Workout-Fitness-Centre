function get_date(){
    let date= new Date();
    var year = date.getFullYear();
    var mes = date.getMonth()+1;
    var dia = date.getDate();
    var today =dia+"-"+mes+"-"+year;
    return today;
}
function get_time(){
    let date= new Date();    
    let hours= date.getHours();
    let mins= date.getMinutes();
    let sec= date.getSeconds();
    var time = hours+":"+mins+":"+sec;
    return time;
}

module.exports={
    get_date,get_time
}