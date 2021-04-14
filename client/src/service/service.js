import axios from 'axios';


let API_URL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:4000/api'
} else {
    API_URL = 'http://31.220.54.89/api'
}

export class APIService {
    register(user) {
        const url = `${API_URL}/register`;
        return axios.post(url, user);
    }
    getApiProducts() {
        const url = `${API_URL}/products`;
        return axios.get(url);
    }

    getUsers() {
        const url = `${API_URL}/users`;
        return axios.get(url);
    }

    getUserHistoryOrder(id) {
        const url = `${API_URL}/${id}/order/history`;
        return axios.get(url);
    }

    getExploitation(id) {
        const url = `${API_URL}/exploitations/${id}`;
        return axios.get(url);
    }

    getOrder(id){
        const url = `${API_URL}/${id}/order`
        return axios.get(url);
    }
    getAllExploitations(){
        const url = `${API_URL}/exploitations`;
        return axios.get(url);
    }
    getExploitationByUser(id){
        const url = `${API_URL}/exploitations/${id}/datas`;
        return axios.get(url);
    }

    getExploitationOrders(id){
        const url = `${API_URL}/exploitations/${id}/orders`;
        return axios.get(url);
    }

    getOrderDeliveryAddress(id) {
        const url = `${API_URL}/${id}/livraison`;
        return axios.get(url).then(response => response.data);
    }

    createUser(user){
        const url = `${API_URL}/user/create`;
        return axios.post(url,user);
    }

    createProduct(product){
        const url = `${API_URL}/products/create`;
        return axios.post(url,product);
    }

    createDeliveryAddress(delivery){
        const url = `${API_URL}/livraison`;
        return axios.post(url,delivery);
    }

    createOrder(order){
        const url = `${API_URL}/order`;
        return axios.post(url,order);
    }

    createExploitations(exploitation){
        const url = `${API_URL}/exploitations/create`;
        return axios.post(url, exploitation);
    }

    editUser(user){
        const url = `${API_URL}/user/edit`;
        return axios.post(url,user);
    }

    editProduct(product){
        const url = `${API_URL}/products/edit`;
        return axios.post(url,product);
    }

    setOrderPaid(order){
        const url = `${API_URL}/order/payment`;
        return axios.post(url,order);
    }

    setOrderFinished(order){
        const url = `${API_URL}/order/status/finished`;
        return axios.post(url,order);
    }
}
