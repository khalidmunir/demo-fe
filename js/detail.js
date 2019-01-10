var urlid = $_GET('id')

console.log("From URL", urlid)

function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function(m, key, value) { // callback
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
    return filterObj = objArray.filter(function(e) {
        return e.UUID == ID;
    })[0];
}

var dataObj = findDataFromLS(urlid)


console.log("We are dealing with ..", dataObj)

if(dataObj.files == undefined) {
  dataObj.files = []  
} 
var dataFile = dataObj.files 

console.log("DataFiles Array length ", dataFile.length)
document.getElementById("total-files").innerHTML = dataFile.length
console.log("Actual File Info", dataFile)

fileListHtml = dataFile.map((src, index) => `

        <tr class="even pointer">
            <td class="a-center ">
                <div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
            </td>
            <td class=" ">
                ${src.atime}
            </td>
            <td class=" ">
                ${src.fullpath}
            </td>
            <td class=" ">${src.size} <i class="success fa fa-long-arrow-up"></i></td>
            <td class=" ">${src.uuid}</td>
            <td class=" ">${src.extension}</td>
            <td class="a-right a-right ">${src.mimetype}</td>
            <td class=" last"><a href="#">${src.filename}</a>
            </td>
        </tr>

            `).join('\n')
            
            
console.log("THe FileList ", fileListHtml)   

document.getElementById("table-block").innerHTML = fileListHtml


let moments = dataFile.map(d => moment(d.ctime, 'MM/DD/YYYY'))
let maxDate = moment.max(moments)
let minDate = moment.min(moments)
// numArray = numArray.sort((a, b) => a - b);
let sizes = dataFile.map(s => s.size )

sizes = sizes.sort((a, b) => a - b)

console.log("sizes", sizes[sizes.length - 1])

document.getElementById("largest-file").innerHTML = sizes[sizes.length - 1]

    
    document.getElementById("oldest-file").innerHTML = minDate
    document.getElementById("human-oldest").innerHTML = minDate.fromNow()
    
    console.log("Max Date", maxDate.format('DD-MM-YYYY'))
    console.log("Min Date", minDate)

/* 

<tr class="even pointer">
                                <td class="a-center ">
                                    <div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
                                </td>
                                <td class=" ">121000040</td>
                                <td class=" ">May 23, 2014 11:47:56 PM </td>
                                <td class=" ">121000210 <i class="success fa fa-long-arrow-up"></i></td>
                                <td class=" ">John Blank L</td>
                                <td class=" ">Paid</td>
                                <td class="a-right a-right ">$7.45</td>
                                <td class=" last"><a href="#">View</a>
                                </td>
                            </tr>
                            
                            
                            
                            
<tr class="odd pointer">
                                <td class="a-center ">
                                    <div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
                                </td>
                                <td class=" ">121000039</td>
                                <td class=" ">May 23, 2014 11:30:12 PM</td>
                                <td class=" ">121000208 <i class="success fa fa-long-arrow-up"></i>
                                </td>
                                <td class=" ">John Blank L</td>
                                <td class=" ">Paid</td>
                                <td class="a-right a-right ">$741.20</td>
                                <td class=" last"><a href="#">View</a>
                                </td>
                            </tr>

*/
