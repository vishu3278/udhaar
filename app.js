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
            $.Notify({
                caption: 'Local Storage',
                content: 'Local storage is supported in your browser. You can perform localStorage actions.',
                type: 'success',
                icon:'<img src="icon2.png">'
            });
            
        }
//        document.addEventListener("deviceready", onDeviceReady, false);
//        $("#accordion").accordion();
    }

    function onDeviceReady () {
    	alert("Device is ready");
        
        
        if(typeof(Storage) !== "undefined") {
            alert("Supported");
        }
            
    };

var store = {};
$("#loginForm").on('submit',function(){
    localStorage.name = $("input[name=name]").val();
    localStorage.email = $("input[name=email]").val();
    localStorage.pass = $("input[name=pass]").val();
//    alert("success");
    $.Notify({
        caption: 'Local Storage',
        content: 'Name: '+localStorage.name + ' Email: '+localStorage.email,
        type: 'success',
        icon:'<img src="icon2.png">'
    });
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
        type: 'success',
        icon:'<img src="icon2.png">'
    });
}