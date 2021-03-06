

export const whitelistData = (data, keys) => {
    if (keys) {
        const res = new FormData();

        for (const key of keys) {
            const val = data.get(key);
            val && res.set(key, val);
        }
    }

    return data;
};
