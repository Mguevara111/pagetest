import {menu} from "./opcionesmenu.js";
let $main=document.querySelector('main');
let $productosmenu=document.getElementById('productosmenu');
let $fragmento=document.createDocumentFragment();
let $body=document.querySelector('body');
let $borrascript=null;//borra el script para quye no se cree cada vez que se lo llama
let $modal=document.getElementById('exampleModal');
let $modalbody=document.querySelector('.modal-body');
let $modalheader=document.querySelector('.modal-header');
// function generamenu(){
    
//     menu.forEach(el=>{
//         let $divmenu=document.createElement('div');
//         $divmenu.innerHTML=`
//                 <div class="col-3">
//                     <figure class="figure border border-2 border-dark">
//                         <img src="imagenes/napolitana.jpg" alt="" class="figure-img tamanomenu">
//                         <figcaption class="figure-caption ps-1"><strong>Nombre: ${el.nombre}</strong> <br>Tamaño: ${el.tamanio} <br>Caracteristicas: ${el.caracteristicas} <br>Costo: ${el.costo} </figcaption>
//                     </figure>
//                 </div>`;
//        $fragmento.appendChild($divmenu);
//     })
//     $productosmenu.appendChild($fragmento);
//     //$main.appendChild($productosmenu);
    
// }



const cargapagina= async function(pagina){
    try {
        let res=await fetch(`${pagina}.html`);
        let datos=await res.text();
        //console.log(datos)
        if (res.status!==200){
            throw {err:res.status}
        }else{
            $main.innerHTML=`${datos}`;
            if (pagina==='menu'){
            let $script=document.createElement('script');
            $script.type='module';
            $script.id='scriptmenu';
            $script.textContent = `
            import {menu} from "./opcionesmenu.js";
            let $fragmento=document.createDocumentFragment();
            let $productosmenu=document.getElementById('productosmenu');
            menu.forEach(el => {
            let $divmenu = document.createElement('div');
            
            $divmenu.classList.add('col-12','col-lg-4','text-center','mb-0','mb-2')
            $divmenu.innerHTML = \`
                <a href="" type="button" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                <figure class="figure border border-2 border-dark" data-nombre=\` + el.nombre + \`>
                    <img src="imagenes/napolitana.jpg" alt="" class="figure-img img-fluid">
                    <figcaption class="figure-caption ps-1">
                        <strong>Nombre: \` + el.nombre + \`</strong> <br>
                        Tamaño: \` + el.tamanio + \` <br>
                        Caracteristicas: \` + el.caracteristicas + \` <br>
                        Costo: \` + el.costo + \`
                    </figcaption>
                </figure>
                </a>
             \`;
            $fragmento.appendChild($divmenu);
            });
        $productosmenu.appendChild($fragmento);
        `;
        
        $body.appendChild($script);
        } 
        $borrascript=document.getElementById('scriptmenu');//borra el script para quye no se cree cada vez que se lo llama
    }
    } catch (error) {
        console.log(`hubo un error ${error.err}`);
    }
}


document.addEventListener('click',(e)=>{
    console.log(e.target);
    
   if (e.target.dataset.nom==='menu'){
   // console.log(e.target)
    cargapagina('menu');
   }
   if(e.target.dataset.nom==='reservaciones'){
    cargapagina('reservaciones');
    $borrascript.remove();   //borra el script para quye no se cree cada vez que se lo llama
    
   }
   if(e.target.dataset.nom==='principal'){
    location.reload();
   }
   if(e.target.parentNode.dataset.nombre){
    //console.log(menu[0].nombre);
    const a=menu.find(el=>el.nombre===e.target.parentNode.dataset.nombre)
    //****************************los nombres no deben tener espacio(piiza quesos), mejor usar id en la base */
    //console.log(Object.values(a));
    $modalheader.innerHTML=`<h1>${a.nombre}</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
    $modalbody.innerHTML=`
    <figure class="figure"> 
        <img src=${a.foto} alt="" class="figure-img img-fluid">
                    <figcaption class="figure-caption ps-1">
                        <strong>Nombre: ${a.nombre}</strong> <br>
                        Tamaño:${a.tamanio}<br>
                        Caracteristicas:${a.caracteristicas}<br>
                        Costo: ${a.costo}
                    </figcaption>
    </figure>
    `;
    
    //console.log(e.target.parentNode.dataset.nombre)
   }
})

