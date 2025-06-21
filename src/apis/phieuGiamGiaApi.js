import axios from './axios';

export function getVoucherByCode(ma) {
  return axios.get(`/phieu-giam-gia/by-code/${ma}`);
}

// Hoặc nếu bạn muốn lấy tất cả voucher cho user (nếu có)
export function getAllVouchers() {
  return axios.get('/phieu-giam-gia/all');
}
