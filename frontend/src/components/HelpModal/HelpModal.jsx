import React from 'react'
import style from './HelpModal.module.css'
import { TopView, Isometric, Eraser, ClearPanel, Download, Hoist, Mirror, RotateExtraLeft, RotateExtraRight, RotateLeft, RotateRight, ZoomIn, ZoomOut, Trash } from '../../assets/icons'

const HelpModal = ({closeFunction}) => {
  return (
    <div className={style.backdrop} onClick={()=>closeFunction(false)}>
        <div className={style.modal}>
            <h2>Instrucciones</h2>
            <p>Para utilizar la aplicación, debes seguir las siguientes instrucciones:</p>
            <ul>
                <li>Elige una categoría del selector.</li>
                <li>Elige la vista que deseas ver, 3d {'('}<span><Isometric/></span>{')'} o aerea {'('}<span><TopView/></span>{')'}.</li>
                <li>Haz click en el elemento que quieras que aparezca en la imagen final.</li>
                <li>Para mover los elementos haga click sobre el mismo y arrastre. Para abrir el panel de acciones posicione el cursor sobre el elemento.</li>
                <li>Puede borrar la totalidad de los elementos seleccionados con el botón de borrar {'('}<span><Eraser/></span>{')'}.</li>
                <li>Puede cerrar la totalidad de los paneles de acción abiertos con el botón de cerrar {'('}<span><ClearPanel/></span>{')'}.</li>
                <li>Para guardar la imagen, haga click en el boton descargar {'('}<span><Download/></span>{')'}. Tenga en cuenta que solo serán visibles loes elementos dentro del recuadro blanco</li>
            </ul>
            <p>Opciones de modificación de elementos:</p>
            <ul>
                <li><span><Hoist/></span> - Subir los elementos sobre el eje Z o hacia arriba.</li>
                <li><span><Mirror/></span> - Refleja los elementos sobre el eje X.</li>
                <li><span><RotateExtraLeft/></span> - Rotar los elementos 45 grados a la izquierda.</li>
                <li><span><RotateExtraRight/></span> - Rotar los elementos 45 grados a la derecha.</li>
                <li><span><RotateLeft/></span> - Rotar los elementos 15 grados a la izquierda.</li>
                <li><span><RotateRight/></span> - Rotar los elementos 15 grados a la derecha.</li>
                <li><span><ZoomIn/></span> - Agranda los elementos.</li>
                <li><span><ZoomOut/></span> - Reduce los elementos.</li>
                <li><span><Trash/></span> - Elimina los elementos seleccionados.</li>
            </ul>
            <p><strong>Aunque esta aplicación se puede usar en dispositivos móviles. Lo ideal es usar una computadora.</strong></p>
        </div>
    </div>
  )
}

export default HelpModal