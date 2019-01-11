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

document.getElementById("user-name-title").innerHTML = dataObj.FirstName + " " + dataObj.LastName


if(dataObj.files == undefined) {
  dataObj.files = []  
} 
var dataFile = dataObj.files 

console.log("DataFiles Array length ", dataFile.length)
document.getElementById("total-files").innerHTML = dataFile.length
console.log("Actual File Info", dataFile)
/*
var string = "this is a string";
var length = 7;
var trimmedString = string.substring(0, length);
*/
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
            <td class=" ">${humanFileSize(src.size, true)}</td>
            <td class=" " title="${src.uuid}">${src.uuid.substring(0, 8)}...</td>
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
                                <th class="column-title" style="display: table-cell;">Acessed Date</th>
                                <th class="column-title" style="display: table-cell;">Full Path</th>
                                <th class="column-title" style="display: table-cell;">Size (bytes)</th>
                                <th class="column-title" style="display: table-cell;">MD5 Hash </th>
                                <th class="column-title" style="display: table-cell;">Extension </th>
                                <th class="column-title" style="display: table-cell;">Extension Desc </th>
                                <th class="column-title no-link last" style="display: table-cell;"><span class="nobr">File Name</span>
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
                        


var tableFooter = `</tbody> 
                    </table>`

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

document.getElementById("total-usage").innerHTML = humanFileSize(sizes.reduce(getSum, 0), true)



console.log("sizes", sizes[sizes.length - 1])

