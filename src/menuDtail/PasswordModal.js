import React,{useEffect, useState} from 'react';

const PasswordModal = () => {
    return(
        <>
            <div>
                <h2>비밀번호 입력</h2>
                <input type="password" name="pass"/>
                <button type="button">입력 완료</button>
            </div>
        </>
    );
}

export default PasswordModal();