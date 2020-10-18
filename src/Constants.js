    const prod = {
        url: {
            API_URL: 'https://languages-tandem.herokuapp.com'            
        }
    };
    const dev = {
        url: {
            API_URL: 'http://localhost:4000'
        }
    };
    export const config = process.env.NODE_ENV === 'development' ? dev : prod;