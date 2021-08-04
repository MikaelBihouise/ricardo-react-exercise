import React from 'react';
import {Link} from 'react-router-dom';

const CardResult = (props: any) => {

    const dateFull = new Date(props.endDate).toString();

    const d: Date = new Date(props.endDate);
    let date = [
        d.getFullYear(),
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('0' + d.getDate()).slice(-2)
    ].join('-');
    let endDate = date + ' at ' + dateFull.slice(15, 24);

    return (
        <div className='card-style'>
            <Link 
            to={`/article/${props.id}`}
            className='link'
            >
                <div className='card-image'>
                    <img src={props.picture} alt={'une image qui représente ' + props.title}></img>
                </div>
                <div className='card-content'>
                    <h2 className='card-title'>{props.title}</h2>
                    <p>Ending on: <span className='item-end-date'>{endDate}</span></p>
                    <span className='end'><p>{props.price} CHF</p></span>
                </div>
            </Link>
        </div>
    );
};

export default CardResult