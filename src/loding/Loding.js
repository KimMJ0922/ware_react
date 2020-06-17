import React from 'react';
import './Loding.css';

const Loding=()=> {
    return ( 
        <div id="LodingContainer">
            <div class="full-circle"></div>
            <div id="half-left" class="two-quarters-circle"></div>
            <div id="half-right" class="two-quarters-circle"></div>
            <div class="three-quarters-circle"></div>
        </div>
    );
}
export default Loding;