import request from "../request";

export const getAnthologyList = () => request({
    url: '/anthology/get-all-anthology',
    method: 'get'
})