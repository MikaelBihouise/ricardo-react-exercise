import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import {Link, useParams} from 'react-router-dom';
import './App.css';
import ReactHtmlParser from 'react-html-parser';

export interface IDataItem {
    sellerId: string,
    imageUrl: string,
    title: string,
    price: number,
    descriptionHtml: string
}

export interface IDataUser {
    name: string
}

const ScreenResultPage = () => {

    const { id } = useParams<any>();
    const apiToken: string = ''; 

    const [dataItem, setDataItem] = useState({
        sellerId: '',
        imageUrl: '',
        title: '',
        price: 0,
        descriptionHtml: ''
    });
    const [dataUser, setDataUser] = useState({
        name: ''
    });

    useEffect(()=> {
        async function loadSearch() {
            const response = await fetch(`https://www.ricardo.ch/api/frontend/recruitment/article-details/?articleId=${id}&apiToken=${apiToken}`);
            const selectedItem = await response.json();
            setDataItem(selectedItem);
        }
        loadSearch();
    }, [])

    useEffect(()=> {
        async function loadSearchUser() {
            const response = await fetch(`https://www.ricardo.ch/api/frontend/recruitment/user/?userId=${dataItem.sellerId}&apiToken=f951a20e1b87c462d3ba0c479f6b1d65eaf9cf64`);
            const selectedUser = await response.json();
            setDataUser(selectedUser);
        }
        if(dataItem.sellerId !== ''){            
            loadSearchUser();
        }
    }, [dataItem])

    return (
        <div className='body'>
            <h1><Link to="/"><img src={logo} alt="Ricardo Logo" className='logo' /></Link></h1>
            <div className='content-details'>
                <div className='detail-image'>
                    <img src={dataItem.imageUrl}></img>
                </div>
                <div className='detail-item'>
                    <h2>{dataItem.title}</h2>
                    <div className='line-decoration'></div>
                    <p><span className='bold'>Seller:</span> {dataUser.name}</p>
                    <p><span className='bold'>Price:</span> {dataItem.price} CHF</p>
                    <div className='line-decoration'></div>
                    {ReactHtmlParser(dataItem.descriptionHtml)}
                </div>  
            </div>
        </div>
    );
};

export default ScreenResultPage
