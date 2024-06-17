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
            vehicleColor: {
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
            vehicleOil: {
                required: true,
                minlength: 3
            },
            vehicleKm: {
                required: true,
                minlength: 1
            }
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
    var color = $('#color').val();
    var placa = $('#placa').val();
    var anio = $('#anio').val();
    var combustible = $('#combustible').val();
    var aceite = $('#aceite').val();
    var kilometraje = $('#kilometraje').val();
    
    var vehicle = { marca, modelo, color, placa, anio, combustible, aceite, kilometraje };
    
    appendvehicleToTable(vehicle.marca, vehicle.modelo, vehicle.color, vehicle.placa, vehicle.anio, vehicle.combustible, vehicle.aceite, vehicle.kilometraje);
    saveProductToStorage(vehicle);
}

function editvehicle(button) {
    var row = $(button).closest("tr");
    var cols = row.children("td");

    if ($(button).text() === "Editar") {
        row.data("originalValues", {
            marca: $(cols[0]).text(),
            modelo: $(cols[1]).text(),
            color: $(cols[2]).text(),
            placa: $(cols[3]).text(),
            anio: $(cols[4]).text(),
            combustible: $(cols[5]).text(),
            aceite: $(cols[6]).text(),
            kilometraje: $(cols[7]).text()
        });

        $(cols[0]).html(`<input type="text" class="form-control" value="${$(cols[0]).text()}">`);
        $(cols[1]).html(`<input type="text" class="form-control" value="${$(cols[1]).text()}">`);
        $(cols[2]).html(`<input type="text" class="form-control" value="${$(cols[2]).text()}">`);
        $(cols[3]).html(`<input type="text" class="form-control" value="${$(cols[3]).text()}">`);
        $(cols[4]).html(`<input type="text" class="form-control" value="${$(cols[4]).text()}">`);
        $(cols[5]).html(`<input type="text" class="form-control" value="${$(cols[5]).text()}">`);
        $(cols[6]).html(`<input type="text" class="form-control" value="${$(cols[6]).text()}">`);
        $(cols[7]).html(`<input type="text" class="form-control" value="${$(cols[7]).text()}">`);
        
        $(button).text('Guardar').removeClass('btn-info').addClass('btn-success');
        $(button).next().text('Cancelar').removeClass('btn-danger').addClass('btn-warning');
    } else {
        var newmarca = $(cols[0]).children("input").val();
        var newmodelo = $(cols[1]).children("input").val();
        var newcolor = $(cols[2]).children("input").val();
        var newplaca = $(cols[3]).children("input").val();
        var newanio = $(cols[4]).children("input").val();
        var newcombustible = $(cols[5]).children("input").val();
        var newaceite = $(cols[6]).children("input").val();
        var newkilometraje = $(cols[7]).children("input").val();
        
        $(cols[0]).text(newmarca);
        $(cols[1]).text(newmodelo);
        $(cols[2]).text(newcolor);
        $(cols[3]).text(newplaca);
        $(cols[4]).text(newanio);
        $(cols[5]).text(newcombustible);
        $(cols[6]).text(newaceite);
        $(cols[7]).text(newkilometraje);

        $(button).text('Editar').removeClass('btn-success').addClass('btn-info');
        $(button).next().text('Eliminar').removeClass('btn-warning').addClass('btn-danger');
        updateVehicleInStorage(row.index(), newmarca, newmodelo, newcolor, newplaca, newanio, newcombustible, newaceite, newkilometraje);
    }
}

function updateVehicleInStorage(index, newmarca, newmodelo, newcolor, newplaca, newanio, newcombustible, newaceite, newkilometraje) {
    var vehicles = JSON.parse(localStorage.getItem("vehicles"));
    vehicles[index].marca = newmarca;   
    vehicles[index].modelo = newmodelo;
    vehicles[index].color = newcolor;
    vehicles[index].placa = newplaca;
    vehicles[index].anio = newanio;
    vehicles[index].combustible = newcombustible;
    vehicles[index].aceite = newaceite;
    vehicles[index].kilometraje = newkilometraje;
    
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

function deletevehicle(button) {
    if(button.textContent === 'Cancelar') {
        var row = $(button).closest("tr");
        var cols = row.children("td");
        var originalValues = row.data("originalValues");

        $(cols[0]).text(originalValues.marca);
        $(cols[1]).text(originalValues.modelo);
        $(cols[2]).text(originalValues.color);
        $(cols[3]).text(originalValues.placa);
        $(cols[4]).text(originalValues.anio);
        $(cols[5]).text(originalValues.combustible);
        $(cols[6]).text(originalValues.aceite);
        $(cols[7]).text(originalValues.kilometraje);

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
            appendvehicleToTable(vehicle.marca, vehicle.modelo, vehicle.color, vehicle.placa, vehicle.anio, vehicle.combustible, vehicle.aceite, vehicle.kilometraje);
        });
    }
}

function appendvehicleToTable(marca, modelo, color, placa, anio, combustible, aceite, kilometraje) {
    $('#vehicleTable tbody').append(`
        <tr>
            <td>${marca}</td>
            <td>${modelo}</td>
            <td>${color}</td>
            <td>${placa}</td>
            <td>${anio}</td>
            <td>${combustible}</td>
            <td>${aceite}</td>
            <td>${kilometraje}</td>
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
