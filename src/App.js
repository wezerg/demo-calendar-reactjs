import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './Component/Header';
import { Calendar } from './Views/Calendar';
import { Aside } from './Component/Aside';
import { RendezVous } from './Views/RendezVous';
import { Footer } from './Component/Footer';

function App() {
    return (
        <BrowserRouter location={"/"}>
            <main className='container-fluid d-flex' style={{flexDirection: "column"}}>
                <Header/>
                <section className='d-flex justify-content-center' style={{flexGrow: 1}}>
                    <Aside/>
                    <Routes>
                        <Route path="/" element={<Calendar/>}/>
                        <Route path="/rdv" element={<RendezVous/>}/>
                    </Routes>
                </section>
                <Footer/>
            </main>
        </BrowserRouter>
    )
}

export default App;
