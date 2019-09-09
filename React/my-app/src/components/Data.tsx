import * as React from 'react';
import Description from '../Description';

interface IProps {
  name?: string;
}


class Data extends React.Component<IProps>{
   render() {
    return  <Description countBy={1} />;
   }

};


export default Data;
