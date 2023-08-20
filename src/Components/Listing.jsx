import PropTypes from "prop-types"

export default function Listing({items}) {
    return <div className="item-list">
        {items.map((item, index) => {
            if (item.error_messages) {
                return;
            }

            return <div className="item" key={item.listing_id}>
                <div className="item-image">
                <a href={item.url}>
                    {item.MainImage?.url_570xN ? <img src={item.MainImage.url_570xN} /> : null}
                </a>
                </div>
                <div className="item-details">
                <p className="item-title">{item.title.length > 50 ? item.title.slice(0, 49) + "..." : item.title}</p>
                <p className="item-price">{getCurrency(item.currency_code)} {item.price}</p>
                <p className={"item-quantity level-" + getRemainderLevel(item.quantity)}>{item.quantity} left</p>
                </div>
            </div>
        })}
    </div>
}

function getCurrency(currency_code) {
    switch(currency_code) {
        case 'USD': return '$'; 
        case 'EUR': return '€'; 
        default: return currency_code; 
    }
}

function getRemainderLevel(remainder) {
    if (remainder < 10) {
        return 'low';
    } else if (remainder < 20) {
        return 'medium';
    } else {
        return 'high';
    }
}

Listing.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        url :  PropTypes.string,
        MainImage: PropTypes.object,
        title :  PropTypes.string,
        currency_code :  PropTypes.string,
        price :  PropTypes.string,
        quantity :  PropTypes.number
    }))
}

Listing.defaultProps = {
    items: []
}