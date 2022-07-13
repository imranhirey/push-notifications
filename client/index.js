let Public_Key='BAEarYF6J-EMXwHN8MYmCBK1DpEar0LHHBhU5CuLcFc22NN6ePTitDY4IEmOdk-qIQCoTx7jKa6nQszCLbL-vQY'


if ('serviceWorker' in navigator){
    dir().catch((err)=>console.log(err))
}

///   
async function dir(){
    const register = await navigator.serviceWorker.register("/worker.js", {
        scope: "/"
      });
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(Public_Key)
      });
      await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json"
        }
      });



}


function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }