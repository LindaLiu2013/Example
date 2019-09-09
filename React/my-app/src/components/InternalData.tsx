import * as React from 'react';
import Description from '../Description';


interface ICourse{
  title: string,
  author: string,
  description: string,
  topic: string
  url: string
}



interface IState {
  dataValue: any
}

class InternalData extends React.Component<IState>{

  constructor(state: IState) {
     

      this.state = {
        dataValue:[]
      }
  }

  componentDidMount(){

    this.getGraphQLData();

  }

componentWillUnmount(){


}

private async getGraphQLData(){

  const component: InternalData = this;

  const query = `query RollDice($courseID: Int!) {
    course(id: $courseID) {
          title
          author
          description
          topic
          url
      }
}`;

let courseID=1;

  fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { courseID },
    })
  })
    .then(r => r.json())
    .then(({ data }) => {console.log('data returned:', JSON.stringify(data.course));
        this.setState({dataValue: JSON.parse(JSON.stringify(data.course))});
  }).catch(e => {
        console.log(e);
    });

}

   render() {
    return  (
        <div>
          <Description/>
          <p>Title: {this.state.dataValue.title}, Author: {this.state.dataValue.author}</p>
        </div>
      );
   }
};


export default InternalData;
