import logo from './logo.svg'
import './App.css'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function App() {
  const [registerServiceWorker, setRegisterServiceWorker] = useState()
  // useEffect(() => {
  //   if (Notification.permission !== 'granted') {
  //     Notification.requestPermission()
  //     return
  //   }
  // }, [])

  useEffect(() => {
    async function load() {
      const swRegistration = await navigator.serviceWorker.register(`${window.location.pathname}/service-worker.js`)
      setRegisterServiceWorker(swRegistration)
    }
    load()
  }, [])

  const darPermissao = () => {
    Notification.requestPermission()
  }

  const notificacaoAndroid = useCallback(() => {
    if (!registerServiceWorker) {
      alert("service worker nao registrado")
      return
    }
    if (!('ServiceWorkerRegistration' in window)) {
      alert('Persistent Notification API not supported!')
      return
    }
    try {
      navigator.serviceWorker.getRegistration(`${window.location.pathname}/service-worker.js`)
        .then((reg) => {
          const options = {
            icon: `${window.location.pathname}/logo192.png`,
            badge: `${window.location.pathname}/logo192.png`
          }
          reg.showNotification("Validação de notificação", options)
        })
        .catch((err) => console.log('Service Worker registration error: ' + err))
    } catch (err) {
      console.log('Notification API error: ' + err)
    }
  }, [registerServiceWorker])

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

    new Notification('Validação de notificação!')
  }

  return (
    <div className="App">
      <button onClick={darPermissao} style={{ height: '80px' }}>
        Dar permissão
      </button>

      <br />
      <br />
      <br />
      <button onClick={notificacaoDesktop} style={{ height: '80px' }}>
        Notificação de desktop
      </button>

      <br />
      <br />
      <br />
      <button onClick={notificacaoAndroid} style={{ height: '80px' }}>
        Notificação de dispositivo móvel
      </button>
    </div >
  )
}