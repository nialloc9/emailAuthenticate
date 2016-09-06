function get_time(class_name){

    //get class
    var input = '.' + class_name;

    //get times
    var currentTime = new Date();
    hour = currentTime.getHours();
    min  = currentTime.getMinutes();
    sec  = currentTime.getSeconds();

    if(hour < 10){
        var hour = '0'+hour;
    }

    if(min < 10){
        var min = '0' + min;
    }

    if(sec < 10){
        var sec = '0' + sec;
    }


    //get dates
    var date = new Date();
    currentDate = date.getDate();     // Get current date
    month       = date.getMonth() + 1; // current month
    year        = date.getFullYear();

    if(currentDate < 10){
        var currentDate = '0' + currentDate;
    }

    if(month < 10){
        var month = '0' + month;
    }

    //create timestamp
    var time_stamp = year + "-" + month + "-" + currentDate + " " + hour + ":" + min + ":" + sec;

    //render timestamp to inputs
    $(input).each(function(){
        $(this).val(time_stamp);
    });
}