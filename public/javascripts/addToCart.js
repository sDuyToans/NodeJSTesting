// addToCart.js

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieString;
}

function addToCart(productId, category) {
    // Send an asynchronous request to add the product to the cart
    addToCartAsync(productId, category);
}

async function addToCartAsync(productId, category) {
    try {
        // Use fetch to make an asynchronous request to your server
        const response = await fetch('/addToCartEndpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, category }),
        });

        if (!response.ok) {
            throw new Error(`Failed to add to cart: ${response.status}`);
        }

        // If the request was successful, you can handle the response as needed
        const result = await response.json();
        // Increment the item count
        itemCount = result.itemCount;
        // console.log(itemCount);

        // Update the item count display
        document.getElementById('itemCount').innerText = itemCount;

        // Update the item count in a cookie for persistence
        setCookie('itemCount', itemCount, 7); // Set cookie to expire in 7 days
        console.log(result);
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}
