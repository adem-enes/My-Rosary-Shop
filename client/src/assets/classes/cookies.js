export const getCookie = (cookieName) =>{
    const cookie = document.cookie.split('; ').map((dc) => {
        const splitCookie = dc.split('=');
        const cookieItem = {
            name: splitCookie[0],
            value: splitCookie[1],
        }
        return cookieItem;
    });
    
    return cookie.find(c => c.name === cookieName);
}