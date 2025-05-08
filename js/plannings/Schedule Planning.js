new Vue({
    el: '#schedule-app',

    data(){
        return {
            calendar: null,

            // Horario base hardcodeado (se ve al entrar)
            baseSchedule: [
                { title: 'Estudiar Matemàtiques', start: '2025-05-05T09:00:00', end: '2025-05-05T11:00:00' }, 
                { title: 'Lectura', start: '2025-05-06T10:00:00', end: '2025-05-06T11:00:00' },               
                { title: 'Tocar la guitarra', start: '2025-05-07T14:00:00', end: '2025-05-07T16:00:00' },      
                { title: 'Estudiar anglès', start: '2025-05-08T13:00:00', end: '2025-05-08T15:00:00' }         
            ],

            // Horario que añadirá la IA (estudio musical)
            iaOptions: [
                [ // IA opción 1
                  { title: 'Estudiar violí', start: '2025-05-09T17:00:00', end: '2025-05-09T18:00:00' },
                  { title: 'Estudiar música', start: '2025-05-10T10:00:00', end: '2025-05-10T11:30:00' },
                  { title: 'Estudiar Història', start: '2025-05-11T12:00:00', end: '2025-05-11T14:00:00' }
                ],
                [ // IA opción 2 (con diferente distribución)
                  { title: 'Pràctica de violí', start: '2025-05-06T18:00:00', end: '2025-05-06T19:30:00' },
                  { title: 'Assaig musical', start: '2025-05-08T11:00:00', end: '2025-05-08T12:00:00' },
                  { title: 'Història de la música', start: '2025-05-10T17:00:00', end: '2025-05-10T18:30:00' }
                ]
            ],

            iaIndex: 0, // alterna entre 0 y 1

        };
    },

    mounted(){
        this.initCalendar();
        this.loadBaseSchedule();
    },

    methods:{
        initCalendar(){
            // Inicializa el calendario FullCalendar
            this.calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
                initialView: 'timeGridWeek',
                locale: 'cat', // Establece el idioma a catalán
                events: [], // Carga los eventos de ejemplo
                editable: true,       // Permite arrastrar y cambiar horarios visualmente
                selectable: true,     // Permite selección visual
                select: this.addManualBlock, // Método para agregar bloque manualmente
                eventClick: this.deleteEvent, // Método para eliminar evento al hacer clic
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
                    day: 'Vista diària'
                },

                // Cambiar "All day" por "Todo el día"
                allDayText: 'Tot el dia'
            });

            // Renderiza el calendario en pantalla
            this.calendar.render();
        },

        // Carga el horario base en el calendario
        // Este método se llama al cargar la página y añade los eventos predefinidos al calendario
        loadBaseSchedule(){
            this.baseSchedule.forEach(event => {
                // Añade un nuevo evento al calendario con los datos predefinidos
                this.calendar.addEvent({
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    allDay: false
                });

            });
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

        // Método para eliminar un evento al hacer clic en él
        deleteEvent(info) {
            // Pregunta al usuario si realmente quiere eliminar el evento
            if (confirm("Vols eliminar aquest bloc horari?")) {
                info.event.remove(); // Si acepta, elimina el evento
            }
        },


        generateSchedule() {

            const iaEvents = this.iaOptions[this.iaIndex];

        
            // Añadir objetivos generados por la IA
            iaEvents.forEach((event, index) => {
                // Añadir evento
                this.calendar.addEvent({
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    allDay: false
                });

                // Añadir un descanso de 30 min después del evento
                const end = new Date(event.end);
                const breakStart = new Date(end);
                const breakEnd = new Date(end.getTime() + 30 * 60000); // 30 min

                this.calendar.addEvent({
                    title: 'Descans',
                    start: breakStart,
                    end: breakEnd,
                    backgroundColor: '#FF5722',
                    borderColor: '#FF5722',
                    allDay: false
                });
            });

            // Alternar al siguiente set IA para el próximo clic
            this.iaIndex = (this.iaIndex + 1) % this.iaOptions.length;
            alert("Horari amb IA generat correctament!");
        }

    }
});