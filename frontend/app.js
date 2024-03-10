    /*function showCharm(id){
        var  charm = $(id).data("charm");
        if (charm.element.data("opened") === true) {
            charm.close();
        } else {
            charm.open();
        }
    };*/

    function bodyLoad() {
        if(typeof(Storage) !== "undefined") {
//            alert("Supported");
            /*$.Notify({
                caption: 'Local Storage',
                content: 'Local storage is supported in your browser. You can perform localStorage actions.',
                type: 'success',
                icon:'<img src="icon2.png">'
            });*/
            
        }
        document.addEventListener("deviceready", onDeviceReady, false);
//        $("#accordion").accordion();
    }

    function onDeviceReady () {
    	alert("Device is ready");
        
        
        if(typeof(Storage) !== "undefined") {
            alert("Supported");
        }
            
    };

var store = {};
$("#regButton").on('click',function(){
    var pass1 = $("input[name=pass1]").val();
    var pass2 = $("input[name=pass2]").val();
    
    if(pass1 === pass2){
        localStorage.name = $("input[name=name1]").val();
        localStorage.email = $("input[name=email1]").val();
        localStorage.pass = $("input[name=pass1]").val();
    }else{
        alert("Password does not match");
    }
//    alert("success");
    $.Notify({
        caption: 'Local Storage',
        content: 'Name: '+localStorage.name + ' Email: '+localStorage.email,
        type: 'success',
        icon:'<img src="icon2.png">'
    });
});

$("#loginButton").on('click', function(){
   var email = $('input[name=email]').val(),
       pass = $('input[name=pass]').val();
    if(email == localStorage.email && pass == localStorage.pass){
        window.location.assign('list.html');
    }else{
        alert("Wrong credentials!");
    }
});
function showData(){
    var name = "<dt>Name:</dt><dd>"+localStorage.name+"</dd>",
        email = "<dt>Email:</dt><dd>"+localStorage.email+"</dd>",
        pass = "<dt>Password:</dt><dd>"+localStorage.pass+"</dd>";
    $("#data1 dl").html(name+email+pass);
    showMetroDialog('#data1');
}
function clearLocal(){
    localStorage.clear();
//    alert(localStorage.name + localStorage.email + localStorage.pass);
    $.Notify({
        caption: 'Local Storage',
        content: 'Local Storage data cleared',
        type: 'alert',
        icon:'<img src="icon2.png">'
    });
};

function loadList(){
    var row = "<tr><td>"+localStorage.name+"</td><td>"+localStorage.email+"</td><td>"+localStorage.pass+"</td></tr>";
    $("table#listTable tbody").html(row);
};