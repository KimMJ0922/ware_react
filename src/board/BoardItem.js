import React from 'react';

const BoardItem=({match})=> {
    console.log(match.params);

    return ( 
        <div>
            제목 : 
            내용 : 
            문제 : 
            
        </div>
    );
}
 
export default BoardItem;