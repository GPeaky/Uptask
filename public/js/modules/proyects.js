import Swal from 'sweetalert2';
import axios from 'axios';

const btnDelete = document.querySelector('#eliminar-proyecto');

if(btnDelete){
    btnDelete.addEventListener('click', e => {
        const urlProyect = e.target.dataset.url;

        Swal.fire({
            title: 'Desear eliminar este proyecto ?',
            text: "No podras recuperar este proyecto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `${location.origin}/proyects/${urlProyect}`;

                axios.delete(url, {params: {urlProyect}})
                    .then(r => {
                        const { title, subtitle, type } = r.data;
                        Swal.fire(
                            title,
                            subtitle,
                            type
                        );
            
                        // Redirect al inicio
                        setTimeout(() => {
                            window.location.href = '/';
                        } , 3000);
                    })
                    .catch(err => {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Algo salio mal!'
                        })
                    });
            }
        })
    })
}

export default btnDelete;