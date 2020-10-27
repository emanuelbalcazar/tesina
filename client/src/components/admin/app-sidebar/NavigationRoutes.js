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
            name: 'wordcloud',
            displayName: 'Nube de palabras',
            meta: {
                iconClass: 'fa fa-cloud'
            }
        }
    ]
}
