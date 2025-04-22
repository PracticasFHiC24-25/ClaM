new Vue({
    el: '#schedule-app',

    data(){
        return {
            calendar: null,

            // Ejemplo de objetivos para visualizar rápidamente
            goals: [
                { title:'Estudiar Matemáticas', start:'2025-04-22T09:00:00', end:'2025-04-22T11:00:00' },
                { title:'Lectura', start:'2025-04-23T10:00:00', end:'2025-04-23T11:00:00' },
                { title:'Tocar la guitarra', start:'2025-04-24T14:00:00', end:'2025-04-24T16:00:00' }
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
                events: this.goals, // Carga los eventos de ejemplo
                editable: true,       // Permite arrastrar y cambiar horarios visualmente
                selectable: true,     // Permite selección visual
                height: 'auto',

                // Opciones del menú superior del calendario
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                }
            });

            // Renderiza el calendario en pantalla
            this.calendar.render();
        },

        generateSchedule() {
        
            alert("En proceso de implementar.");
        }

    }
});