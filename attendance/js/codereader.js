var codereader;
let selectedDeviceId;
window.addEventListener('load', function () {
  //const hints = new Map();
  //const formats = [ZXing.BarcodeFormat.CODE_39];
 
  //hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, formats);
  //hints.set(ZXing.DecodeHintType.TRY_HARDER, true);
  codeReader = new ZXing.BrowserMultiFormatReader()//ZXing.BrowserBarcodeReader()
  //codeReader.hints = hints;
  console.log('ZXing code reader initialized')
  codeReader.getVideoInputDevices()
    .then((videoInputDevices) => {
      const sourceSelect = document.getElementById('switchCam')
      selectedDeviceId = videoInputDevices[0].deviceId
      //startCam()
      if (videoInputDevices.length > 1) {
        let selectedId = 0;
        sourceSelect.style.display = 'block';
        /*videoInputDevices.forEach((element) => {
          const sourceOption = document.createElement('option')
          sourceOption.text = element.label
          sourceOption.value = element.deviceId
          sourceSelect.appendChild(sourceOption)
        })*/
        sourceSelect.onclick = () => {
          codeReader.reset()
          selectedId+=1
          if(selectedId>=videoInputDevices.length)
            selectedId = 0
          selectedDeviceId = videoInputDevices[selectedId].deviceId
          startCam()
        };
        //const sourceSelectPanel = document.getElementById('sourceSelectPanel')
        //sourceSelectPanel.style.display = 'block'
      }
      document.getElementById('startButton').addEventListener('click', () => {
        startCam()
      })
      document.getElementById('resetButton').addEventListener('click', () => {
        codeReader.reset()
        //document.getElementById('result').textContent = '';
        console.log('Reset.');
      })
    })
    .catch((err) => {
      console.error(err)
    })

    hideAll()
})

function startCam(){
  codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
    drawGraphics()
    if (result) {
      console.log(result)
      //document.getElementById('result').textContent = result.text
      idbInstance.checkForCode(result.text);
    }
    if (err && !(err instanceof ZXing.NotFoundException)) {
      console.error(err);
      //document.getElementById('result').textContent = err
    }
  })
  console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
}
