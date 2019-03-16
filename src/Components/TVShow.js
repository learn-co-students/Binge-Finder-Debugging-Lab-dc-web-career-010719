import React from 'react';

const tvShow = (props) => {
  return (
    <div>
      <br/>
      <img src={props.show.image.medium} onClick={props.selectShow} alt=""/>
    </div>
  );
}

export default tvShow;
