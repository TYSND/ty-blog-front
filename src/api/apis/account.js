import request from "../request";
const login = data => request({
    url: '/account/login',
    data
})

const obj = {
    login
}
export default obj;