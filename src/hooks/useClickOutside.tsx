import { useEffect, RefObject } from 'react'

const useClickOutside = (ref: RefObject<HTMLElement>, handler: () => void) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return
			}
			handler()
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('touchstart', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('touchstart', handleClickOutside)
		}
	}, [ref, handler])
}

export default useClickOutside
