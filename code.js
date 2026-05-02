"use strict";
window.onload = main;


let photos = [];
let loaded = false;
let point = -1;
let slideInterval;

function main(){
    document.getElementById("LLF").addEventListener("click", loadPhotos);
    document.getElementById("LJ").addEventListener("click", loadJson);
    
    document.getElementById("prev").addEventListener("click", prevImage);
    document.getElementById("next").addEventListener("click", nextImage);
    document.getElementById("first").addEventListener("click", firstImage);
    document.getElementById("last").addEventListener("click", lastImage);
    
    document.getElementById("slide").addEventListener("click", startSlideShow);
    document.getElementById("random").addEventListener("click", randSlideShow);
    document.getElementById("stop").addEventListener("click", stopSlideShow);
        
    
    document.getElementById("myImage").addEventListener("click", nextImage);
    document.getElementById("display").value = "InitialImage.jpg";


}

function loadPhotos(){
    
    let folder = document.getElementById("folder").value;
    let common = document.getElementById("common").value;
    let start = parseInt(document.getElementById("num1").value);
    let end = parseInt(document.getElementById("end").value);

    if(start > end){
        document.querySelector("#stat").innerHTML = "Error: Invalid Range";
    
    } else{    
        photos = [];
        
        for (let i = 0; i <= end-start; i++){
            photos.push(folder + common + (i+start).toString() + ".jpg");
       }
       
       document.querySelector("#myImage").src = photos[0];
       loaded = true;
       point = 0;
       
       document.getElementById("display").value = photos[0];
       document.querySelector("#stat").innerHTML = "Photo Viewer System";
    }
}

function loadJson(){
    let link = document.getElementById("URL").value;

    fetch(link).then(response => response.json()).then(json => {
        photos = [];
        
        for(let i = 0; i < json.images.length;i++){
            photos[i] = json.images[i].imageURL;
        } 
        
        document.querySelector("#myImage").src = photos[0];
        loaded = true;
        point = 0;
       
        document.getElementById("display").value = photos[0];
        document.querySelector("#stat").innerHTML = "Photo Viewer System";
    });

}



function nextImage(){
    if (loaded == true){ 
        if (point == photos.length-1){
            document.querySelector("#myImage").src = photos[0];
            point = 0;
            document.getElementById("display").value = photos[0];
        
        }else {
            document.querySelector("#myImage").src = photos[point+1];
            point++;
            document.getElementById("display").value = photos[point];
        } 
        
    }else{
        document.querySelector("#stat").innerHTML = "Error: you must load data first";
    }
}

function prevImage(){
    if (loaded == true){
         
        if (point == 0){
            document.querySelector("#myImage").src = photos[photos.length-1];
            point = photos.length-1;
            document.getElementById("display").value = photos[photos.length-1];
        
        }else {
            document.querySelector("#myImage").src = photos[point-1];
            point--;
            document.getElementById("display").value = photos[point];
        } 
        
    }else{
        document.querySelector("#stat").innerHTML = "Error: you must load data first";
    }

}

function firstImage(){
    if (loaded == true){
        document.querySelector("#myImage").src = photos[0];
        document.getElementById("display").value = photos[0];
        point = 0;
    }else{
        document.querySelector("#stat").innerHTML = "Error: you must load data first";
    }

}

function lastImage(){
    if (loaded == true){
        document.querySelector("#myImage").src = photos[photos.length -1];
        document.getElementById("display").value = photos[photos.length -1];
        point = photos.length -1;
    }else{
        document.querySelector("#stat").innerHTML = "Error: you must load data first";
    }

}

function startSlideShow(){
    if (loaded == true){
        slideInterval = setInterval(nextImage , 1000);
    }else{
        document.querySelector("#stat").innerHTML = "Error: you must load data first";
    }

}

function randSlideShow (){
    if (loaded == true){
        /*LAMBDA*/
        slideInterval = setInterval(() => {
            let rand = Math.floor(Math.random() * photos.length);
            point = rand;
            document.querySelector("#myImage").src = photos[rand];
            document.getElementById("display").value = photos[rand];
        }, 1000);
    
    }else{
        document.querySelector("#stat").innerHTML = "Error: you must load data first";
    }
}

function stopSlideShow (){
    clearInterval(slideInterval);
}