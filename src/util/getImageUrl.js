import {SERVER_URL} from '@src/settings';

export const getImageUrl = imageName =>
    `${SERVER_URL}/static/${imageName}`;
