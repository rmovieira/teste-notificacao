import logo from './logo.svg'
import './App.css'
import { useEffect } from 'react'

function App() {

  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     // Registra um service worker hospeadado na raiz do
  //     // site usando o escopo padrão
  //     navigator.serviceWorker
  //       .register("/sw.js")
  //       .then(function (registration) {
  //         console.log("Service worker  registrado com sucesso:", registration)
  //       })
  //       .catch(function (error) {
  //         console.log("Falha ao Registrar o Service Worker:", error)
  //       })
  //   } else {
  //     console.log("Service workers não suportado!")
  //   }

  // }, [])

  const notificacaoDesktop = () => {
    if (!('Notification' in window)) {
      alert('Esse navegador nao suporta notificação desktop')
      return
    }
    console.log(Notification.permission)
    if (Notification.permission !== 'granted') {
      Notification.requestPermission()
      return
    }

    new Notification('Notificação Tooooopper!')
  }

  const notificacaoAndroid = () => {
    if (!('ServiceWorkerRegistration' in window)) {
      alert('Persistent Notification API not supported!')
      return
    }
    try {
      navigator.serviceWorker.getRegistration()
        .then((reg) => reg.showNotification("Hi there - persistent!"))
        .catch((err) => alert('Service Worker registration error: ' + err));
    } catch (err) {
      alert('Notification API error: ' + err);
    }
  }


  return (
    <div className="App">
      <button onClick={notificacaoDesktop}>
        Notificação de desktop
      </button>

      <br />
      <br />
      <br />
      <button onClick={notificacaoAndroid}>
        Notificação de dispositivo móvel
      </button>
    </div >
  )
}

export default App
