new Vue({
    el: '#schedule-app',

    data(){
        return {
            calendar: null,

            // Ejemplo de objetivos para visualizar rápidamente
            goals: [
                { title:'Estudiar Matemàtiques', start:'2025-04-27T09:00:00', end:'2025-04-27T11:00:00' },
                { title:'Lectura', start:'2025-04-28T10:00:00', end:'2025-04-28T11:00:00' },
                { title:'Tocar la guitarra', start:'2025-04-31T14:00:00', end:'2025-04-31T16:00:00' }
            ]
        };
    },

    mounted(){
        this.initCalendar();
    },

    methods:{
        initCalendar(){
            // Inicializa el calendario FullCalendar
            this.calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
                initialView: 'timeGridWeek',
                locale: 'cat', // Establece el idioma a español
                events: this.goals, // Carga los eventos de ejemplo
                editable: true,       // Permite arrastrar y cambiar horarios visualmente
                selectable: true,     // Permite selección visual
                select: this.addManualBlock, // Método para agregar bloque manualmente
                height: 'auto',
    

                // Opciones del menú superior del calendario
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                },

                // Traducción manual de los botones:
                buttonText: {
                    today:    'Avui',
                    month:    'Mes',
                    week:     'Setmana',
                    day:      'Dia',
                    list:     'Llista',
                    prev:     '<',
                    next:     '>',
                },
                
                buttonHints: {
                    prev: 'Setmana anterior',     // cuando pasas el ratón por encima de "Anterior"
                    next: 'Setmana següent',     // cuando pasas el ratón por encima de "Siguiente"
                    today: 'Avui',                 
                    month: 'Vista mensual',
                    week: 'Vista setmanal',
                    day: 'Vista diaria'
                },

                // Cambiar "All day" por "Todo el día"
                allDayText: 'Tot el dia'
            });

            // Renderiza el calendario en pantalla
            this.calendar.render();
        },

        // Info: Es un objeto JavaScript que FullCalendar genera automáticamente cuando el usuario 
        // selecciona un bloque de tiempo con el ratón.
        addManualBlock(info) {
            // Muestra una ventana prompt donde el usuario escribe el nombre del bloque
            const nombre = prompt("Nom del bloc horari:");

            // Si el usuario no escribe nada (deja vacío o cancela), no se añade nada
            if (!nombre) return;
            
            // Añade un nuevo evento al calendario con los datos seleccionados por el usuario
            this.calendar.addEvent({
                title: nombre,        // el nombre que escribió el usuario
                start: info.start,    // fecha y hora de inicio del bloque (objeto Date)
                end: info.end,        // fecha y hora de fin del bloque
                allDay: false         // indica que NO es un evento de todo el día
            });
          
            // Limpia selección
            this.calendar.unselect();
        },


        generateSchedule() {
            alert("Horari generat amb èxit!"); // Mensaje de éxito al generar el horario
        }

    }
});