import React, { useEffect } from 'react';
import ProfileView from './ProfileView';
import Set from './Set';
import BoardSet from './BoardSet';
import SellsSet from './SellsSet';

const SetLayout = () =>{
    const [name, setName] = React.useState('');
    
    const changeComponent = (data) =>{
        setName(data);
    }

    var cmp=<Set />;
    if(name === "Set"){
        cmp=<Set />
    }else if(name === "BoardSet"){
        cmp=<BoardSet />
    }else if(name === "SellsSet"){
        cmp=<SellsSet />
    }
    return(
        <div className="sq_body">
            <ProfileView changeComponent={changeComponent} />
            {cmp}
        </div>
    )
}
export default SetLayout;