document.getElementById("largest-file").innerHTML = humanFileSize(sizes[sizes.length - 1], true)

    
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
    return Math.floor((Math.random() * 10) + 4);
  }

  let massPopChart = new Chart(myChart, {
    type: "doughnut", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
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
        display: true,
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
    width: "35%",
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





var optionsGauge1 = {
            chart: {
                type: 'radialBar',
                height: 316
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
        
var optionsGauge2 = {
            chart: {
                type: 'radialBar',
                height: 316
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
        
var optionsGauge3 = {
            chart: {
                type: 'radialBar',
                height: 316
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
        
// var optionsGauge4 = {
//             chart: {
//                 type: 'radialBar',
//                 height: 316
//             },
//             plotOptions: {
//                 radialBar: {
//                     startAngle: -90,
//                     endAngle: 90,
//                     track: {
//                         background: "#e7e7e7",
//                         strokeWidth: '97%',
//                         margin: 5, // margin is in pixels
//                         shadow: {
//                             enabled: true,
//                             top: 2,
//                             left: 0,
//                             color: '#999',
//                             opacity: 1,
//                             blur: 2
//                         }
//                     },
//                     dataLabels: {
//                         name: {
//                             show: false
//                         },   
//                         value: {
//                             offsetY: 15,
//                             fontSize: '22px'
//                         }                     
//                     }
//                 }
//             },
//             fill: {
//                 gradient: {
//                     enabled: true,
//                     shade: 'light',
//                     shadeIntensity: 0.4,
//                     inverseColors: false,
//                     opacityFrom: 1,
//                     opacityTo: 1,
//                     stops: [0, 50, 53, 91]
//                 },
//             },
//             series: [ genRandom() ],
//             labels: ['Average Results'],
//             height: '100px'
           
//         }        

        var chartGauge1 = new ApexCharts(
            document.querySelector("#chartGuage1"),
            optionsGauge1
        );
        
        var chartGauge2 = new ApexCharts(
            document.querySelector("#chartGuage2"),
            optionsGauge2
        );

        var chartGauge3 = new ApexCharts(
            document.querySelector("#chartGuage3"),
            optionsGauge3
        );

        // var chartGauge4 = new ApexCharts(
        //     document.querySelector("#chartGuage4"),
        //     optionsGauge4
        // );
        
        
        chartGauge1.render();
        chartGauge2.render();
        chartGauge3.render();
        //chartGauge4.render();
        
function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}




    var optionsarea2 = {
      chart: {
        id: 'chartyear',
        type: 'area',
        height: 220,
        background: '#F6F8FA',
        toolbar: {
          show: false,
          autoSelected: 'pan'
        },
        events: {
          mounted: function (chart) {
            var commitsEl = document.querySelector('p span.commits');
            var commits = chart.getSeriesTotalXRange(chart.w.globals.minX, chart.w.globals.maxX)

            commitsEl.innerHTML = commits
          },
          updated: function (chart) {
            var commitsEl = document.querySelector('.cmeta span.commits');
            var commits = chart.getSeriesTotalXRange(chart.w.globals.minX, chart.w.globals.maxX)

            commitsEl.innerHTML = commits
          }
        }
      },
      colors: ['#FF7F00'],
      stroke: {
        width: 0,
        curve: 'smooth'
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        opacity: 1,
        type: 'solid'
      },
      series: [{
        name: 'files',
        data: githubdata.series
      }],
      yaxis: {
        tickAmount: 3,
        labels: {
          show: false
        }
      },
      xaxis: {
        type: 'datetime',
      }
    }

    var chartarea2 = new ApexCharts(
      document.querySelector("#chart-area2"),
      optionsarea2
    );

    chartarea2.render();

    var optionsArea = {
      chart: {
        height: 200,
        type: 'area',
        background: '#F6F8FA',
        toolbar: {
          autoSelected: 'selection',
        },
        brush: {
          enabled: true,
          target: 'chartyear'
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date('05 Jan 2014').getTime(),
            max: new Date('04 Jan 2015').getTime()
          }
        },
      },
      colors: ['#7BD39A'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 0,
        curve: 'smooth'
      },

      series: [{
        name: 'files',
        data: githubdata.series
      }],
      fill: {
        opacity: 1,
        type: 'solid'
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
    }

    var chartArea = new ApexCharts(
      document.querySelector("#chart-area"),
      optionsArea
    );

    chartArea.render();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    var products = [
			{
            	"name": "Burnify 1",
	            "points": 120,
    	        "lastSprint": 13,
        	    "mvpSprint": 10,
            	"sprints": [
					{
                    	"planned": 10,
	                    "done": 10
    	    	    }, {
        	            "planned": 12,
            	        "done": 10
		            }, {
    	                "planned": 10,
        	            "done": 10
    	        	}, {
                	    "planned": 10,
	                    "done": 6,
    	                "added": 52
        		    }, {
            	        "planned": 14,
                	    "done": 8,
                    	"added": 12
	        	    }, {
    	                "planned": 14,
        	            "done": 8,
            	        "added": 2,
                	    "removed": 20
	            	}, {
    	                "planned": 12,
        	            "done": 4
	            	}, {
                	    "planned": 10,
	                    "done": 6,
    	                "added": 2
    	    	    }
        	    ]
			}, {
		        "name": "Burnify 2",
		        "points": 220,
		        "lastSprint": 10,
		        "mvpSprint": 8,
		        "sprints": [{
		                "done": 18
		        }, {
		                "done": 24
		        }, {
		                "done": 16
		        }, {
		                "done": 22
		        }, {
		                "done": 8,
		                "added": 32
		        }, {
		                "done": 20,
		                "removed": 20
		        }, {
		                "done": 30,
		                "added": 2
		        }
		    ]
		}, {
		        "name": "Burnify 3",
		        "points": 120,
		        "lastSprint": 10,
		        "mvpSprint": 10,
		        "sprints": [{
		                "done": 10
		        }, {
		                "done": 10
		        }, {
		                "done": 10
		        }
		    ]
		}, {
		        "name": "Burnify 4",
		        "points": 200,
		        "lastSprint": 10,
		        "mvpSprint": 8,
		        "sprints": [{
		                "done": 20
		        }, {
		                "done": 20
		        }, {
		                "done": 20
		        }
		    ]
		}
        ];
        	
        b1 = new Burnify("#product1", products[0], 450, 250);
        b1.onSprintBarClick = function(sprintNumber, sprint) { alert('Sprint ' + sprintNumber + ' (done: '+ sprint.done + ')'); };
        b1.onFullScopeAreaClick = function(p) { alert('Project ' + p.name + ' full scope area!'); };
        b1.onDoneScopeAreaClick = function(p) { alert('Project ' + p.name + ' done scope area!'); };
        b1.onOutScopeAreaClick = function(p) { alert('Project ' + p.name + ' out scope area!'); };
        b1.draw();
        new Burnify("#product2", products[1], 450, 250).draw();
        new Burnify("#product3", products[2], 450, 250).draw();
        new Burnify("#product4", products[3], 450, 250).draw();
        
        
        
        
      function generateData(count, yrange) {
            var i = 0;
            var series = [];
            while (i < count) {
                var x = 'w' + (i + 1).toString();
                var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

                series.push({
                    x: x,
                    y: y
                });
                i++;
            }
            return series;
        }


        var optionsHeat = {
            chart: {
                height: 350,
                type: 'heatmap',
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#008FFB"],
            series: [{
                    name: 'Old Files',
                    data: generateData(12, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: 'Secure Files',
                    data: generateData(12, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: 'Large Files',
                    data: generateData(12, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: 'System Files',
                    data: generateData(12, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: 'config Files',
                    data: generateData(12, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: 'Doc Files',
                    data: generateData(12, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: 'Files',
                    data: generateData(12, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: 'Directories',
                    data: generateData(12, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: 'Archives',
                    data: generateData(12, {
                        min: 0,
                        max: 90
                    })
                }
            ],
            title: {
                text: ''
            },

        }

        var chartHeat = new ApexCharts(
            document.querySelector("#chartHeat"),
            optionsHeat
        );

        chartHeat.render();
        
        
        
        
        
        
        
        
        
        
            window.Apex = {
      stroke: {
        width: 3
      },
      markers: {
        size: 0
      },
      tooltip: {
        fixed: {
          enabled: true,
        }
      }
    };
    
    var randomizeArray = function (arg) {
      var array = arg.slice();
      var currentIndex = array.length,
        temporaryValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    // data for the sparklines that appear below header area
    var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

    var spark1 = {
      chart: {
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3,
        gradient: {
          enabled: false
        }
      },
      series: [{
        data: randomizeArray(sparklineData)
      }],
      yaxis: {
        min: 0
      },
      colors: ['#DCE6EC'],
      title: {
        text: '$424,652',
        offsetX: 0,
        style: {
          fontSize: '24px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      subtitle: {
        text: 'Sales',
        offsetX: 0,
        style: {
          fontSize: '14px',
          cssClass: 'apexcharts-yaxis-title'
        }
      }
    }

    var spark2 = {
      chart: {
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3,
        gradient: {
          enabled: false
        }
      },
      series: [{
        data: randomizeArray(sparklineData)
      }],
      yaxis: {
        min: 0
      },
      colors: ['#DCE6EC'],
      title: {
        text: '$235,312',
        offsetX: 0,
        style: {
          fontSize: '24px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      subtitle: {
        text: 'Expenses',
        offsetX: 0,
        style: {
          fontSize: '14px',
          cssClass: 'apexcharts-yaxis-title'
        }
      }
    }

    var spark3 = {
      chart: {
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3,
        gradient: {
          enabled: false
        }
      },
      series: [{
        data: randomizeArray(sparklineData)
      }],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      yaxis: {
        min: 0
      },
      title: {
        text: '$135,965',
        offsetX: 0,
        style: {
          fontSize: '24px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      subtitle: {
        text: 'Profits',
        offsetX: 0,
        style: {
          fontSize: '14px',
          cssClass: 'apexcharts-yaxis-title'
        }
      }
    }

    var spark1 = new ApexCharts(document.querySelector("#spark1"), spark1);
    spark1.render();
    var spark2 = new ApexCharts(document.querySelector("#spark2"), spark2);
    spark2.render();
    var spark3 = new ApexCharts(document.querySelector("#spark3"), spark3);
    spark3.render();

    var options1 = {
      chart: {
        type: 'line',
        width: 100,
        height: 35,
        sparkline: {
          enabled: true
        }
      },
      series: [{
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
      }],
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    var options2 = {
      chart: {
        type: 'line',
        width: 100,
        height: 35,
        sparkline: {
          enabled: true
        }
      },
      series: [{
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
      }],
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    var options3 = {
      chart: {
        type: 'line',
        width: 100,
        height: 35,
        sparkline: {
          enabled: true
        }
      },
      series: [{
        data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
      }],
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    var options4 = {
      chart: {
        type: 'line',
        width: 100,
        height: 35,
        sparkline: {
          enabled: true
        }
      },
      series: [{
        data: [15, 75, 47, 65, 14, 2, 41, 54, 4, 27, 15]
      }],
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    var options5 = {
      chart: {
        type: 'bar',
        width: 100,
        height: 35,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '80%'
        }
      },
      series: [{
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
      }],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    var options6 = {
      chart: {
        type: 'bar',
        width: 100,
        height: 35,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '80%'
        }
      },
      series: [{
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
      }],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    var options7 = {
      chart: {
        type: 'bar',
        width: 100,
        height: 35,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '80%'
        }
      },
      series: [{
        data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
      }],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    var options8 = {
      chart: {
        type: 'bar',
        width: 100,
        height: 35,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '80%'
        }
      },
      series: [{
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
      }],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    new ApexCharts(document.querySelector("#schart1"), options1).render();
    new ApexCharts(document.querySelector("#schart2"), options2).render();
    new ApexCharts(document.querySelector("#schart3"), options3).render();
    new ApexCharts(document.querySelector("#schart4"), options4).render();
    new ApexCharts(document.querySelector("#schart5"), options5).render();
    new ApexCharts(document.querySelector("#schart6"), options6).render();
    new ApexCharts(document.querySelector("#schart7"), options7).render();
    new ApexCharts(document.querySelector("#schart8"), options8).render();
  
        
        
        
        
        
        
        
  var optionsRadialBar = {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function (w) {
                                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                return 249
                            }
                        }
                    }
                }
            },
            series: [44, 55, 67, 83],
            labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
            
        }

       var chartRadialBar = new ApexCharts(
            document.querySelector("#chartRadialBar"),
            optionsRadialBar
        );
        
        chartRadialBar.render();
        
        