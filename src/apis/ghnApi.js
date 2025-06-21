
import axios from '../apis/axios';

const token = 'be944cc0-3e4b-11f0-8570-4aeb0e37b2f0'; // <--- Thay bằng token thật

const ghnClient = axios.create({
    baseURL: 'https://online-gateway.ghn.vn/shiip/public-api',
    headers: {
        'Content-Type': 'application/json',
        'Token': token
    }
});

export const getProvinces = () => ghnClient.get('/master-data/province');
export const getDistricts = (provinceId) =>
    ghnClient.get('/master-data/district', { params: { province_id: provinceId } });
export const getWards = (districtId) =>
    ghnClient.get('/master-data/ward', { params: { district_id: districtId } });
