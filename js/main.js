console.log('news js file');

const loadCatagory = async()=>{

const url = `https://openapi.programming-hero.com/api/news/categories`;
try{
    const res = await fetch(url);
    const data = await res.json();
    displayCatagory(data.data.news_category);
}
catch(error){
    console.log(error)
}

}

const displayCatagory = catagories=>{
// console.log(catagories);

catagories.forEach(catagory => {
    // console.log(catagory)
const catagoryContainer = document.getElementById("catagory-container");
const newDiv = document.createElement('div');
newDiv.classList.add('border','border-success','rounded','py-3','px-3','my-3')
newDiv.innerHTML=`
<span onclick="catagoryDetail('${catagory.category_id}')">${catagory.category_name}</span>
` ;
catagoryContainer.appendChild(newDiv);
});
};
const catagoryDetail = async detail =>{
    const spinner = document.getElementById("spinner");
spinner.classList.remove("d-none");
const url =`https://openapi.programming-hero.com/api/news/category/${detail}`;
try{
const res = await fetch(url);
const data = await res.json();
displayCatagoryDetail(data.data)
}
catch (error){
console.log(error)
    }
}
const  displayCatagoryDetail = allNews =>{
const itemNumber = document.getElementById("item-found");
itemNumber.innerText= allNews.length;
const newsContainer = document.getElementById("news-container");
newsContainer.innerText= '';
allNews.forEach(news =>{
    const {title,image_url,details,author,rating,thumbnail_url} = news;
    const newDiv = document.createElement('div');
    newDiv.classList.add('col','d-block','d-md-flex','gap-5','bg-light','rounded','p-3');
    newDiv.innerHTML=`
    <div class="">
    <img class=" h-100" src="${thumbnail_url}" alt="" style="max-width:300px">
 </div>
 <div class="">
 <h3>${title}</h3>
    <p>${details.length >150?details.slice(0,150)+'...':details}</p>
<div class="d-flex  align-items-center justify-content-between ">
<div class="d-flex gap-2">
<div class=""><img src="${image_url}" alt="" style=" border-radius: 50%; width:45px;height:50px"></div>
<div class="d-block">
        <h3>${author.name}</h3>
        <p>${author.published_date}</p>
   </div> 
</div>
   <div> <h6 class="">${rating.number}M</h6></div>
   <div class="d-flex">
   <i class="fa-solid fa-star-sharp"></i><i class="fa-solid fa-star-sharp"></i>
   <i class="fa-solid text-warning fa-star-sharp"></i>
   <i class="fa-solid text-warning fa-star-sharp"></i>
   </div>
   <i onclick="newsDetail('${news._id}')" class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
</div>
 </div>
    `;
    newsContainer.appendChild(newDiv);
})
spinner.classList.add("d-none")
}
// news detail ///
const newsDetail = async newsData=>{
    const url = `https://openapi.programming-hero.com/api/news/${newsData}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetail(data.data[0])
        }
        catch(error){
            console.log(error)
        }
    }
 const displayNewsDetail = modal =>{
console.log(modal);


const modalTittle = document.getElementById("exampleModalLabel");
modalTittle.innerText = modal.author.name?modal.author.name:'No Name Data';
const modalBody = document.getElementById("modal-body");
modalBody.innerHTML=`
<div class="modal-body rounded-lg">
<p>${modal.details.length >150?modal.details.slice(0,2000)+'...':modal.details}</p>
<img class=" h-100" src="${modal.image_url}" alt="" style="max-width:300px">
</div>
<div class="modal-footer">
 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</div>
`;
 }  

loadCatagory();