// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'app/App.tsx'
import 'dayjs/locale/ru';
// import { spy } from 'mobx'
//
// spy((ev) => {
//     if (ev.type === "action") {
//         console.log(ev)
//     }
// })

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
)
