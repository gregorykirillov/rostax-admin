import {useState, useCallback} from 'react';

export const useModalState = (initial = false) => {
    const [isOpen, setOpen] = useState(initial);

    const open = useCallback(() => setOpen(true), []);
    const close = useCallback(() => setOpen(false), []);

    return [isOpen, open, close];
};
