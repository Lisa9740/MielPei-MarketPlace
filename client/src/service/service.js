import axios from 'axios';


const API_URL = 'http://localhost:4000/api';

export class APIService {

    getApiProducts() {
        const url = `${API_URL}/products`;
        return axios.get(url).then(response => response.data);
    }

    getUsers() {
        const url = `${API_URL}/users`;
        return axios.get(url).then(response => response.data);
    }

    getUserHistoryOrder(id) {
        const url = `${API_URL}/users/${id}/order/history`;
        return axios.get(url).then(response => response.data);
    }

    getExploitation(id) {
        const url = `${API_URL}/exploitations/${id}`;
        return axios.get(url).then(response => response.data);
    }

    getAllExploitations(){
        const url = `${API_URL}/exploitations`;
        return axios.get(url).then(response => response.data);
    }
    getExploitationByUser(id){
        const url = `${API_URL}/exploitations/${id}/datas`;
        return axios.get(url).then(response => response.data);
    }

    getExploitationOrders(id){
        const url = `${API_URL}/exploitations/${id}/orders`;
        return axios.get(url).then(response => response.data);
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
        return axios.put(url,user);
    }

    editProduct(product){
        const url = `${API_URL}/products/edit`;
        return axios.put(url,product);
    }

    setOrderPaid(order){
        const url = `${API_URL}/order/payment`;
        return axios.put(url,order);
    }
}
