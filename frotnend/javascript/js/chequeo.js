$(document).ready(function() {
    $('#car-form').validate({
        rules: {
            vehicleKm: {
                required: true,
                minlength: 1
            },
            vehicleColor: {
                required: true,
                minlength: 3
            },
            vehicleOil: {
                required: true,
                minlength: 3
            },
        },
        submitHandler: function(form) {
            addvehicle();
            form.reset();
            return false;
        }
    });
    loadvehicles();
});

function addvehicle() {
    
    var kilometraje = $('#kilometraje').val();
    var color = $('#color').val();
    var aceite = $('#aceite').val();
    
    
    var vehicle = { kilometraje, color,aceite,  };
    
    appendvehicleToTable(vehicle.kilometraje, vehicle.color,vehicle.aceite);
    
    $.ajax({
        url: "http://127.0.0.1:8000/api/Chequeo/", 
        type: 'POST',
        data: JSON.stringify(vehicle),
        contentType: 'application/json',
        success: function(response) {
            console.log('Chequeo registrado exitosamente:', response);
        },
        error: function(error) {
            console.error('Error en la creacion del chequeo:', error);
        }
    });
}

function editvehicle(button) {
    var row = $(button).closest("tr");
    var cols = row.children("td");

    if ($(button).text() === "Editar") {
        row.data("originalValues", {
            kilometraje: $(cols[0]).text(),
            color: $(cols[1]).text(),
            aceite: $(cols[2]).text(),
            
        });

        $(cols[0]).html(`<input type="text" class="form-control" value="${$(cols[0]).text()}">`);
        $(cols[1]).html(`<input type="text" class="form-control" value="${$(cols[1]).text()}">`);
        $(cols[2]).html(`<input type="text" class="form-control" value="${$(cols[2]).text()}">`);

        $(button).text('Guardar').removeClass('btn-info').addClass('btn-success');
        $(button).next().text('Cancelar').removeClass('btn-danger').addClass('btn-warning');
    } else {
        var newkilometraje = $(cols[0]).children("input").val();;
        var newcolor = $(cols[1]).children("input").val();
        var newaceite = $(cols[2]).children("input").val();
        
        
        $(cols[0]).text(newkilometraje);
        $(cols[1]).text(newcolor);
        $(cols[2]).text(newaceite);
        

        $(button).text('Editar').removeClass('btn-success').addClass('btn-info');
        $(button).next().text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
        updateVehicleInStorage(row.index(), newkilometraje, newcolor,newaceite );

        $.ajax({
            url: "http://127.0.0.1:8000/api/Chequeo/",
            type: 'PUT',
            data: JSON.stringify({kilometraje: newkilometraje,color: newcolor, aceite: newaceite, }),
            contentType: 'application/json',
            success: function(response) {
                console.log('chequeo actualizado exitosamente:', response);
            },
            error: function(error) {
                console.error('Error actualizando chequeo:', error);
            }
        }); 
    }
}

function updateVehicleInStorage(index, newkilometraje, newcolor, newaceite) {
    var vehicles = JSON.parse(localStorage.getItem("vehicles"));
    vehicles[index].kilometraje = newkilometraje;
    vehicles[index].color = newcolor;
    vehicles[index].aceite = newaceite;
    
    
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

function deletevehicle(button) {
    if(button.textContent === 'Cancelar') {
        var row = $(button).closest("tr");
        var cols = row.children("td");
        var originalValues = row.data("originalValues");

        $(cols[0]).text(originalValues.kilometraje);
        $(cols[1]).text(originalValues.color);
        $(cols[2]).text(originalValues.aceite);
        

        $(button).prev().text('Editar').removeClass('btn-warning').addClass('btn-info');
        $(button).text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
    } else {
        var row = $(button).closest("tr");
        var index = row.index();
        var vehicles = JSON.parse(localStorage.getItem("vehicles"));
        vehicles.splice(index, 1);
        localStorage.setItem("vehicles", JSON.stringify(vehicles));
        removefromstorage(row.index());
        row.remove();

        $.ajax({
            url: "http://127.0.0.1:8000/api/Chequeo/",
            type: 'DELETE',
            success: function(response) {
                console.log('Vehicle deleted successfully:', response);
                row.remove();
            },
            error: function(error) {
                console.error('Error deleting vehicle:', error);
            }
        });
    }
}
function removefromstorage(index) {
        var vehicles = JSON.parse(localStorage.getItem("vehicles"));
        vehicles.splice(index, 1);
        localStorage.setItem("vehicles", JSON.stringify(vehicles));

}
function loadvehicles() {
    if(localStorage.getItem("vehicles")){
        var vehicles = JSON.parse(localStorage.getItem("vehicles"));
        vehicles.forEach(function(vehicle){        
            appendvehicleToTable(vehicle.kilometraje,vehicle.color,vehicle.aceite, );
        });
    }
}

function appendvehicleToTable(kilometraje,color,aceite, ) {
    $('#vehicleTable tbody').append(`
        <tr>
            <td>${kilometraje}</td>
            <td>${color}</td>
            <td>${aceite}</td>
            
            <td>
                <button class="btn btn-info btn-edit" onclick="editvehicle(this)">Editar</button>
                <button class="btn btn-danger btn-delete" onclick="deletevehicle(this)">Eliminar</button>
            </td>
        </tr>
    `);
}

function saveProductToStorage(vehicle) {
    var vehicles = localStorage.getItem("vehicles") ? JSON.parse(localStorage.getItem("vehicles")) : [];
    vehicles.push(vehicle);
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

 