    /*function showCharm(id){
        var  charm = $(id).data("charm");
        if (charm.element.data("opened") === true) {
            charm.close();
        } else {
            charm.open();
        }
    };*/

    function bodyLoad() {
//    	document.addEventListener("deviceready",onDeviceReady,false);
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    function onDeviceReady () {
//    	alert("Device is ready");
        
        $.Notify({
            caption: 'Device State',
            content: 'Device is ready',
            type:'success'
        });
        
        if(typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            $.Notify({
                caption: 'Localstorage',
                content: 'Localstorage supported.',
                type:'success'
            });
            $("#loginForm").on('submit',function(){
                localStorage.name = $("input[name=name]").val();
                localStorage.email = $("input[name=email]").val();
                localStorage.pass = $("input[name=pass]").val();
                
                alert("success");
            })
        } else {
            // Sorry! No Web Storage support..
            $.Notify({
                caption: 'LocalStorage',
                content: 'LocalStorage is not available',
                type:'error'
            });
        }
    }