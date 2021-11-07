import {SERVER_URL} from '@/settings';

export const getImageUrl = imageName =>
    `${SERVER_URL}/static/${imageName}`;
