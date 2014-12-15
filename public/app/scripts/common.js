String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

Helper = {
    requireRule: function( obj, arr ) {
        var len = arr.length
            ,name;

        while( len-- ){
            name = arr[len];
            if( obj[name] ){
                obj[name].required = true;              
            }else {
                obj[name] = {
                    required: true  
                }               
            }
        }

        return obj;
    },
    routes:  {
        'home': {
            url: "/",
            title: 'VTS | Map',
            loginRequired: true,
            templateUrl: 'templates/map'
        },
        'login': {
            url: "/login",
            title: 'VTS | Login',
            loginRequired: false,
            templateUrl: 'templates/login'
        }
    }
}