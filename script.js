const WHITE_KEYS = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift']
const BLACK_KEYS = ['2', '3', '5', '6', '7', '9', '0', 's', 'd', 'g', 'h', 'j', 'l', ';', "'"]

// TODO: Look at this, some of these are not needed
const freq = document.querySelectorAll('.data.freq')
const note = document.querySelectorAll('.data.note')
const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

keys.forEach(key => {
  key.addEventListener('click', () => playNote(key))
})


document.addEventListener('keydown', e => {
  if (e.repeat) return
  const key = e.key
  const whiteKeyIndex = WHITE_KEYS.indexOf(key)
  const blackKeyIndex = BLACK_KEYS.indexOf(key)

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex])
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex])
})


// TODO: Fix playNote function for Safari browsers
function playNote(key) {
  /* Create a new object everytime a note is played so that the sound from the old note 
  still plays alongside the new note */
  const noteAudio = new Audio(document.getElementById(key.dataset.note).src)
  noteAudio.currentTime = 0
  noteAudio.play()
  document.getElementById("hrtz").innerHTML = 
    (key.getAttribute('data-freq'))
  key.classList.add('active')
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active')
  })
}
