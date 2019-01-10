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

var image = id="user-image-cont"




var img = document.createElement("img");
img.src = dataObj.Image;


console.log(img)
var div = document.getElementById("user-image-cont");
console.log(div)

div.appendChild(img);

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




var theader = `<table class="table table-striped jambo_table bulk_action"> 
                        <thead> 
                            <tr class="headings$"> 
                                <th>
                                    <div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" id="check-all" class="flat" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
                                </th>
                                <th class="column-title" style="display: table-cell;">Invoice </th>
                                <th class="column-title" style="display: table-cell;">Invoice Date </th>
                                <th class="column-title" style="display: table-cell;">Order </th>
                                <th class="column-title" style="display: table-cell;">Bill to Name </th>
                                <th class="column-title" style="display: table-cell;">Status </th>
                                <th class="column-title" style="display: table-cell;">Amount </th>
                                <th class="column-title no-link last" style="display: table-cell;"><span class="nobr">Action</span>
                                </th>
                                <th class="bulk-actions" colspan="7" style="display: none;">
                                    <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt">1 Records Selected</span> ) <i class="fa fa-chevron-down"></i></a>
                                </th>
                            </tr>
                        </thead>
                        <tbody>`; 
                        
                        
                        
                            
                            
                            // <tr class="odd pointer">
                            //     <td class="a-center ">
                            //         <div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
                            //     </td>
                            //     <td class=" ">121000039</td>
                            //     <td class=" ">May 28, 2014 11:30:12 PM</td>
                            //     <td class=" ">121000208</td>
                            //     <td class=" ">John Blank L</td>
                            //     <td class=" ">Paid</td>
                            //     <td class="a-right a-right ">$741.20</td>
                            //     <td class=" last"><a href="#">View</a>
                            //     </td>
                            // </tr>
                        


var tableFooter = "</tbody> \
                    </table>"

var fullTable = theader + fileListHtml  + tableFooter     
            
console.log("The FileList ", fileListHtml)   

document.getElementById("table-block").innerHTML = fullTable


let moments = dataFile.map(d => moment(d.ctime, 'MM/DD/YYYY'))
let maxDate = moment.max(moments)
let minDate = moment.min(moments)
// numArray = numArray.sort((a, b) => a - b);
var sizes = dataFile.map(s => s.size )


sizes = sizes.sort((a, b) => a - b)

console.log(sizes)
if(sizes.length == 0) {
  sizes = [0]  
} 

function getSum(total, num) {
  return total + num;
}

document.getElementById("total-usage").innerHTML = sizes.reduce(getSum, 0);



console.log("sizes", sizes[sizes.length - 1])

document.getElementById("largest-file").innerHTML = sizes[sizes.length - 1] + " kb"

    
    document.getElementById("oldest-file").innerHTML = minDate.format("DD MMM YY")
    document.getElementById("human-oldest").innerHTML = minDate.fromNow()
    
    console.log("Max Date", maxDate.format('DD-MM-YYYY'))
    console.log("Min Date", minDate)
    
    
    
// Graph stuff start paste     
    let myChart = document.getElementById("myChart").getContext("2d");

  // Global Options
  // Chart.defaults.global.defaultFontFamily = "Lato";
  // Chart.defaults.global.defaultFontSize = 18;
  // Chart.defaults.global.defaultFontColor = "#777";
  
  function genRandom() {
    return Math.floor((Math.random() * 10) + 1);
  }

  let massPopChart = new Chart(myChart, {
    type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: [
        "PII",
        "PCI",
        "SPEC",
        "RET"
      ],
      datasets: [
        {
          // label: "Population",
          data: [ genRandom(), genRandom(), genRandom(), genRandom() ],
          //backgroundColor:'green',
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)"
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000"
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Absolute classification",
        fontSize: 12
      },
      legend: {
        display: false,
        position: "right",
        labels: {
          fontColor: "#000"
        }
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0
        }
      },
      tooltips: {
        enabled: true
      }
    }
  });
  // Graph stuff end paste 
    
    

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

// Chart options
const options = {
  chart: {
    height: 350,
    width: "40%",
    type: "bar",
    background: "#f4f4f4",
    foreColor: "#333"
  },
  plotOptions: {
    bar: {
      horizontal: false
    }
  },
  series: [
    {
      name: "Population",
      data: [
        8550405,
        3971883,
        2720546,
        2296224,
        1567442,
        1563025,
        1469845,
        1394928,
        1300092,
        1026908
      ]
    }
  ],
  xaxis: {
    categories: [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Philadelphia",
      "Phoenix",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose"
    ]
  },
  fill: {
    colors: ["#00ff00", "#ffff00", "#00ffff", "#0000ff", "#ff00ff",        "#00ff00", "#ffff00", "#00ffff", "#0000ff", "#ff00ff"  ]
  },
  dataLabels: {
    enabled: false
  },

  title: {
    text: "Absolute classification",
    align: "center",
    margin: 20,
    offsetY: 20,
    style: {
      fontSize: "25px"
    }
  }
};

// Init chart
const chart = new ApexCharts(document.querySelector("#chart"), options);

// Render chart
chart.render();

// Event example
document.querySelector("#change").addEventListener("click", () =>
  chart.updateOptions({
    plotOptions: {
      bar: {
        horizontal: true
      }
    }
  })
);


document.querySelector("#change2").addEventListener("click", () =>
  chart.updateOptions({
    plotOptions: {
      bar: {
        horizontal: false
      }
    }
  })
);





var optionsGauge = {
            chart: {
                type: 'radialBar',
                height: 216
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: '97%',
                        margin: 5, // margin is in pixels
                        shadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: '#999',
                            opacity: 1,
                            blur: 2
                        }
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },   
                        value: {
                            offsetY: 15,
                            fontSize: '22px'
                        }                     
                    }
                }
            },
            fill: {
                gradient: {
                    enabled: true,
                    shade: 'light',
                    shadeIntensity: 0.4,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 53, 91]
                },
            },
            series: [ genRandom() ],
            labels: ['Average Results'],
            height: '100px'
           
        }

       var chartGauge = new ApexCharts(
            document.querySelector("#chartGuage"),
            optionsGauge
        );
        
        chartGauge.render();