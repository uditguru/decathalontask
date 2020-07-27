import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Card } from 'antd';
import TopNews from './topnews';

const { Title, Paragraph } = Typography;

export default function DetailsPage(){
    const location = useLocation();
    const data = location.state.details;



    console.log(data);
    return(
        <div>
        <div style={{marginBottom: "5%"}}>
            <Title style={{marginTop:"5%", marginRight: "5%", marginLeft: "5%"}}>{data.title}</Title>
            <img style={{width: "100%"}} alt="cover" src={data.urlToImage} />
            <Title style={{marginRight: "`10%", marginLeft: "10%"}} level={4}>Author : {data.author}</Title>
            <Paragraph style={{marginRight: "15%", marginLeft: "15%"}}>
                {data.description}
            </Paragraph>
            <a style={{marginRight: "15%", marginLeft: "15%"}} href={data.url}>Read more...</a>
        </div>
        <Card>
        <Title>Top News</Title>
        <TopNews />
        </Card>
        </div>
    )
}