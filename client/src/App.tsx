import WholeForm from './components/form/wholeForm';
import Footer from './components/footer/footer'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/form/form.css';
import './components/footer/footer.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AccountPage from './components/account/accountPage';
import './components/account/accountPage.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={        
        <section className='wholeBody'>
            <WholeForm />
            <Footer />
        </section>}
      />
      <Route path="/userAccountPage" element={<AccountPage />}/>
    </Routes>
  );
}

export default App;
