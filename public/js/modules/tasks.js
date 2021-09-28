import axios from 'axios';
import Swal from 'sweetalert2';
import {updateavance} from "./functions/avance";

const tasks = document.querySelector('.listado-pendientes');

if(tasks) {
    tasks.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')) {
            const { tarea: taskId } = e.target.parentElement.parentElement.dataset;

            const url = `${location.origin}/tasks/${taskId}`;

            axios.patch(url, {taskId})
                .then(res => {
                    if(res.status === 200){
                        e.target.classList.toggle('completo');
                        updateavance();
                    }
                });
        }

        if(e.target.classList.contains('fa-trash')) {
            const taskHtml = e.target.parentElement.parentElement;
            const { tarea: taskId } = taskHtml.dataset;
            const url = `${location.origin}/tasks/${taskId}`;

            Swal.fire({
                title: 'Desear eliminar esta tarea ?',
                text: "No podras recuperar esta tara",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(url, {
                        params: {
                            taskId
                        }
                    })
                        .then(res => {
                            if(res.status === 200) taskHtml.remove();

                            Swal.fire(
                                'Tarea Eliminada',
                                res.data,
                                'success'
                            )

                            updateavance();
                        });
                }
            })
        }
    });
}

export default tasks;
