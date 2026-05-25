import { useEffect, useState } from 'react'

export default function useGeolocation() {

  const [location, setLocation] = useState(null)

  const error =
    !navigator.geolocation
      ? 'GPS não suportado'
      : null

  useEffect(() => {

    if (!navigator.geolocation) return

    const watchId = navigator.geolocation.watchPosition(

      (position) => {

        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })

      },

      () => {
        console.log('Permita acesso ao GPS')
      }

    )

    return () => {
      navigator.geolocation.clearWatch(watchId)
    }

  }, [])

  return { location, error }
}