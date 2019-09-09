import * as React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";


const Header: React.SFC<IProps> = (RouteComponentProps) => (
  <div>
  		<div className="banner">
  			<img id="mainLogo" src={process.env.PUBLIC_URL +'/logo-banner.png'} width="1200" height="91" alt="dp rmfbi logo" />
  			<img id="welcomeLogo" src={process.env.PUBLIC_URL +'/newfield-only-logo-banner.png'} alt="dp rmfbi logo" style={{display: "none"}} />
  		</div>
      <div  className="menuBar" style={{height: "50px"}}>
     <ul>
       <li>
         <Link to="/">Internal Data</Link>
       </li>
       <li>
         <Link to="/External/">External Data</Link>
       </li>
     </ul>
      </div>
</div>
);

export default Header;
