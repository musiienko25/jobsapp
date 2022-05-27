import './styles.modal.scss'
import  { useLocation }  from 'react-router-dom';
import { useState } from 'react';

function Modal () {
    const location = useLocation();
    console.log(location.state)
    const [routeState, setRouteState] = useState<any>(location.state)
    return (    
        <div className='modal'>
            <div><span>Company name:  </span>{routeState.company_name}</div>
            <div><span>Location:  </span>{routeState.location}</div>
            <div><span>Slug:  </span>{routeState.slug}</div>
            <div><span>Title:  </span>{routeState.title}</div>
            <div className='modal__tag'>
                <span>Tags:  </span> 
                {routeState.tags.map((tag:any) => {
                return (<div>{tag}</div>)
            })}</div>

            <div><span>URL:  </span> {routeState.url}</div>
        </div>
    )

}

export default Modal;

