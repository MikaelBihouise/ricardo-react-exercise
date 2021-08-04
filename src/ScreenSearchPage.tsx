import React, {useState} from 'react';
import logo from './logo.svg';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const ScreenSearchPage = () => {

    let disabled;
    const history = useHistory();

    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [valueInput, setValueInput] = useState<string>('');
    
    if(isDisabled){
        disabled = {border:'1px solid #99acff'}
    } else {
        disabled = {border:'2px solid #627ae7'}
    }

    const handleChange = (e: string) => {
        setValueInput(e);
        setIsDisabled(false);
    }

    if(isDisabled === false && valueInput === '') {
        setIsDisabled(true);
    }

    const handleChangeClick = () => {
        history.push(`/search/${valueInput}`);
    }

    return (
        <div className='body'>
            <h1><img src={logo} alt="Ricardo Logo" className='logo' /></h1>
            <form className='content'>
                <input 
                    type="text" 
                    name="search" 
                    placeholder='Search' 
                    className='search-bar'
                    onChange={(e) => handleChange(e.target.value)}
                />
                <button 
                    type='submit'
                    value='submit'
                    className='search-button' 
                    style={disabled} 
                    disabled={isDisabled}
                    onClick={handleChangeClick}
                ><FontAwesomeIcon className='font-icon' icon={faSearch} />Search</button>
            </form>
        </div>
    );
};

export default ScreenSearchPage
