import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(({ targetTime, remainingTime, onReset }, ref) => {

  const dialog = useRef(); // Burada yeni bir useRef oluşturduk. <dialog>'da bunu kullanacağız, direkt prop ref'ini değil.

  const userLost = remainingTime <= 0
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2) // ms to second
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100); // 1 ile 100 arasında skor verecek. (1'den çıkartıyoruz ki 0,3 ise 0,7 olsun çünkü kalan zaman azaldıkça puan artacak.) targetTime * 1000 dememizin sebebi remainingTime milisaniye ama targetTime saniye. () içine al çünkü ilk böler yoksa.

  useImperativeHandle(ref, () => { // 2 değer alır, ilki gelen ref, 2.si fonksiyon alır ve kendi methodlarımızı gireriz. method ismi isteğe bağlı (open yerine başka şey yazabilirim yani.)
    return {
      open() {
        dialog.current.showModal(); // bu component'teki dialog = useRef'i. Artık dialog.current.open() diye kullanabiliriz showModal yerine.
      }
    }
  })

  return createPortal(
    <dialog ref={dialog} className='result-modal' onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  )
})

export default ResultModal