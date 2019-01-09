var urlid = $_GET('id')

console.log("From URL",urlid)

function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}


const dataSource = JSON.parse(localStorage.getItem("local_data"))


console.log("Wow : new data source ::", dataSource)
console.log("Wow : data source type ::", typeof(dataSource))

function findDataFromLS(ID) {
    const objArray = JSON.parse(localStorage.getItem("local_data"));
    return filterObj = objArray.filter(function (e) {
        return e.UUID == ID;
    })[0];
}

var dataObj = findDataFromLS(urlid)


console.log("We are dealing with ..", dataObj)