import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
const authStatus = atom({
    key: 'authState', 
    default: {
        status : false,
        credentialVerified:false,
        otpVerified:false,
        userName : "",
        email : "",
        token : ""
    },
    effects_UNSTABLE: [persistAtom], 
  });

export {authStatus};
