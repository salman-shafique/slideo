import React from 'react';
import Icon from './Icon';

export default function IconContainer({ icons, keyword }) {
    return (
        <div className={"icon-container"} data-keyword={ keyword } style={{"filter":"invert(100%) sepia(100%) saturate(0%) hue-rotate(46deg) brightness(104%) contrast(102%)"}}>
            {
                icons.map((item, i) => <Icon key={ i } iconData={ item } />)
            }
        </div>
    );
}