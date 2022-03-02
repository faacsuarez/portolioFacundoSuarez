//const URLBase = "http://localhost:3000"
const URLBase = "https://facundosuarez.glitch.me"

let datosGlobales;

const revelar = () => {
    ScrollReveal({
        reset: true,
        distance: "60px",
        duration: 1500,
        delay: 0,
    });
    ScrollReveal().reveal('.revelar', { delay: 0, origin: "left" });
}
revelar();

/*
const myNav = document.querySelector(".nav-icon");
window.addEventListener('scroll', () => {
  if(window.pageYOffset > 20) {
    myNav.classList.add('abajo');
  } else {
    myNav.classList.remove('abajo');
  }
});
*/
const navIcon = document.querySelector(".nav-icon")
const overlay = document.querySelector(".overlay");
const overlayA = document.querySelectorAll(".overlay a");

navIcon.addEventListener("click", ()=> {

  navIcon.classList.toggle("open");
  overlay.classList.toggle("open");
  overlayA.forEach(probando => {
      probando.classList.toggle("open");
  })
  //overlayP.classList.toggle("open");
})


let contenidoTodosTrabajos = document.querySelector(".todosLosTrabajos--content");

let ampliacionTrabajo = document.querySelector(".ampliacionTrabajo");
let ampliacionTrabajoPortada = document.querySelector(".ampliacionTrabajo-portada");
let ampliacionTrabajoContenido = document.querySelector(".ampliacionTrabajo-contenido");


/*
fetch(URLBase + "/usuarios")
    .then(r => r.json())
    .then (datos => {
        console.log(datos);
        datos.forEach(persona => {
            parrafo.innerHTML += `Soy ${persona.nombre}, mi apellido es ${persona.apellido}<br>`
        });
});
*/
fetch(URLBase + "/trabajos")
    .then(r => r.json())
    .then (datos => {

        datosGlobales = datos;
        mostrarTrabajos();
});


const mostrarTrabajos = () => {

    datosGlobales.forEach(trabajo => {

        contenidoTodosTrabajos.innerHTML += `

            <article id="portada-article" data-idtrabajo="${trabajo._id}" class="btnAmpliar" style="background-image: linear-gradient(180.32deg, rgba(196, 196, 196, 0) 0.28%, #000000 105.81%), url('${trabajo.portada}');">
                    <h4>${trabajo.nombre}</h4>
            </article>
            `;
        

    let botonAmpliarTrabajo = document.querySelectorAll(".btnAmpliar")

    botonAmpliarTrabajo.forEach(botoncito => {
            botoncito.addEventListener("click", ampliarTrabajoPorBoton);
    })
    
    });
    
}


