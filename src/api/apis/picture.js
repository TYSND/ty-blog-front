import request from "../request";

export const uploadPicture = data => request({
    url: '/picture/upload-picture',
    method: 'post',
    data,
    header: {
        "content-type": "multipart/form-data"
    }
})