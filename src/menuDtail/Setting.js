import React,{useState,useEffect} from 'react';
import axios from 'axios';


const Setting = () => {
    const [provider, setProvider] = useState(window.sessionStorage.getItem('provider'));
    const [newName, setNewName] = useState('');
    const [fileName, setFileName] = useState('');
    const [defaultImg, setDefaultImg] = useState([]);
    const changeName = (e) => {
        setNewName(e.target.value);
    }

    useEffect(()=>{
        const defaultProfileImg = async() => {
            let url = "http://localhost:9000/defaultProfileImg";
            try{
                let list = await axios.post(url);
                let listData = list.data;
                setDefaultImg(listData);

            }catch(e){
                console.log(e);
            }
        }

        defaultProfileImg();
    },[])

    //프로필 이미지 직접 올리기
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
                window.location.reload();
            }
        ).catch(
            (error)=>{
                console.log(error);
            }
        );
    }

    //프로필 이미지 선택시
    const profileImgClick = (e) => {
        let profile = e.target.name;
        let url = "http://localhost:9000/updateProfileImg"
        axios.post(url,{
            profile,
            email : window.sessionStorage.getItem('email')
        }).then((res)=>{
            window.sessionStorage.setItem('profile',profile);
            window.location.reload();
        }).catch((err)=>{
            
        })

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
                <div>
                    <img src={window.sessionStorage.getItem('profile')} alt=""
                        style={
                            {
                                width:'50px',
                                height:'50px',
                                border:'3px solid black',
                                borderRadius:'50px',
                                margin:'0 5px 0 5px'
                            }
                        }
                        name={window.sessionStorage.getItem('profile')}
                        onClick={profileImgClick}
                    />
                   {
                       defaultImg.map((data,idx)=>{
                        return <img src={data} alt=""
                                    style={
                                            {
                                                width:'50px',
                                                height:'50px',
                                                border:'3px solid black',
                                                borderRadius:'50px',
                                                margin:'0 5px 0 5px'
                                            }
                                        }
                                    name={data}
                                    onClick={profileImgClick}
                                />
                       })
                   }
                </div>
            </div>

            {provider}
        </div>
    )
}
export default Setting;