const ampliarTrabajoPorBoton = evt => {

    document.querySelector(".ampliacionTrabajo").style.display = "flex";

    document.querySelector("header").style.display = "none";
    document.querySelector("#quiensoy").style.display = "none";
    document.querySelector(".todosLosTrabajos").style.display = "none";
    document.querySelector(".contacto").style.display = "none";

    let idTrabajoAmpliar = evt.target.getAttribute("data-idtrabajo");

    fetch(URLBase + "/trabajos/"+idTrabajoAmpliar, {
        method:"GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(r => r.json())
    .then(trabajoEncontrado => {

    document.querySelector(".ampliacionTrabajo-portada").style.backgroundImage = `linear-gradient(45deg, black, transparent), url(${trabajoEncontrado.portada})`;

    ampliacionTrabajoPortada.innerHTML = `
    <ion-icon id="closeAmpliar" name="arrow-back-outline"></ion-icon>
    <h2>${trabajoEncontrado.nombre}</h2>
    `

        ampliacionTrabajoContenido.innerHTML = `

            <h3>Descripción</h3>

            <div class="descripcion-contenido">

            <div class="descripcion-principal">
                <p>${trabajoEncontrado.descripcionLarga}</p>
                <a href="${trabajoEncontrado.enlace}" target="_blank">Ver más</a>
            </div>
    
            <div class="descripcion-extra">
                <div class="categorias">
                    
                </div>
                <p>Asignatura: <b>${trabajoEncontrado.asignatura}</b></p>
                <p>${trabajoEncontrado.realizacion}</p>
                <p>${trabajoEncontrado.fecha}</p>
            </div>
    
            </div>
    
            <div class="uiguide">
                <h3>UI guide</h3>
                <h4>Colores</h4>
                    <div class="colores"></div>
                
                    <div class="tipografias"></div>
            </div>


            <div class="imagenes-ampliacion">
                <h3>Imágenes</h3>
                    <div class="img-contenido"></div>

            </div>

            <div class="agradecimiento">
                <span>&#128079;</span>
                <h4>Gracias por llegar hasta aquí &#128540</h4>
            </div>   
        </div>             
        `;

        let coloresDiv = document.querySelector(".colores");
        let imgContenido = document.querySelector(".img-contenido");
        let tipografiasContenedor = document.querySelector(".tipografias");
        let categorias = document.querySelector(".categorias");
        
        trabajoEncontrado.categorias.forEach(categoria => {
            categorias.innerHTML += `
            <a class="${categoria}">${categoria}</a>
            `
        })
        
        trabajoEncontrado.colores.forEach(color => {
            coloresDiv.innerHTML += `
            <div class="color-individual">
                <div class="circulo" style="background-color:#${color.codigo};"></div>
                <p>${color.nombre} <br> <span>#${color.codigo}</span></p>
            </div>
            `
        })

        trabajoEncontrado.imagenes.forEach(img => {
            imgContenido.innerHTML += `
            <div class="img" style="background:url('${img.foto}'); background-size:cover; background-position:center;"></div>
            `
        })

        if(trabajoEncontrado.tipografiasUsadas){
            tipografiasContenedor.innerHTML += `
            <h4>Tipografías</h4>
            `
            trabajoEncontrado.tipografiasUsadas.forEach(tipografia => {
                tipografiasContenedor.innerHTML += `
                <div class="tipografia-${tipografia.tipo}" style="background:url('${tipografia.captura}'); background-size:contain; background-position:center; background-repeat: no-repeat"></div>
                `
            })
        }
        

        
        let btnCerrarModal = document.querySelector("#closeAmpliar");

        const cerrarModal = () =>{
            document.querySelector(".ampliacionTrabajo").style.display = "none";

        document.querySelector("header").style.display = "flex";
        document.querySelector("#quiensoy").style.display = "flex";
        document.querySelector(".todosLosTrabajos").style.display = "flex";
        document.querySelector(".contacto").style.display = "flex";

        }
        btnCerrarModal.addEventListener("click", cerrarModal);
    });
    
}












// ------------- LISTAR EVENTOS -------- //
const listarEventos = () => {

    const months = ["enero", "febrero", "marzo","abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"];
    todosEventos.innerHTML = "";

    datosEventosListar.forEach(evento => {

        var mydate = new Date(evento.fecha);
        let fechaFormateada = mydate.getDate() + " " + months[mydate.getMonth()] + " " + mydate.getFullYear()

        document.querySelector("#todosEventos").innerHTML += `
        <article class="infoEvento">
            <img src="img/${evento.categoria}${evento.numero}.jpeg">
            <h3>${evento.nombre}</h3>
            <small class="${evento.categoria}">${evento.categoria}</small>
            <p><i class="fas fa-map-marker-alt"></i>${evento.ubicacion}</p>
            <p><i class="far fa-calendar-alt"></i>${fechaFormateada}</p>
            <p><i class="far fa-clock"></i>${evento.horaInicio} - ${evento.horaFin}</p>
            <p><input type="button" data-idEvento="${evento._id}" value="+" class="ampliacionEvento" id="${evento.categoria}"></p>
        </article>`;
    })
    let botonAmpliarEvento = document.querySelectorAll(".ampliacionEvento")

    botonAmpliarEvento.forEach(botoncito => {
            botoncito.addEventListener("click", ampliarUsuarioBoton);
    })
}


const startAnimation = (entries, observer) => {
    entries.forEach(entry => {
    let values = entry.target.classList.value;
    if(values.includes("noventa")){
        entry.target.classList.toggle("animacion-noventa", entry.isIntersecting);
    }
    else if(values.includes("ochenta")){
        entry.target.classList.toggle("animacion-ochenta", entry.isIntersecting);
    }
    else if(values.includes("setenta")){
        entry.target.classList.toggle("animacion-setenta", entry.isIntersecting);
    }
    else {
        entry.target.classList.toggle("animacion-sesenta", entry.isIntersecting);
    }
    });
  };
  
  const observer = new IntersectionObserver(startAnimation);
  const options = { root: null, rootMargin: '0px', threshold: 1 }; 
  
  const elements = document.querySelectorAll('.porcentaje');
  elements.forEach(el => {
    observer.observe(el, options);
  });