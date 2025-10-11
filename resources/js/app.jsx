import './bootstrap';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import LandingLayout from '@/Layouts/DashboardLayout/dashboard-layout.jsx';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page = pages[`./Pages/${name}.jsx`]
        // page.default.layout = page.default.layout || ((page) => <LandingLayout children={page} />);
        // return page;

        if (!('layout' in page.default)) {
            page.default.layout = (page) => <LandingLayout>{page}</LandingLayout>;
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})