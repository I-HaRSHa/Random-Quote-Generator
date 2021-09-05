import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
                    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
                    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
                    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  

class App extends React.Component{
  state={
    quotes:[],
    index:0
  }


  componentDidMount(){
    fetch("https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
    .then(res => res.json())
    .then(res =>{
      this.setState({
        quotes: res.quotes
      },this.getRandomIndex)
    })
  }

  getRandomIndex=()=>{
    const {quotes}=this.state;
    if(quotes.length){
      const index=Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      }) 
    }
    const colorIndex=Math.floor(Math.random() * colorArray.length)
    const color=colorArray[colorIndex]
    document.querySelector(':root').style.setProperty("--bgcolor",color);
  }

  

  
  render(){

    const {quotes,index}=this.state;
    const quote=quotes[index]
    return(
      <div className="wrapper row-col-4 align-items-center justify-content-center fw-bold fs-5 p-4 ms-3 me-3">
        <div className="row-col-3">
          {
            quote && <p className="fs-4"><i class="fas fa-quote-left"></i> {quote.quote}</p>
          }
          <div><p className="text-end">{quote && <cite>-{quote.author}</cite>}</p></div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <a href="twitter.com/intent/tweet" className="pe-3"><i class="fab fa-twitter-square fa-2x"></i></a>
            <a href="tumblr.com"><i class="fab fa-tumblr-square fa-2x"></i></a>
          </div>
          <div>
            <button className="btn btn-primary" onClick={this.getRandomIndex}><i class="fas fa-random"></i>New Quote</button>
          </div>
        </div>
      </div>
      
      
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

