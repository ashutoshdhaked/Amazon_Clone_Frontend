 import './AboutCard.css';
 const AboutCard = ()=>{  
    const urlSearchParams = new URLSearchParams(window.location.search);
    const data = urlSearchParams.get('data');
    const item = JSON.parse(decodeURIComponent(data));
    console.log("data is like as : "+item);
    return(
        <div className="product-container">
        <div>
            <img src={item.url} alt="product_image" />
        </div>
        <div className="product-details">
            <div className="product-title">
                {item.shorttitle}
                <br></br>
                 {item.longtitle}
            </div>
            <div className="product-price">
               Mrp : &nbsp;&nbsp;<strike>{item.mrp}</strike><br></br>
               Discount :&nbsp;&nbsp; {item.discount} <br></br>
               Price :&nbsp;&nbsp;{item.cost}
            </div>
            <div dangerouslySetInnerHTML={{ __html: item.detail }}></div>
            <div className="product-description" dangerouslySetInnerHTML={{ __html: item.description }}></div>
            <div className='buy_btn'>
                <button>Buy Now</button>
            </div>
        </div>
    </div>
       
    )
}

export default AboutCard;