/*
 * @file: response.js
 * @description: It contain function layer for api response status with data.
 * @author: Rajneshwar Singh
 */

export const successAction = (statusCode: any, data: any, message: any = 'Success') => {
    return { statusCode, data, message }
}

export const failAction = (statusCode: any, data: any, message: any = 'Fail') => {
    return { statusCode, data, message }
}
