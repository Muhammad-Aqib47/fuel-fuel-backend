import { API_STATUS_CODES } from './constants';

export const CONTROLLER_ERROR = {
    status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
    message: 'Internal server error.',
};
export const INVALID_REQUEST = {
    status: API_STATUS_CODES.ERROR_CODE,
    message: 'Invalid request.',
};
export const AUTHORIZATION_FAILED = {
    status: API_STATUS_CODES.AUTHORIZATION_FAILED,
    message: 'Authorization failed.',
};
