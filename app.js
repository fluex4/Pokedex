const er = document.getElementById("error")
const card = document.getElementsByClassName("card")[0];
const img = document.getElementById("pfp");
const name = document.getElementById("name");
const type = document.getElementById("type");
const imgType = document.getElementById("imgtype");
const list = document.getElementById("mainlist");
let imgs;

let z =document.getElementById("select");
fetch("https://pokeapi.co/api/v2/type/?limit=18")
.then(response=>{
    return response.json();
 })
    .then(data=>{
        console.log(data);

        data.results.forEach(element => {
            let opt = document.createElement("option");
            opt.value=element.name;
            opt.innerText=element.name;
            z.appendChild(opt);
        });
})

get=()=>{
    let data;
    let name=document.getElementById("inpt").value;
    name = name.trim();
    name=name.toLowerCase();
    //const select = document.getElementById("select").value;
    const bar = document.getElementById("bar");
    const url=`https://pokeapi.co/api/v2/pokemon/${name}`;
    if(name==""||name==" "){
        bar.classList.add("req");
        setInterval(()=>{
            bar.classList.remove("req");
        },800);
    }
    else{
        fetch(url)
            .then(response=>{
                if (!response.ok) { throw response }
                else
                    er.classList.add("hide");
                return response.json();
             })
             .then(data=>{
                 displayData(data);
                }).catch(err=>{
                    console.log(err);
                    er.classList.remove("hide");
                    
                    if(err.status==404)
                    er.innerText=`Status:${err.status}  No Such Pokemon found (We only have Orange League)`
                 });
    }
}
displayData=(data)=>{
    console.log(data);
    imgs=data.sprites;
    card.classList.remove("hide");
    list.classList.add("hide");
    img.src=data.sprites['front_default'];
    name.innerText=data.species.name;
    img.title=`${name.innerText} front_default`;
    imgType.innerText="front_default";

    type.innerHTML="";
    data.types.forEach(element => {
        let x =document.createElement("span");
        x.classList.add(element.type.name);
        x.innerText=element.type.name + " ";
        type.appendChild(x);
        
    });
    document.getElementById("height").innerText=data.height;
    document.getElementById("weight").innerText=data.weight;
    document.getElementById("order").innerText=data.order;

    let list1 =document.getElementById("list1");
    let list2 =document.getElementById("list2");

    list1.innerText=""
    list2.innerText=""
    data.moves.forEach(element => {
        let x =document.createElement("li");
        x.innerText=element.move.name + ", ";
        list1.appendChild(x);
        
    });
    data.abilities.forEach(element => {
        let x =document.createElement("li");
        x.innerText=element.ability.name + ", ";
        list2.appendChild(x);
        
    });


}
let count =0;
changeImg=()=>{
    if(count == 8)
    count =0;
    let a =["back_default","back_female","back_shiny","back_shiny_female","front_default","front_female","front_shiny","front_shiny_female"];
    let url = imgs[a[count++]];
    let text = a[count-1];
    if(url==null){
    url=imgs["front_default"]
    text="front_default"
}
    img.title=`${name.innerText} ${a[count-1]}`;
    imgType.innerText=text;
    img.src=url;
};

document.getElementById("inpt").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("btn").click();
    }
  });


displayList=()=>{
    let value = document.getElementById("select").value;
    er.classList.add("hide");
    card.classList.add("hide");
    list.classList.remove("hide");
    list.innerHTML="";
    fetch(`https://pokeapi.co/api/v2/type/${value}`)
    .then(response=>{
        return response.json();
     })
        .then(data=>{
            data.pokemon.forEach(p => {
                let index= p.pokemon.url.indexOf("/pokemon/");
                let id= p.pokemon.url.substr(index).slice(0, -1);

                let d = document.createElement("div");
                let img= document.createElement("img");
                let pa=document.createElement("p");

                d.classList.add("list");

                d.onclick=function(){
                    display(p.pokemon.name);
                    let x = document.getElementById("btn2");
                    x.click();
                }
                
                pa.innerText=p.pokemon.name;
                
                
               img.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/${id}.png`
               
               img.onerror=function(){
                img.src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/132.png";
               }
                
                d.appendChild(img);
                d.appendChild(pa);

                document.getElementById("mainlist").appendChild(d);
            });
}).catch(err=>{
            console.log(err);
            if(err.status==404)
            er.innerText=`Status:${err.status}  No Such Pokemon found `
         });
         function display(str){
            document.getElementById("inpt").value=str;
        }
}
checkerr=(id)=>{
    let x = id.slice(9);
    if(errlistt.includes(x)){
        console.log(x);
        return true;
    }

}
