var myButton = document.getElementById("clickButton");
var myText = document.getElementById("helloText");

myButton.addEventListener('click', doSomething, false)



async function doSomething() {
	var results = await fetch(`./data1.json`);
	
	
	await console.log("results", results)
	await console.log("results stringify", JSON.stringify(results))
	
	
	await localStorage.setItem(`fetchedData`, JSON.stringify(results) )
	
	myText.textContent = "hello, world!";
	
// 	myText.textContent += results.map((src, index) => `
           
//                 <div class="">
//                     <div class="col-lg-4 col-md-4 col-sm-6 col-12" class="card">
//                         <img class="event-image" src="https://go2masjid.com/site/masjid-admin/${src.fimg}">
//                         <h4 class="text-center" style="color:#2c3e50">${src.fname}</h4>
//                         <p class="text-center" style="color:#2c3e50">${src.fdate}</p>
//                         <p class="text-center" style="color:#2c3e50">${src.fdesc}</p>
                        
//                     </div>
//                 </div>
          
//             `).join('\n')
            
            console.log("i and item ", index)
            console.log("i and src ", src)
            
}





window.addEventListener('load', async e => {
  console.log("$$ IN window.addEventListener $$");

  let firstRunEverr = localStorage.getItem("firstRunEv1");

  console.log("FirstRunEv", firstRunEverr);
  if ((firstRunEverr == null) || (firstRunEverr == undefined)) {
      localStorage.clear();
      localStorage.setItem("firstRunEv1", "1");

  }
    
    await initApp();
    await updateData();

});

function initApp() {
	console.log("In Init App")
}


async function updateData() {

    var res = await fetch(`./data1.json`);
    var localInfo = await res.json();
    await localStorage.setItem(`local_data`, JSON.stringify(localInfo) )
    
    console.log (typeof(res))
    console.log (typeof(localInfo))
    console.log (res)
    console.log (localInfo)
    
    
    myText.innerHTML += localInfo.map((src, index) => `
           
                <div class="">
                    <div class="col-lg-4 col-md-4 col-sm-6 col-12" class="card">
                        <img class="event-image" width="130" src="${src.Image}">
                        <h4 class="text-center" style="color:#2c3e50">${src.FirstName} ${src.LastName}</h4>
                        <p class="text-center" style="color:#2c3e50"><a href="detail2.html?id=${src.UUID}">${src.email}</a></p>
                        <p class="text-center" style="color:#2c3e50"><a href="detail.html?id=${src.UUID}">${src.UserName}</a></p>
                        
                    </div>
                </div>
          
            `).join('\n')
}


