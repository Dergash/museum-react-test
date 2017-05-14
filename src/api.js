const exibitsUrl = 'http://localhost:3000/exibits';

export function getExibits() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: exibitsUrl,
        })
        .done(response => {
            resolve(JSON.parse(response));
        })
        .fail(error => {
            reject(error);
        });
    });
}