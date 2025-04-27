new Vue({
    el: '#goals-app',

    data(){
    return{
        goals:[],
        newGoal:{
            name:'',
            week:{ value:'', unit:'h' },
            day :{ value:'', unit:'m' }
        }
    };
    },

    created(){
        // Este método especial se ejecuta automáticamente cuando el componente se ha creado (antes de mostrarse en pantalla).

        const datos = localStorage.getItem('misObjetivos');
        // Intenta recuperar desde el navegador una lista guardada anteriormente bajo la clave 'misObjetivos'.

        if (datos) {
            this.goals = JSON.parse(datos);
            // Si encuentra datos, los convierte de texto (JSON) a objeto de JavaScript y los guarda en la lista reactiva 'goals'.
        }
        // Si no hay nada guardado, simplemente 'goals' seguirá vacío ([]).
    },


    methods:{
        // Convierte horas o minutos siempre a minutos
        toMin(o){ 
            let resultado;
            if (o.unit === 'h') {
                resultado = o.value * 60;
            } else {
                resultado = o.value;
            }
            return resultado;
        },

        // Limpia formulario
        resetNew(){
            this.newGoal={
                name:'',
                week:{ value:'', unit:'h' },
                day :{ value:'', unit:'m' }
            };
        },

        // Se llama cuando pulsas el botón "Afegir" para añadir un nuevo objetivo.
        addGoal(){
            // Validación rápida: Si el campo nombre está vacío (o solo espacios), no hacemos nada.
            // trim() elimina espacios delante/detrás.
            if (!this.newGoal.name.trim()){
                alert("⚠️ Per favor, introdueix un nom per a l'objectiu.");
                return;
            }

            if (!this.newGoal.week.value || !this.newGoal.day.value){
                alert("⚠️ Per favor, indica el temps setmanal i diari per a aquest objectiu.");
                return;
            } 

            // Hacemos una copia real del objeto 'newGoal' para evitar que se modifique después al resetear el formulario.
            const copia = JSON.parse(JSON.stringify(this.newGoal));

            // Añadimos la copia del nuevo objetivo a la lista principal 'goals', que luego Vue mostrará en la tabla.
            this.goals.push(copia);


            // Limpiamos el formulario para que el usuario pueda escribir un nuevo objetivo sin borrar manualmente.
            this.resetNew();
        },

        // Elimina objetivo visual
        removeGoal(i){ 
            // splice(posición, nº elementos) quita 1 elemento en la posición i
            this.goals.splice(i,1); 
        },

        saveAll(){
            // Se llama cuando pulsas el botón "Desar tots" para guardar la lista de objetivos en el navegador.
            localStorage.setItem('misObjetivos', JSON.stringify(this.goals));
            // Convierte el array de objetivos ('goals') en un texto JSON.
            // Guarda ese texto en el navegador usando 'localStorage' bajo la clave 'misObjetivos'.
            // Así, aunque recargues la página o cierres el navegador, los objetivos seguirán ahí.

            alert('Objectius desats correctament!');
            // Muestra una alerta avisando que los objetivos se guardaron bien.
      }
  }
});