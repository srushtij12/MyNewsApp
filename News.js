import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Load from './Load';
import PropTypes from 'prop-types'



export class News extends Component {
static defaultProps = {
       country: 'in',
       pagesize: 6,
       category: 'general'
}
static propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string
}

capitalizeFirstletter = (string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
    super(props);
    this.state={
     articles: [],
     page:1,
     loading:false
    }
    document.title = `${this.capitalizeFirstletter(this.props.category)} - DailyUpdates`;
  }

 

  async updateNews(){
          
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=652a23527cd54717a071d615a5992da4&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({loading: true}); 
    let data = await fetch(url)
    let parsedData = await data.json()
   
  
             this.setState({
              page: this.state.page-1,
              articles: parsedData.articles,
              loading: false
             })

  }

  async componentDidMount(){
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=652a23527cd54717a071d615a5992da4&page=1&pageSize=${this.props.pagesize}`;
    this.setState({loading: true}); 
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading: false})
    // this.updateNews();
  }

 handleprevious=   async ()  => {
  let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=652a23527cd54717a071d615a5992da4&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
  this.setState({loading: true}); 
  let data = await fetch(url)
  let parsedData = await data.json()
 

           this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading: false
           })

  // this.setState({page: this.state.page -1});
  // this.updateNews();
  }
 handlenext =  async  () => {
    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize)))
    {  
      this.setState({loading: true});      
  let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=652a23527cd54717a071d615a5992da4&page=${this.state.page + 1} &pageSize=${this.props.pagesize}`;
  let data = await fetch(url)
  let parsedData = await data.json()
  // this.setState({loading: false});

           this.setState({
            page: this.state.page+1,
            articles: parsedData.articles,
            loading: false
           })
          }
  // this.setState({page: this.state.page +1});
  // this.updateNews();
  // }
        }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{marginTop:'90px'}}>DailyNews Presents - Top  {this.capitalizeFirstletter(this.props.category)} Headlines </h1>
          {this.state.loading && <Load/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key = {element.url}  >
        <NewsItem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,87):""} img_url={element.urlToImage} news_url={element.url} author={element.author} date={element.publishedAt}/>
        </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handleprevious}> &larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
