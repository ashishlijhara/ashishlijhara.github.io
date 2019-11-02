window.addEventListener('load', function () {
  let selectedDeviceId;
  const codeReader = new ZXing.BrowserMultiFormatReader()
  console.log('ZXing code reader initialized')
  codeReader.getVideoInputDevices()
    .then((videoInputDevices) => {
      const sourceSelect = document.getElementById('switchCam')
      selectedDeviceId = videoInputDevices[0].deviceId
      if (videoInputDevices.length >= 1 &&  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
      {
        for(i=0;i<videoInputDevices.length;i++){
          if(videoInputDevices[i].label.includes('back')){
            selectedDeviceId = i;
          }
        }
      }
        //sourceSelect.style.display = 'block';
        /*videoInputDevices.forEach((element) => {
          const sourceOption = document.createElement('option')
          sourceOption.text = element.label
          sourceOption.value = element.deviceId
          sourceSelect.appendChild(sourceOption)
        })
        sourceSelect.onclick = () => {
          codeReader.reset()
          selectedId+=1
          if(selectedId>=videoInputDevices.length)
            selectedId = 0
          selectedDeviceId = selectedId
          startCam()
        };*/
        startCam()
        //const sourceSelectPanel = document.getElementById('sourceSelectPanel')
        //sourceSelectPanel.style.display = 'block'
      function startCam(){
        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
          if (result) {
            console.log(result)
            //document.getElementById('result').textContent = result.text
          }
          if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err)
            //document.getElementById('result').textContent = err
          }
        })
        console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
      }
      function startCam(){
        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
          if (result) {
            console.log(result)
            //document.getElementById('result').textContent = result.text
          }
          if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err)
            //document.getElementById('result').textContent = err
          }
        })
        console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
      }
      document.getElementById('startButton').addEventListener('click', () => {
        startCam()
      })
      document.getElementById('resetButton').addEventListener('click', () => {
        codeReader.reset()
        //document.getElementById('result').textContent = '';
        console.log('Reset.')
      })
    })
    .catch((err) => {
      console.error(err)
    })

})