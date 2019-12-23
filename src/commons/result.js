/**
 * 接口返回工具类
 * 
 * 说明 0：服务器内部错误  1：成功  2：失败
 */
module.exports = {
    success: (data = '', message = 'success') => {
        return {
            code: 1,
            data,
            message
        }
    },
    error: (data = '', message = 'failure') => {
        return {
            code: 2,
            data,
            message
        }
    }
}