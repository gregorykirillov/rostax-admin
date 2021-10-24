

export const getFormDataFromForm = form => {
    const formData = new FormData(form);

    for (const [field, value] of formData.entries()) {
        if (value instanceof File) {
            const elements = form.elements;
            const fileInput = elements[field];

            if (!fileInput.files || !fileInput.files.length) {
                // Неважно, какое это поле, главное, чтобы оно стало пустым
                formData.set(field, '');
            }
        }
    }
    return formData;
};
