const onxrloaded = () => {
  window.XR8.XrController.configure({
    imageTargetData: [
      require('../image-targets/risio-frente.json'),
      require('../image-targets/risio-reverso.json'),
    ],
  })
}

if (window.XR8) {
  onxrloaded()
} else {
  window.addEventListener('xrloaded', onxrloaded, {once: true})
}
