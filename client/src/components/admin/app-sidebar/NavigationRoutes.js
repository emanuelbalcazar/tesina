export const navigationRoutes = {
    root: {
        name: '/',
        displayName: 'navigationRoutes.home'
    },
    routes: [
        {
            name: 'dashboard',
            displayName: 'Principal',
            meta: {
                iconClass: 'fa fa-home'
            }
        },
        {
            name: 'articles',
            displayName: 'Articulos',
            meta: {
                iconClass: 'fa fa-newspaper-o',
            },
            disabled: true,
            children: [
                {
                    name: 'export-articles',
                    displayName: 'Exportar articulos'
                },
                {
                    name: 'list-articles',
                    displayName: 'Listar articulos'
                },
                {
                    name: 'list-normalized-articles',
                    displayName: 'Listar articulos normalizados'
                }
            ]
        },
        {
            name: 'wordcloud',
            displayName: 'Nube de palabras',
            meta: {
                iconClass: 'fa fa-cloud'
            },
            disabled: true,
            children: [
                {
                    name: 'wordcloud-date',
                    displayName: 'Nube de palabras por fecha'
                },
                {
                    name: 'wordcloud-site',
                    displayName: 'Nube de palabras por sitio'
                },
                {
                    name: 'global-words',
                    displayName: 'Palabras globales'
                }
            ]
        }
    ]
}
