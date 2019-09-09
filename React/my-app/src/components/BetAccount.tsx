import React, {Component, createRef, MouseEvent  } from 'react';
import { Theme, WithStyles, createStyles } from '@material-ui/core';
import $ from 'jquery';

interface IProps {
  name?: string;
}

interface IState {
  data: any[];
  xeroValue: string;
  selXeroValue: string;
  xeroIdData:any[],
  editMode: boolean;
  selectedProviderId: string;
  selectedAccessId: string;
  startdate: string;
  enddate: string;
  recWorkflow: string,
  selecteddKind: string,
  selectedWorkflow: string,
  selectedLocation: string,
  results: any[],
  discrepId: string,
  DiscrepancyKind:any[],
  ReconciliationWorkflow: any[],
  betType: any[],
  location: any[],
  selectedAssgnId: string,
  selectedBetType: string,
  isSearched: boolean,
  isDisabled: boolean,
  userLogin: string,
  token: string
}


class BetAccount extends React.Component<IProps, IState>{

  private xeroSearch: React.RefObject<HTMLInputElement>;

  constructor(props: IProps, state: IState) {
      super(props);

    this.state = {
     data:[],
     xeroValue:'',
     selXeroValue: '',
     xeroIdData: [],
     editMode: false,
     selectedProviderId:'',
     selectedAccessId:'',
     startdate: new Date().toJSON().slice(0, 10),
     enddate: new Date().toJSON().slice(0, 10),
     recWorkflow: '',
     selecteddKind: '',
     selectedWorkflow: '',
     selectedAssgnId:'',
     selectedBetType:'',
     selectedLocation:'',
     results: [],
     discrepId: '',
     DiscrepancyKind:[],
     ReconciliationWorkflow:[],
     betType:[],
     location:[],
     isSearched: false,
     isDisabled: true,
     userLogin: '',
     token: ''
   };

  }

 componentDidMount() {
  this.xeroDataRows();


 }

private  handleSelect1 = (event: any) => {

		const value = event.value;

		this.setState({ xeroValue: value, selXeroValue:''});
}


private handleSearch = (para: string, value: any) => {

		var strXeroName = '', strAccountNo = '', s5Id = '', strMultId='';

		switch (para) {
			case "xero":
				strXeroName = value;
				break;
			case "acccountno":
				strAccountNo = value;
				break;
			case "nick":
				s5Id = value;
				break;
			case "multId":
				strMultId = value;
				break;
			default:
				;
		}

}


private XeroSelect = (e: any) => {

		this.setState({ selXeroValue: e, xeroValue: e, editMode:false });

		this.handleSearch('xero', e);
	}

private xeroDataRows=async ()=>{
	
  const token='';
  const requestOptions = {
      method: 'GET'
  }

  const component: BetAccount = this;

  await fetch("/api/xerodata", requestOptions).then(response => {
            return response.json();
        }).then(json => {
            //console.log(json);
            this.setState({ data: json, xeroIdData: json });
        }).catch(e => {
            console.log(e);
        });
}

render() {

      var xeroDataList:any[]= this.state.xeroIdData.filter((x) => {

  			if (String(x.COLUMN_VALUE).toLowerCase().indexOf(this.state.xeroValue.toLowerCase())>-1) {

  				return x.COLUMN_VALUE;
  			}

	  });

      const xeroData:any[] =xeroDataList.map((x) => {
             return <li onClick={() => { this.XeroSelect(x.COLUMN_VALUE); }}>{x.COLUMN_VALUE}</li>;
	  });

      if (xeroDataList.length > 0 && this.state.selXeroValue==='' && this.state.xeroValue!=='') {
    				$("#searchresult").css('display', 'inline');
      }	else {
    				$("#searchresult").css('display', 'none');

    }

    return  (
      <div>
      <input className="form-textbox" type='search' value={this.state.xeroValue} id='xeroSearch' ref={this.xeroSearch} placeholder='search by number' style={{	textAlign: "center",
      	color: "#b0b0b0",
      	borderColor: "#15738d",
      	height: "30px",
      	paddingLeft: "5px",
      	fontSize: "12px", width: "190px"}} onChange={({ target }) => { this.handleSelect1(target); }}  />

      		<div id="searchresult" style={dropDownbox}>
      					<ul className="sbsb_b" role="listbox" style={{width:"190px" }}>
                    {xeroData}
      					</ul>
      		</div>
</div>

    );

}

}

export default BetAccount;

const searchInput = (theme: Theme) => createStyles({
textAlign: "center",
  color: "#b0b0b0",
	borderColor: "#15738d",
	height: "30px",
	paddingLeft: "5px",
	fontSize: "12px"
});

const editBox = {
	textAlign: "left",
	backgroundColor: "#f2f2f2",
	height: "25px",
	border: "none",
	width: "225px",
	paddingLeft: "8px",
	fontSize: "13px",
	marginLeft: "1px"
}

const dropDownbox = {
	display: "none",
  zIndex: 10
}
