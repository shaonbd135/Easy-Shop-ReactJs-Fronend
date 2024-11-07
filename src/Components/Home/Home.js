import React from 'react';
import Header from './Header';
import HeroImage from './HeroImage';
import TopCategories from './TopCategories';
import ProductShowCase from './ProductShowCase';
import MarketingBanner from './MarketingBanner';
import Services from './Services';



const Home = () => {
    return (
        <div>
            <Header></Header>
            <HeroImage></HeroImage>
            <Services></Services>
            <TopCategories></TopCategories>
            <MarketingBanner></MarketingBanner>
            <ProductShowCase></ProductShowCase>           
        </div>
    );
};

export default Home;