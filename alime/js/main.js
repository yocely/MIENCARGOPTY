jQuery(document).on('submit','#', function(){
    event.preventDefault();
    jQuery.ajax({
        url:'database/registro.php',
        type:'POST',
        dataType: 'json',
        data: $(this).serialize(), 

    })
    .done(function(respuesta){
        console.log(respuesta);
    })
    .fail(function(resp){
        console.log(res.resposeText);
    })
    .always(function(){
        console.log("complete");
    })
});