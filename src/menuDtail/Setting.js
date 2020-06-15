import React,{useState,useEffect} from 'react';
import axios from 'axios';


const Setting = () => {
    const [provider, setProvider] = useState(window.sessionStorage.getItem('provider'));
    const [newName, setNewName] = useState('');
    const [fileName, setFileName] = useState('');
    const changeName = (e) => {
        setNewName(e.target.value);
    }

    const profileImg = (e) => {
        const uploadFile = e.target.files[0];
        const filename = e.target.files[0].name;

        setFileName(filename);
        const boardFile = new FormData();
        boardFile.append('uploadFile',uploadFile);
        boardFile.append('email',window.sessionStorage.getItem('email'));

        axios(
            {
                method : 'post',
                data : boardFile,
                url : "http://localhost:9000/uploadProfileImg",
                headers : {'Content-Type' : 'multipart/form-data'}
            }
        ).then(
            (res) => {
                let auto = localStorage.getItem('autoLogin');
                if(auto !== null){
                    localStorage.setItem(
                        "autoLogin",
                        JSON.stringify({
                            email: window.sessionStorage.getItem('email'),
                            name : window.sessionStorage.getItem('name'),
                            profile : window.sessionStorage.getItem(res.data)
                        })
                    );
                }
                window.sessionStorage.setItem('profile',res.data);
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        );
    }


    return(
        <div>
            <div>
                <div>
                    <label for="name">이름 변경 </label><br/>
                    <input type="text" id="name" name="name" onChange={changeName} value={newName}/>
                    <button type="button">변경</button>
                </div>
                <div>
                    <input type="file" onChange={profileImg}></input>
                </div>
            </div>

            {provider}
        </div>
    )
}
export default Setting;