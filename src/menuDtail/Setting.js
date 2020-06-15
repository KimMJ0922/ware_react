import React,{useState,useEffect} from 'react';
import axios from 'axios';


const Setting = () => {
    const [provider, setProvider] = useState(window.sessionStorage.getItem('provider'));

    return(
        <div>
            <div>
                <div>
                    <label for="name">이름 변경 </label><br/>
                    <input type="text" id="name" name="name"/>
                </div>
                <div>

                </div>
            </div>

            {provider}
        </div>
    )
}
export default Setting;