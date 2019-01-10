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
    
    
    <div class="col-md-3 col-xs-12 widget widget_tally_box">
<div class="x_panel fixed_height_390">
<div class="x_content">
<div class="flex">
<ul class="list-inline widget_profile_box">
<li>
<a>
<i class="fa fa-facebook"></i>
</a>
</li>
<li>
<a href="detail.html?id=${src.UUID}"><img src="${src.Image}" alt="..." class="img-circle profile_img"></a>
</li>
<li>
<a>
<i class="fa fa-twitter"></i>
</a>
</li>
</ul>
</div>
<h3 class="name"><a href="detail.html?id=${src.UUID}">${src.UserName}</a></h3>
<div class="flex">

</div>
<p>

</p>
</div>
</div>
</div>
    
    
    
    
    
           
               
          
            `).join('\n')
}
