import { useEffect, useState } from 'react'
import { FilmIcon, PlusIcon } from './icons'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISS_KEY = 'cinehub.install.dismissed'

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

function isIos(): boolean {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

// A subtle bottom banner prompting the user to install the app. Uses the native
// install flow where available (Android/desktop Chrome) and falls back to an
// "Add to Home Screen" hint on iOS Safari, which has no install event.
export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIosHint, setShowIosHint] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isStandalone()) return
    if (localStorage.getItem(DISMISS_KEY)) return

    const onPrompt = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)

    // iOS never fires beforeinstallprompt — show the manual hint instead.
    if (isIos()) {
      setShowIosHint(true)
      setVisible(true)
    }

    const onInstalled = () => {
      setVisible(false)
      localStorage.setItem(DISMISS_KEY, '1')
    }
    window.addEventListener('appinstalled', onInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (!visible) return null

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const install = async () => {
    if (!deferred) return
    await deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
    dismiss()
  }

  return (
    <div className="install" role="dialog" aria-label="Install CineHub">
      <div className="install__icon">
        <FilmIcon width={22} height={22} />
      </div>
      <div className="install__text">
        <p className="install__title">Install CineHub</p>
        {showIosHint ? (
          <p className="install__sub">
            Tap the Share button, then “Add to Home Screen”.
          </p>
        ) : (
          <p className="install__sub">Add it to your home screen for the full app.</p>
        )}
      </div>
      {!showIosHint && (
        <button className="install__btn" onClick={install}>
          <PlusIcon width={16} height={16} />
          Install
        </button>
      )}
      <button className="install__close" onClick={dismiss} aria-label="Dismiss">
        ✕
      </button>
    </div>
  )
}
