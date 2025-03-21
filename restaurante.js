import {menu} from "./opcionesmenu.js";
let $main=document.querySelector('main');
let $productosmenu=document.getElementById('productosmenu');
let $fragmento=document.createDocumentFragment();
let $body=document.querySelector('body');
let $borrascript=null;//borra el script para quye no se cree cada vez que se lo llama
let $modal=document.getElementById('exampleModal');
let $modalbody=document.querySelector('.modal-body');
let $modalheader=document.querySelector('.modal-header');

let letrasvermenu1=document.querySelector('.vermenu');
let contact=document.querySelector('.contact');
let botondianoche=document.querySelector('.ndbutton');
let darkmode=document.querySelector('[data-dark]');
let navdarkmode=document.querySelector('[data-navdark]');
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
                <figure class="figure border border-2 border-dark pb-3 figuremenu" data-id=\` + el.id + \`>
                    <img src="\` + el.foto +\`" alt="" class="figure-img img-fluid">
                    <figcaption class="figure-caption ps-0 fc">
                        <div class="divfigureg"></div>
                        <strong>\` + el.nombre + \`</strong> <br>
                        <div class="divfigurer"></div>
                    </figcaption>
                </figure>
                </a>
             \`;
            $fragmento.appendChild($divmenu);
            });
        $productosmenu.appendChild($fragmento);
        
        const elementosmenug=document.querySelectorAll('.divfigureg');
        const elementosmenur=document.querySelectorAll('.divfigurer');
            const cb=(entries)=>{
                entries.forEach(ent=>{
                    if(ent.isIntersecting){
                        ent.target.classList.add('animarletrasmenu')
                        
                    }else{
                       ent.target.classList.remove('animarletrasmenu') 
                    }
                    })
                }
            const ob=new IntersectionObserver(cb,{threshold:1})
            elementosmenur.forEach(el=>ob.observe(el));
            elementosmenug.forEach(el=>ob.observe(el));

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
    //console.log(e.target);
    
   if (e.target.dataset.nom==='menu'){
   // console.log(e.target)
    cargapagina('menu');
   }
//    if(e.target.dataset.nom==='reservaciones'){
//     cargapagina('reservaciones');
//     $borrascript.remove();   //borra el script para quye no se cree cada vez que se lo llama
    
//    }
   if(e.target.dataset.nom==='principal'){
    location.reload();
   }
   if(e.target.parentNode.dataset.id){
    console.log(e.target.parentNode.dataset.id);
    const a=menu.find(el=>el.id===e.target.parentNode.dataset.id)
    //****************************los nombres no deben tener espacio(piiza quesos), mejor usar id en la base */
    //console.log(a);
    $modalheader.innerHTML=`<h1>${a.nombre}</h1><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
    $modalbody.innerHTML=`
    <figure class="figure"> 
        <img src=${a.foto} alt="" class="figure-img img-fluid">
                    <figcaption class="figure-caption ps-1">
                        ${a.caracteristicas}<br>
                        Costo: ${a.costo[0]}
                    </figcaption>
    </figure>
    `;
    
    //console.log(e.target.parentNode.dataset.nombre)
   }
   if(e.target.matches('.vermenu')){
    
    cargapagina('menu');
   }
   if(e.target.matches('.ndbutton')){
    //console.log('dia/noche')
    let sol='🔆'
    let luna='🌙'
    if(e.target.textContent===luna){
        $body.classList.add('dark')
        darkmode.classList.remove('link-dark')
        darkmode.classList.add('link-light')
        navdarkmode.classList.remove('navbar-light','bg-light')
        navdarkmode.classList.add('navbar-dark','bg-dark')
        //console.log('sol')
        botondianoche.textContent='🔆'
    }else if(e.target.textContent===sol){
        $body.classList.remove('dark')
        darkmode.classList.add('link-dark')
        darkmode.classList.remove('link-light')
        navdarkmode.classList.add('navbar-light','bg-light')
        navdarkmode.classList.remove('navbar-dark','bg-dark')
        //console.log('luna')
        botondianoche.textContent='🌙'
    }
    
   }
})

const entradas=(c,e)=>{
    const cb1=(entries)=>{
        entries.forEach(ent=>{
            if(ent.isIntersecting){
                ent.target.classList.add(c)
                
            }else{
               ent.target.classList.remove(c) 
            }
            })
        }
    const obser=new IntersectionObserver(cb1,{threshold:1})
    obser.observe(e);
}

document.addEventListener('DOMContentLoaded',()=>{
    entradas('imgcontact',contact);
    //entradas('letrasvermenu',letrasvermenu1);
    //console.log(letrasvermenu1)
    const cb2=(entries)=>{
        entries.forEach(ent=>{
            if(ent.isIntersecting){
                ent.target.classList.add('letrasvermenu')
                
            }
            })
        }
    const obser1=new IntersectionObserver(cb2,{threshold:1})
    obser1.observe(letrasvermenu1);   
    

})
