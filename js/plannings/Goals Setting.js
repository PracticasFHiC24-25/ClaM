new Vue({
    el: '#goals-app',

    data(){
    return{
        goals:[],
        pieces: [], // Lista de piezas 
        newGoal:{
            name:'',
            week:{ value:'', unit:'h' },
            day :{ value:'', unit:'m' },
            warmupDuration: 15, // Tiempo de calentamiento (en minutos)
            piece: '' // Pieza a practicar
        },

        warmup: {
            enabled: false,
            minPerSession: 15  // Valor inicial de 15 minutos, ajustable por el usuario
        }
    };
    },

    created(){
        // Este método especial se ejecuta automáticamente cuando el componente se ha creado (antes de mostrarse en pantalla).

        const datos = localStorage.getItem('misObjetivos');
        // Intenta recuperar desde el navegador una lista guardada anteriormente bajo la clave 'misObjetivos'.

        if (datos) {
            // Si encuentra datos, los convierte de texto (JSON) a objeto de JavaScript y los guarda en la lista reactiva 'goals' y 'pieces'.
            const storedData = JSON.parse(datos);
            this.goals = storedData.goals || [];
            this.pieces = storedData.pieces || [];
    
        }
        // Si no hay nada guardado, simplemente 'goals' y 'pieces' seguirá vacío ([]).
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
                day :{ value:'', unit:'m' },
                warmupDuration: 15,
                piece: ''
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

            if (this.newGoal.warmupDuration < 15){
                alert("⚠️ El temps de calentament ha de ser com a mínim 15 minuts.");
                return;
            }

            // Si el calentamiento está activado, lo asociamos al objetivo
            const copia = JSON.parse(JSON.stringify(this.newGoal));
            copia.piece = this.newGoal.piece; // Guardamos la pieza que está practicando
            copia.warmupDuration = this.newGoal.warmupDuration; // Guardamos la duración del calentamiento

            // Añadimos el nuevo objetivo a la lista de objetivos
            this.goals.push(copia);

            // Añadir la pieza a la lista de piezas
            this.pieces.push(copia.piece);  


            // Limpiamos el formulario para que el usuario pueda escribir un nuevo objetivo sin borrar manualmente.
            this.resetNew();
        },

        // Elimina objetivo visual
        removeGoal(i){ 
            // splice(posición, nº elementos) quita 1 elemento en la posición i
            // Elimina el objetivo de la lista de objetivos (goals).
            this.goals.splice(i,1); 
        },

        removePiece(i){
            // splice(posición, nº elementos) quita 1 elemento en la posición i
            // Elimina la pieza de la lista de piezas (pieces).
            this.pieces.splice(i,1); 
        },

        saveAll(){
            // Guardamos tanto los objetivos como las piezas de violín en localStorage
            const dataToStore = {
                goals: this.goals,
                pieces: this.pieces
            };

            // Se llama cuando pulsas el botón "Desar tots" para guardar la lista de objetivos en el navegador.
            localStorage.setItem('misObjetivos', JSON.stringify(dataToStore));
            // Guarda ese texto en el navegador usando 'localStorage' bajo la clave 'misObjetivos'.
            // Así, aunque recargues la página o cierres el navegador, los objetivos seguirán ahí.

            alert('Objectius desats correctament!');
            // Muestra una alerta avisando que los objetivos se guardaron bien.
      }
  }
});