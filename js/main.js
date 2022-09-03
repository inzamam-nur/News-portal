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
    newDiv.classList.add('border','border-success','rounded','py-3','px-4','my-3')
    newDiv.innerHTML=`
    <span onclick="catagoryDetail('${catagory.category_id}')">${catagory.category_name}</span>
    ` ;
    catagoryContainer.appendChild(newDiv);
    });
    };
    loadCatagory();