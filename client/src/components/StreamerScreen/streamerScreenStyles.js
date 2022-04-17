const styles = `

@keyframes slide-in-left {
  0% {
    transform: translateX(-110%)
  }
  100% {
    transform: translateX(0%)
  }
}
@keyframes slide-out-left {
  0% {
    transform: translateX(0%)
  }
  100% {
    transform: translateX(-110%)
  }
}

@keyframes slide-in-right {
  0% {
    transform: translateX(-110%)
  }
  100% {
    transform: translateX(0%)
  }
}
@keyframes slide-out-right {
  0% {
    transform: translateX(0%)
  }
  100% {
    transform: translateX(110%)
  }
}

@keyframes slide-in-bottom {
  0% {
    transform: translateY(-110%)
  }
  100% {
    transform: translateX(0%)
  }
}
@keyframes slide-out-bottom {
  0% {
    transform: translateY(0%)
  }
  100% {
    transform: translateY(-110%)
  }
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-110%)
  }
  100% {
    transform: translateY(0%)
  }
}
@keyframes slide-out-top {
0% {
    transform: translateY(0%)
  }
  100% {
    transform: translateY(-110%)
  }
}


.bottom-in-up {

}

.bottom-out-down {

}

.top-in-down {

}

.top-out-up {

}

.slide-in-left {
  animation: slide-in-left 0.4s ease;
  animation-fill-mode: forwards;
}
.slide-out-left {
  animation: slide-out-left 0.4s ease;
  animation-fill-mode: forwards;
}
.slide-in-out-left{
  animation: slide-in-left 0.4s ease, slide-out-left 0.4s ease 1s;
  animation-fill-mode: forwards;
}
.stay-left {
  display: none;
}

.side-out-right {
  animation: slide-out-right 0.6s ease;
  animation-fill-mode: forwards;
}

.side-in-right {

}

.side-out-left {

}
`

export default styles
