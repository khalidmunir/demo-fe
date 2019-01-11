//var myButton = document.getElementById("clickButton");
var myText = document.getElementById("helloText");

//myButton.addEventListener('click', doSomething, false)



async function doSomething() {
    var results = await fetch(`./data1.json`);


    await console.log("results", results)
    await console.log("results stringify", JSON.stringify(results))


    await localStorage.setItem(`fetchedData`, JSON.stringify(results))

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
    await localStorage.setItem(`local_data`, JSON.stringify(localInfo))

    console.log(typeof(res))
    console.log(typeof(localInfo))
    console.log(res)
    console.log(localInfo)


    myText.innerHTML += localInfo.map((src, index) => `
    
    
    



<div class="container">
    <!-- contacts card -->
    <div class="card card-default" id="card_contacts">
        <div id="contacts" class="panel-collapse collapse show" aria-expanded="true" style="">
            <ul class="list-group pull-down" id="contact-list">
                <li class="list-group-item">
                    <div class="row w-100">
                        <div class="col-12 col-sm-6 col-md-3 px-0">
                            <a href="detail.html?id=${src.UUID}"><img class="user-image" src="${src.Image}" alt="${src.Image}" class="rounded-circle mx-auto d-block img-fluid"></a>
                        </div>
                        
                        <div class="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                            <span class="fa fa-mobile fa-2x text-success float-right pulse" title="online now"></span>
                            <a href="detail.html?id=${src.UUID}"><label class="name lead">${src.FirstName} ${src.LastName}</label></a>
                            <br> 
                            <span class="fa fa-map-marker fa-fw text-muted" data-toggle="tooltip" title="" data-original-title="5842 Hillcrest Rd"></span>
                            <a href="detail.html?id=${src.UUID}"><span class="text-muted">${src.UserName}</span></a>
                            <br>
                            <span class="fa fa-phone fa-fw text-muted" data-toggle="tooltip" title="" data-original-title="(870) 288-4149"></span>
                            <a href="detail.html?id=${src.UUID}"><span class="text-muted small">${(src.files ? src.files.length : 0 ) } Files</span></a>
                            <br>
                            <span class="fa fa-envelope fa-fw text-muted" data-toggle="tooltip" data-original-title="" title=""></span>
                            <span class="text-muted small text-truncate">${src.email}</span>
                        </div>
                        </a>
                    </div>
                </li>
                
            </ul>
            <!--/contacts list-->
        </div>
    </div>
</div>




    
    
    
    
    
    
    
           
               
          
            `).join('\n')
}
