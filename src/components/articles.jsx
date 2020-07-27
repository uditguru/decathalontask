import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { useHistory } from 'react-router-dom';
import { FetchNews } from '../fetch/fetch';
import TopNews from './topnews';
const { Meta } = Card;
var status = 1;
var parameters = {
    count : 1
  }

export default function Latests() {
    const [article, setArticle] = useState(null);
    const [total,setTotal] = useState(1)
    const [fetching] = React.useState(0)


    let history = useHistory();

    function isOutofView(elem) {
        if (elem) {
          // Get element's bounding
          var bounding = elem.getBoundingClientRect();
    
          // Check if it's out of the viewport on each side
          var out = {};
          out.top = bounding.top < 0;
          out.left = bounding.left < 0;
          out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
          out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
          out.any = out.top || out.left || out.bottom || out.right;
          out.all = out.top && out.left && out.bottom && out.right;
    
          return out;
        } else {
          return true;
        }
      };
    
    
      function handleInScreen() {
        let loading = document.querySelector('#loader');
        let isOut = isOutofView(loading)
        if (fetching === 0) {
          if (isOut.bottom === false) {
            // loadData();
            handleScroll(parameters.count);
            console.log("previous request is still under progress")
          }
        }
    }
    
      

    

     function handleScroll(count){
        if(status === 1){
        parameters.count = count + 1
        fetchAPI();
      }
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function fetchAPI(){
        if(status === 1){
            status = 0;
            let { articles, totalResults } = await FetchNews(parameters.count);
            setArticle( oldarticles => {
                if(oldarticles) {
                    return [...oldarticles||[],...articles]
                }
                else{
                    return articles;
                }
            })
            setTotal(totalResults)
            console.log(articles);
            status = 1
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        window.addEventListener('scroll', handleInScreen, true);
        fetchAPI();
        return () => {
            window.removeEventListener('scroll', handleInScreen, true);
        }
      }, []);

    return (
        <div>
            <TopNews />
            <Row style={{ margin: "5%", overflow: "scroll" }}>
                {
                    article && article.map((article, index) => (
                        <Col key={index} xs={24} sm={24} md={6} lg={6} xl={6}>
                            <Card
                                hoverable
                                onClick={ () => history.push('/details', {details: article}) }
                                style={{ width: "90%", marginRight: "5%", marginLeft: "5", marginBottom: "5%" }}
                                cover={<img style={{ height: "150px", objectFit: "cover" }} alt="example" src={article.urlToImage} />}
                            >
                                <Meta title={article.title} description={article.source && article.source.name} />
                            </Card>
                        </Col>
                    ))
                }
                {
                    article && <Card style={{width: "100%", textAlign: "center"}} id="loader"
                    ref={() => handleInScreen()}
                  > {
                      total <= article && article.length ? (
                        <span style={{textAling:"center"}}>No more Data</span>
                      ) : (
                          <span style={{textAling:"center"}}> Loading ....</span>
                        )
                    } </Card>
                }
            </Row>
        </div>
    )
}
