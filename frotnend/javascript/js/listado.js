$(document).ready(function() {
    $('#car-form').validate({
        rules: {
            vehicleMark: {
                required: true,
                minlength: 3
            },
            vehicleModel: {
                required: true,
                minlength: 3
            },
            vehiclePlate: {
                required: true,
                minlength: 3
            },
            vehicleDate: {
                required: true
            },
            vehicleFueltype: {
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
    var marca = $('#marca').val();
    var modelo = $('#modelo').val();
    var placa = $('#placa').val();
    var anio = $('#anio').val();
    var combustible = $('#combustible').val();
    
    var vehicle = { marca, modelo,placa, anio, combustible};
    
    appendvehicleToTable(vehicle.marca, vehicle.modelo,vehicle.placa, vehicle.anio, vehicle.combustible);
    
    $.ajax({
        url: "http://127.0.0.1:8000/api/Auto/", 
        type: 'POST',
        data: JSON.stringify(vehicle),
        contentType: 'application/json',
        success: function(response) {
            console.log('Vehiculo registrado exitosamente:', response);
        },
        error: function(error) {
            console.error('Error en la creacion del vehiculo:', error);
        }
    });
}

function editvehicle(button) {
    var row = $(button).closest("tr");
    var cols = row.children("td");

    if ($(button).text() === "Editar") {
        row.data("originalValues", {
            marca: $(cols[0]).text(),
            modelo: $(cols[1]).text(),
            placa: $(cols[2]).text(),
            anio: $(cols[3]).text(),
            combustible: $(cols[4]).text()
        });

        $(cols[0]).html(`<input type="text" class="form-control" value="${$(cols[0]).text()}">`);
        $(cols[1]).html(`<input type="text" class="form-control" value="${$(cols[1]).text()}">`);
        $(cols[2]).html(`<input type="text" class="form-control" value="${$(cols[2]).text()}">`);
        $(cols[3]).html(`<input type="text" class="form-control" value="${$(cols[3]).text()}">`);
        $(cols[4]).html(`<input type="text" class="form-control" value="${$(cols[4]).text()}">`);
        
        $(button).text('Guardar').removeClass('btn-info').addClass('btn-success');
        $(button).next().text('Cancelar').removeClass('btn-danger').addClass('btn-warning');
    } else {
        var newmarca = $(cols[0]).children("input").val();
        var newmodelo = $(cols[1]).children("input").val();
        var newplaca = $(cols[2]).children("input").val();
        var newanio = $(cols[3]).children("input").val();
        var newcombustible = $(cols[4]).children("input").val();
        
        $(cols[0]).text(newmarca);
        $(cols[1]).text(newmodelo);
        $(cols[2]).text(newplaca);
        $(cols[3]).text(newanio);
        $(cols[4]).text(newcombustible);

        $(button).text('Editar').removeClass('btn-success').addClass('btn-info');
        $(button).next().text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
        updateVehicleInStorage(row.index(), newmarca, newmodelo, newplaca, newanio, newcombustible);

        $.ajax({
            url: "http://127.0.0.1:8000/api/Auto/",
            type: 'PUT',
            data: JSON.stringify({ marca: newmarca, modelo: newmodelo, placa: newplaca, anio: newanio, combustible: newcombustible}),
            contentType: 'application/json',
            success: function(response) {
                console.log('Vehicle updated successfully:', response);
            },
            error: function(error) {
                console.error('Error updating vehicle:', error);
                window.location.href = "lista autos.html";
            }
        }); 
    }
}

function updateVehicleInStorage(index, newmarca, newmodelo, newplaca, newanio, newcombustible) {
    var vehicles = JSON.parse(localStorage.getItem("vehicles"));
    vehicles[index].marca = newmarca;   
    vehicles[index].modelo = newmodelo;
    vehicles[index].placa = newplaca;
    vehicles[index].anio = newanio;
    vehicles[index].combustible = newcombustible;
    
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

function deletevehicle(button) {
    if(button.textContent === 'Cancelar') {
        var row = $(button).closest("tr");
        var cols = row.children("td");
        var originalValues = row.data("originalValues");

        $(cols[0]).text(originalValues.marca);
        $(cols[1]).text(originalValues.modelo);
        $(cols[2]).text(originalValues.placa);
        $(cols[3]).text(originalValues.anio);
        $(cols[4]).text(originalValues.combustible);

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
            url: "http://127.0.0.1:8000/api/Auto/",
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
            appendvehicleToTable(vehicle.marca, vehicle.modelo, vehicle.placa, vehicle.anio, vehicle.combustible);
        });
    }
}

function appendvehicleToTable(marca, modelo, placa, anio, combustible) {
    $('#vehicleTable tbody').append(`
        <tr>
            <td>${marca}</td>
            <td>${modelo}</td>
            <td>${placa}</td>
            <td>${anio}</td>
            <td>${combustible}</td>
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

 