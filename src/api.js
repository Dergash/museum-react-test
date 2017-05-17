const exibitsUrl = 'http://localhost:3000/exibits';

export function getExibits() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: exibitsUrl,
        })
        .done(response => {
            const exibits = JSON.parse(response)
                .map((exibit, index) => ({
                    id: index, // feels uncomfortable without a key :<
                    name: exibit.name,
                    organization: exibit.origin,
                    origin: `${exibit.city}${exibit.city && exibit.country ? ', ' : ''}${exibit.country}`,
                    description: exibit.description,
                }));
            resolve(exibits);
        })
        .fail(error => {
            reject(error);
        });
    });
}