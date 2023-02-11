// import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { useEffect,useState } from "react";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

// apikey=fc5fe020cd394a7fb659b35adb1ebdae    ------ first 
// Your API key is: 04fef24ddae24c868a245c7ce7b0726f ------ second 

const News=(props)=> {
  const capitalizeFirstLetter=(word)=>{
    return word.charAt(0).toUpperCase()+ word.slice(1);
  }
    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalResults,setTotalResults]=useState(0)
   
  
    
  

  const updateNews=async()=>{
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=04fef24ddae24c868a245c7ce7b0726f&page=${  page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data=await fetch(url);
    props.setProgress(40);
    let parsedData=await data.json()
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  
  }

  useEffect(()=>{
    document.title=`${ capitalizeFirstLetter(props.category)} - NewsMonkey`;
     updateNews();
     //eslint-disable-next-line
  },[])

  // run after render method



  // const handleNextClick= async ()=>{
  //   //    if(!(   page+1 > Math.ceil(  totalResults/props.pageSize))){
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${  page + 1}&pageSize=${props.pageSize}`;
  //   //  setState({loading:true});
  //   // let data=await fetch(url);
  //   // let parsedData=await data.json()
    
  //   // console.log(parsedData);
    
  //   //  setState(
  //   //   {page:  page+1,
  //   //   articles: parsedData.articles,
  //   //   loading:false
  //   //   }
  //   // )}


  //    setPage(page+1);
  //    updateNews()
  // }
  // const handlePrevClick=async()=>{
  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${  page - 1}&pageSize=${props.pageSize}`;
  //   //  setState({loading:true});
  //   // let data=await fetch(url);
  //   // let parsedData=await data.json()
  //   // console.log(parsedData);
    
  //   //  setState(
  //   //   {page:  page-1,
  //   //     articles: parsedData.articles,
  //   //   loading:false}
  //   // )


  //    setPage(page-1);
  //    updateNews()
  // }
  const fetchMoreData =async () => {
    
     setPage(page+1);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    
    let data=await fetch(url);
    let parsedData=await data.json()
    setArticles( articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    
    
  };
  
    return (
      <>
        <h1 className="text-center" style={{margin:"35px 0px", marginTop:"90px"}}>NewsMonkey - Top { capitalizeFirstLetter(props.category)} Headlines </h1>
        {  loading && <Spinner/>}
        <InfiniteScroll
          dataLength={  articles.length}
          next={ fetchMoreData}
          hasMore={  articles.length <   totalResults}
          loader={<Spinner/>}
        >
          
        <div className="container">

       
        <div className="row">
        {   articles.map((element)=>{
          return <div className="col md-3" key={element.url}>
          <NewsItem  title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source}/>
          </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

          {/* <div className="container d-flex justify-content-between">
            <button disabled={  page<=1} type="button" className="btn btn-dark" onClick={ handlePrevClick}>&larr; Previous</button>
            <button disabled={  page+1 > Math.ceil(  totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={ handleNextClick}>Next &rarr;</button>
          </div> */}
          
        
      </>
    );
  
}
 News.defaultProps={
  pageSize:8,
  country: 'in',
  category:'general'
}
News.propTypes ={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News;
