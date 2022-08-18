import { useEffect } from "react"
import Router from 'next/router'
import useRequest from "../../hooks/useRequest"

export default function Signout() {

    const [doRequest] = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/home')
    })

    useEffect(() => {
        doRequest();
    },[])

  return 
    <></>
  
}