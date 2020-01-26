var get = $.ajax({
    type: "GET",
    url: "http://localhost:3000/prijava"
});

get.done(function (podaci) {
    $.each(podaci, function(i, podatak) {
        $("tbody").append('<tr><td>' + podatak.JMBG + '</td><td>' + podatak.ime + '</td><td>' + podatak.prezime + '</td><td>' + podatak.email + '</td><td>' + podatak.komentar + '</td><td><button id="' + podatak.id + '" class="btn btn-warning">Izmena</button></td><td><button id="' + podatak.id + '" class="btn btn-danger">Obrisi</button></td></tr>');
    });
    $("#tabela").dataTable();
});
get.fail(function(podaci){
    alert(podaci.statusText);
});

$("#tabela tbody").on('click','button', function(){
    if ($(this).hasClass("btn-danger")){
        $.ajax({
            url:"http://localhost:3000/prijava/" + $(this).attr("id"), type: 'DELETE', dataType:'json',
            succes:function() {
                console.log("Obrisano");
            },
            error:alert("Neuspelo brisanje")
        });

        $(this).parent().parent().remove();
    } else if ($(this).hasClass("btn-warning")) {
        $('#modalUnos').modal('toggle');
        var btnThis = $(this);
        var tr = this.parentNode.parentNode;
        $("#ime").attr("placeholder", tr.cells[1].childNodes[0].data);
        $("#prezime").attr("placeholder", tr.cells[2].childNodes[0].data);
        $("#jmbg").attr("placeholder", tr.cells[0].childNodes[0].data);
        $("#email").attr("placeholder", tr.cells[3].childNodes[0].data);

        $("#forma").validate({
            rules: {
            ime:{
            required:true,
            minlength:3
            },
            email:"required",
            prezime:{
                required:true,
                minlength:3,
                },
                jmbg: {
                    required:true,
                    minlength:13,
                }},

                messages:{
                    ime:{
                        required:"Unesite vase ime",
                        minlength:"Ime mora imati bar 3 karaktera"
                    },
                    email:"Unesite validan email",
                    prezime:{
                        required:"Unesite vase prezime",
                        minlength:"Prezime mora imati bar 3 karaktera"
                    },
                    jmbg:{
                        required:"unesite vas JMBG",
                        minlength:"Jmbg ima 13 karaktera"
                    },
                    komentar:"Unesite komentar",
                },
                submitHandler:function(){
                    var imef=$("#ime").val();
                    var prezimef=$("#prezime").val();
                    var emailf=$("#email").val();
                    var jmbgf=$("#jmbg").val();
                    var komentarf=$("#komentar").val();
                
                    var osoba={ ime: imef, prezime:prezimef,email:emailf,
                    JMBG:jmbgf, komentar:komentarf };
                    $.ajax({
                        url:"http://localhost:3000/prijava/"
                    });
                
                
                get.done(function(podaci) {
                    $("tbody").empty();
                    $.each(podaci, function (i,podatak){
                        $("tbody").append('<tr><td>' + podatak.JMBG +
                        '</td><td>' + podatak.ime + '</td><td>'+ podatak.prezime+'</td><td>'+ 
                        podatak.email +'</td><td>'+ 
                        podatak.email +'</td><td>'+
                        podatak.komentar +'</td><td><button id="' + 
                        podatak.id + '" class="btn btn-warning">Izmena</button></td><td><button id="' + podatak.id + '" class="btn btn-danger">Obrisi</button></td></tr>');
                });
                
                $("#tabela").dataTable();
                });
                get.fail(function(podaci){
                    alert(podaci.statusText);
                    
                });
            

        $('#modalUnos').modal('toggle');
            }
        });

        $("#forma").trigger('reset');
    }
});







