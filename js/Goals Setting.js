/* js/goals.js (SIN localStorage, solo simulación visual) */

new Vue({
  el: '#goals-app',

  data(){
      return{
          goals:[
            {
              name: 'Estudiar Matemáticas',
              week: { value: 5, unit: 'h' },
              day: { value: 45, unit: 'm' }
            },
            {
                name: 'Lectura',
                week: { value: 3, unit: 'h' },
                day: { value: 30, unit: 'm' }
            },
            {
                name: 'Tocar la guitarra',
                week: { value: 4, unit: 'h' },
                day: { value: 60, unit: 'm' }
            }
          ],
          newGoal:{
              name:'',
              week:{ value:'', unit:'h' },
              day :{ value:'', unit:'m' }
          }
      };
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

      // Añade objetivo a la lista visual
      addGoal(){
          // Validación mínima: sin nombre no hacemos nada
          // trim() elimina espacios delante/detrás.
          if(!this.newGoal.name.trim()) return;

          this.goals.push(this.newGoal); // Añadimos el nuevo objetivo a la lista
          
          // Limpiamos el formulario para la siguiente entrada.
          this.resetNew();
      },

      // Elimina objetivo visual
      removeGoal(i){ 
          // splice(posición, nº elementos) quita 1 elemento en la posición i
          this.goals.splice(i,1); 
      },

      saveAll(){
        alert('La funcionalidad de guardado en el almacenamiento se implementará próximamente.');
      }
  }
});