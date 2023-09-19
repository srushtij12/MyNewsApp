import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {
   
    let {title,description,img_url,news_url,author,date}= this.props;
   
    return (
      <div className='container my-3'>
        <div className="card" style={{width: "18rem"}}>
  <img src={img_url?img_url:"https://s.yimg.com/uu/api/res/1.2/LKRH31mzL9wqtcqoQ_lkjw--~B/Zmk9ZmlsbDtoPTYzMDtweW9mZj0wO3c9MTIwMDthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2023-04/835a5670-e5f4-11ed-9db6-3febf57b7a4a.cf.jpg"}/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className='card-text'><small className="text-muted">By {author?author: "Unknown"} on {new Date(date).toGMTString()}</small></p>
    <a href={news_url}  target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
