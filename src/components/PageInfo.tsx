import './styles.modal.scss'
import  { useLocation }  from 'react-router-dom';
import { useState } from 'react';
import { Text } from "@nextui-org/react";

function PageInfo () {
    const location = useLocation();
    const [routeState, setRouteState] = useState<any>(location.state)
    const doc = routeState.description;

    return (    
        <div className='modal'>
            <div className='modal__wrapper'>
            <Text size={18} color="white">
                <div dangerouslySetInnerHTML={{ 
                        // @ts-ignore
                    __html: doc }} />
                    <div><span className='modal__titles'>Company name:  </span>{routeState.company_name}</div>
                    <div><span className='modal__titles'>Location:  </span>{routeState.location}</div>
                    <div><span className='modal__titles'>Slug:  </span>{routeState.slug}</div>
                    <div><span className='modal__titles'>Title:  </span>{routeState.title}</div>
                    <div className='modal__tag'>
                        <span className='modal__titles'>Tags:  </span> 
                        {routeState.tags.map((tag:any) => {
                        return (<div>{tag}</div>)
                    })}</div>

                    <div><span className='modal__titles'>URL:  </span> {routeState.url}</div>
                </Text>
            </div>
        </div>
    )

}

export default PageInfo;

