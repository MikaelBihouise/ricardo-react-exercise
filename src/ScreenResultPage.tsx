import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import {Link, useParams, useLocation} from 'react-router-dom';
import './App.css';
import CardResult from './components/CardResult';
import Select from 'react-select';

export interface IData {
    imageUrl: string,
    title: string,
    endDate: string,
    buyNowPrice: number,
    id: string
}

const options: {value: string, label: string}[] =  [
    { value: 'price-up', label: 'price ascending'},
    { value: 'price-down', label: 'price descending'},
    { value: 'none', label: 'none'}
]

const ScreenResultPage = () => {

    const sorting = useLocation<string>();
    const { searchText } = useParams<any>();

    console.log( sorting.pathname );

    const [data, setData] = useState([{
        imageUrl: '',
        title: '',
        endDate: '',
        buyNowPrice: 0,
        id: ''
    }]);
    const [sortBy, setSortBy] = useState<string>('');

    useEffect(()=> {
        async function loadSearch() {
            const response = await fetch(`https://www.ricardo.ch/api/frontend/recruitment/search/?searchText=${searchText}&apiToken=f951a20e1b87c462d3ba0c479f6b1d65eaf9cf64`);
            const searchList = await response.json();
            setData(searchList.articles);
        }
        loadSearch();
    }, [sortBy])

    const handleChangeSelect = (e: any) => {
        if(e.value === 'price-up'){
            setSortBy('up');
        } else if(e.value === 'price-down') {
            setSortBy('down');
        } else {
            setSortBy('none');
        }
    };

    if(sortBy === 'up'){
        data.sort((a, b) => a.buyNowPrice - b.buyNowPrice);
    }
    if(sortBy === 'down') {
        data.sort((a, b) => b.buyNowPrice - a.buyNowPrice);
    }
    if(sortBy === 'none') {
        data.sort();
    }

    let resultCards = data.map((item) => {
        return (
            <CardResult picture={item.imageUrl} title={item.title} endDate={item.endDate} price={item.buyNowPrice} id={item.id} />
        )
    })

    return (
        <div className='body'>
            <h1><Link to="/"><img src={logo} alt="Ricardo Logo" className='logo' /></Link></h1>
            <div className='result-info'>
                <p className='result-counter'> Total count: {data.length}</p>
                <p className='result-sort'>Sort by:</p>
                <div className='result-select'>  
                    <Select
                        options={options}
                        onChange={handleChangeSelect}
                    />
                </div>
            </div>
            <div className='content-result'>
                {resultCards}
            </div>
        </div>
    );
};

export default ScreenResultPage
