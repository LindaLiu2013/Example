import * as React from 'react';


interface IState {
  response: string;
  responseToPost: string;
  providers: any[];
  token: string;
}

export default class Description extends React.Component<IState> {

  public state: IState = {
    count: 0,
    response: "",
    responseToPost: "",
    token: "",
    providers:[]
  };

  componentDidMount() {

    this.callApi()
       .then(res => this.setState({ response: res.express }))      
       .catch(err => console.log(err));

       this.getServiceProviders('')
       .then(res=> { 
          
           this.setState({providers: JSON.parse(res) });
           })
       .catch(err=>console.log(err));

    /* this.IsAuth('i:0#.w|dataprocessors\linda')
        .then(res=> {
           this.getServiceProviders(res)
                .then(res=> {
                  console.log(res);
                  this.setState({providers: JSON.parse(res) })
                  }
                )
                .catch(err=>console.log(err));
         }
        )
        .catch(err => console.log(err));*/
  }

  private async IsAuth(username: string) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    };


    const response = await fetch("/api/auth", requestOptions);
    const body = await response.text();

    if (response.status !== 200) {
      throw Error(body);
    }

    console.log(response.status);
    console.log(body);
    return body;

 }

private async getServiceProviders(token: string)
{

  const requestOptions = {
      method: 'Get',
      headers: { 'Content-Type': 'application/json' }
  };


const response = await fetch("/api/serviceProviders?token="+token, requestOptions);
const body = await response.text();

  if (response.status !== 200) {
    throw Error(body);
  }

  console.log(body);
  return body;

}

  public render() {

     const servProviders: JSX.Element[]=this.state.providers.map((p) =><option value={p.SERVICE_PROVIDER_ID}>{p.SERVICE_PROVIDER_NAME}</option>);

    return (
      <div>

         <p>Service Provider:

         <select style={{width:"230"}}>
                   <option>Select</option>
                   {servProviders}
          </select>
</p>

      </div>
    );
  }
}

