import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { googleSignin } from '@src/lib/api/users/googleSigin'
import Cookies from 'js-cookie'

export type GoogleLoginButtonProps = {}

function GoogleLoginButton({}: GoogleLoginButtonProps) {
  const onSuccess = async (res: any) => {
    try {
      const { token } = await googleSignin(res.credential)
      Cookies.set('Tct', token)
    } catch (e) {}
  }

  const onError = () => {}

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ''}>
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
    </GoogleOAuthProvider>
  )
}

export default GoogleLoginButton
