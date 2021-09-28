import Swal from 'sweetalert2';

export const updateavance = () => {
    // TODO Seleccionar las tareas Existentes
    const tasks = document.querySelectorAll('li.tarea');

    if(tasks.length){
        // TODO Seleccionar las tareas completadas
        const completedTasks = document.querySelectorAll('i.completo');


        // TODO Calcular avance
        const avance = Math.round((completedTasks.length / tasks.length)* 100);


        // TODO Mostrar Avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%'

        if(avance === 100){
            Swal.fire(
                'Proyecto completado',
                'Felicidades, has terminado tus tareas',
                'success'
            )
        }
    }
}
