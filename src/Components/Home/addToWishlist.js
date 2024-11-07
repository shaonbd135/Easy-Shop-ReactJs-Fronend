import { useContext } from 'react';
import axios from 'axios';
import { loggedInDataContext, addToWishlistData } from '../../RoutesIndex/RoutesIndex';
import { Navigate, useNavigate } from 'react-router-dom';


export const useAddToWishlist = () => {
    const [loggedInUser] = useContext(loggedInDataContext);

    const [addToWishlistDataP, setAddToWishlistDataP] = useContext(addToWishlistData) // it's just used to real time update the wishlist product length on the wishlist icon
    
    const navigate = useNavigate();

    const addToWishlist = async (product) => {
        if (!loggedInUser || !loggedInUser.userId) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post('https://easy-shop-nodejs-server.onrender.com/wishlist', {
                userId: loggedInUser.userId,
                productId: product.id
            });
            if (response.data.success) {
                setAddToWishlistDataP([...addToWishlistDataP, product]);
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
        }
    };

    return addToWishlist;
};






