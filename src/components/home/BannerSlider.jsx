import React from 'react'
import bannerPhoto from '../../assets/banner.jpg'

function BannerSlider() {
    
    return (
    <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full h-screen">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <img src={bannerPhoto} className="w-full h-full object-cover" />
            <div>
                <div className="absolute inset-0 flex flex-col items-center justify-center align-middle px-4">
                    <h1 className="text-2xl lg:text-4xl text-white font-bold text-center">Welcome to Our Community of Changemakers!</h1>
                    <p className="text-lg lg:text-xl text-white mt-4 text-center">Join us in our mission to create a better world for all. Together, we can make a positive impact on the lives of those in need.<br/> Explore our platform and discover how you can contribute to meaningful causes today.</p>
                    <a href='/campaign'><button className="sm:my-6 rounded-lg md:mt-8 text-white uppercase py-3 text-base font-light px-8 border border-blue-600 hover:bg-blue-600 hover:bg-opacity-9">Get started</button></a>
                </div>
            </div>                
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">❮</a> 
                <a href="#slide2" className="btn btn-circle">❯</a>
            </div>         
        </div> 
        <div id="slide2" className="carousel-item relative w-full h-screen">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <img src="https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9uYXRlfGVufDB8fDB8fHww" className="w-full h-full object-cover" />
                <div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center align-middle px-4">
                        <h1 className="text-2xl lg:text-4xl text-white font-bold text-center">Make a Difference Today!</h1>
                        <p className="text-lg lg:text-xl text-white mt-4 text-center">Your contribution can change lives. Support a cause that matters to you and help those in need.</p>
                        <a href='/org/signup'><button className="sm:my-6 rounded-lg md:mt-8 text-white uppercase py-3 text-base font-light px-8 border border-blue-600 hover:bg-blue-600 hover:bg-opacity-9">Create Campaign</button></a>
                    </div>
                </div>                
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a> 
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>         
            </div> 
        <div id="slide3" className="carousel-item relative w-full h-screen">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <img src="https://source.unsplash.com/random/1920x1080/?kenyan-school-children" className="w-full h-full object-cover" />
                <div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center align-middle px-4">
                        <h1 className="text-2xl lg:text-4xl text-white font-bold text-center">Support Meaningful Causes!</h1>
                        <p className="text-lg lg:text-xl text-white mt-4 text-center">Join hands with charitable organizations and make a positive impact in the world. Every donation counts.</p>
                        <a href='/campaign'><button className="sm:my-6 rounded-lg md:mt-8 text-white uppercase py-3 text-base font-light px-8 border border-blue-600 hover:bg-blue-600 hover:bg-opacity-9">Exprole</button></a>
                    </div>
                </div>                
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a> 
                    <a href="#slide4" className="btn btn-circle">❯</a>
                </div>         
            </div> 
        <div id="slide4" className="carousel-item relative w-full h-screen">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <img src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover" />
                <div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center align-middle px-4">
                        <h1 className="text-2xl lg:text-4xl text-white font-bold text-center">Be the Change!</h1>
                        <p className="text-lg lg:text-xl text-white mt-4 text-center">Your small act of kindness can create ripple effects of change. Start today and inspire others to do the same.</p>
                        <a href='/user/signup'><button className="sm:my-6 rounded-lg md:mt-8 text-white uppercase py-3 text-base font-light px-8 border border-blue-600 hover:bg-blue-500 hover:bg-opacity-9">Become a volunteers</button></a>
                    </div>
                </div>                
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a> 
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>         
            </div>
    </div>
    );
}

export default BannerSlider