function validateEmail(e) {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(String(e).toLowerCase());
}
function isEmpty(inp) {
    if (inp == "") {
        return true;
    }
}


function validate() {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var city = document.getElementById("city").value;
    var error_message = document.getElementById("error_message");
    var streetAddress = document.getElementById("address1").value;
    var landmark = document.getElementById("address2").value;
    var state = document.getElementById("state").value;
    var postcode = document.getElementById("postcode").value;
    var lat = document.getElementById("lat").value;
    var lng = document.getElementById("lng").value;


    error_message.style.padding = "10px";


    var text;
    if (isEmpty(name)) {
        text = "Please enter company name";
        error_message.innerHTML = text;
        return false;
    }
    if (!validateEmail(email)) {
        text = "Please enter a valid email address";
        error_message.innerHTML = text;
        return false;
    }
    if (isNaN(phone) || phone.length != 10) {
        text = "Please Enter valid phone number";
        error_message.innerHTML = text;
        return false;
    }
    if (isEmpty(city)) {
        text = "Please enter a valid address";
        error_message.innerHTML = text;
        return false;
    }

    document.getElementById("error_message").classList.add("noError");
    document.getElementById("result-div").classList.remove("resultOnLoad");

    document.getElementById("result-div").classList.add("result");


    let rows = `<caption class = "caption">Your details</caption>`
    rows += "<tr>";
    rows += "<th>Company name</th>";
    rows += "<th>Email</th>";
    rows += "<th>Phone number</th>";
    rows += "<th>Street address</th>";
    rows += "<th>Landmark</th>";
    rows += "<th>City</th>";
    rows += "<th>State</th>";
    rows += "<th>Post code</th>";
    rows += "<th>Latitude</th>";
    rows += "<th>Longitude</th>";
    rows += "</tr>";
    rows += "<tbody>";
    rows += "<tr>";
    rows += `<td>${name}</td>`;
    rows += `<td>${email}</td>`;
    rows += `<td>${phone}</td>`;
    rows += `<td>${streetAddress}</td>`;
    rows += `<td>${landmark} </td>`;
    rows += `<td>${city}</td>`;
    rows += `<td>${state}</td>`;
    rows += `<td>${postcode}</td>`;
    rows += `<td>${lat}</td>`;
    rows += `<td>${lng}</td>`;
    rows += "</tr>";
    rows += "</tbody>";

    document.getElementById("result-table").innerHTML = rows;
    return false;
}

let autoComplete;

function initMap() {
    autoComplete = new google.maps.places.Autocomplete((document.getElementById("address1")), {
        types: ['geocode'],
        componentRestrictions: { 'country': ['AU'] }
    });
    autoComplete.addListener('place_changed', onPlaceChanged)
}

function onPlaceChanged() {
    var place = autoComplete.getPlace();

    if (!place.geometry) {
        document.getElementById("address1").placeholder = "Address line 1";
        document.getElementById("address1").value = "";
    }
    else {
        document.getElementById("address1").value = place.name;
        document.getElementById("lat").value = place.geometry.location.lat();
        document.getElementById("lng").value = place.geometry.location.lng();
        place.address_components.forEach(element => {
            if (element.types.includes("postal_code")) {
                document.getElementById("postcode").value = element.short_name;
            }
            else if (element.types.includes("locality")) {
                document.getElementById("city").value = element.short_name;
            }
            else if (element.types.includes("administrative_area_level_1")) {
                document.getElementById("state").value = element.short_name;
            }
        });
    }
}

