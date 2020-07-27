import React, { useState, useEffect } from 'react';
import { Carousel, Card } from "antd";
import { useHistory } from 'react-router-dom';

const { Meta } = Card;


export default function TopNews(){
    const [top, setTop] = useState(null);
    let history = useHistory();


    function getTop() {
        fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=5733cfe169044d3bb4ae73313206992f&page=1&pageSize=5')
            .then(res => res.json())
            .then(results => {
                console.log(results);
                setTop(results);
            })
    }

    useEffect(() => {
        getTop();
    },[])

    return (
        <Carousel autoplay>
                {
                    top && top.articles.map( top => (
                        <Card
                        onClick={ () => history.push('/details', {details: top}) }
                        style={{ width: "90%", marginRight: "5%", marginLeft: "5", marginBottom: "5%" }}
                        cover={<img style={{ height: "150px", objectFit: "cover" }} alt="example" src={top.urlToImage} />}
                    >
                        <Meta title={top.title} description={top.author} />
                    </Card>
                    ))
                }
            </Carousel>
    )
}