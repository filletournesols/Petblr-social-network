/* eslint-disable no-unused-vars */
const PATHS = {
  home: {
    path: '/',
    template: `
            <section class="home" id="home">
                <div class="home-div" id="homeDiv">
                    <a class="home-create-account-intro">
                    <h1 class="hello-home">¡Hola!</h1>
                        Hemos pensado para tí y tu amo esta novedosa red social dónde la
                        estrella serás tú.
                    </a>
                    <a class="home-question">¿Qué quieres hacer hoy?</a>
                    <button class="home-create-account" id="navLinkCreateAccount">
                        REGISTRARSE
                    </button>
                    <button class="home-create-account" id="navLinkLogin">
                        INICIAR SESIÓN
                    </button>
                </div>
            </section>
        `,
  },
  signup: {
    path: '/signup',
    template: `
            <section class="register" id="register">
                <form class="register-form" id="registerForm">
                <div class="register-form-background">
                    <input type="name" class="register-form-pet-name-input" id="registerFormPetNameInput" placeholder="Nombre de usuario" required />
                    <input type="email" class="register-form-pet-email-input" id="registerFormPetEmailInput" placeholder="hola@petblr.com" required />
                    <input type="name" class="register-form-user-name-input" id="registerFormUserNameInput" placeholder="Nombre del dueño" required />
                    <input type="password" class="register-form-password-input" id="registerFormPasswordInput" placeholder="Contraseña" required />
                    <label class="register-form-psw-recomendation" id="registerFormPswRecomendation">DEBE TENER MÍNIMO 6 CARÁCTERES, UNA MAYÚSCULA Y UN NÚMERO</label>
                    <input type="password" class="register-form-repeat-password-input" id="registerFormRepeatPasswordInput"placeholder="Repetir contraseña" required />
                    <label class="register-form-repeat-psw hidden" id="registerFormRepeatPsw"> LAS CONTRASEÑAS DEBEN COINCIDIR</label>
                    <button class="register-div-btn" id="registerDivBtn">REGISTRARSE</button>
                    </div>
                    </form>
            </section>
            <section class="auth-error hidden" id="authError">
                <div class="auth-error-div">
                    <h1 class="auth-error-text">Lo sentimos, correo en uso.</h1>
                </div>
            </section>
        `,
  },
//   signup: {
//     path: '/signup',
//     template: `
           
//             <section class="auth-error hidden" id="authError">
//                 <div class="auth-error-div">
//                     <h1 class="auth-error-text">Lo sentimos, correo en uso.</h1>
//                 </div>
//             </section>
//         `,
//   },
  login: {
    path: '/login',
    template: `
        <section class="email-facebook-page" id="emailFacebookPage">
            <div class="email-facebook-div" id="emailFacebookDiv">
                <button class="email-btn" id="emailBtn">CORREO</button>
                <button class="facebook-btn" id="facebookBtn">FACEBOOK</button>
            </div>
        </section>
        `,
  },
  loginFacebook: {
    path: '/loginFacebook',
    template: `
        <section class="login-facebook" id="loginFacebook">
            <form class="login-facebook-form" id="loginFacebookForm">
                <input type="user" class="login-facebook-form-user-name-input" id="loginFacebookFormUserNameInput" placeholder="Nombre de usuario" required />
                <input type="password" class="login-facebook-form-password-input" id="loginFacebookFormPasswordInput" placeholder="CONTRASEÑA" required />
                <button class="login-facebook-form-btn" id="loginFacebookFormBtn">INGRESAR</button>
            </form>
        </section>
         `,
  },
  loginMail: {
    path: '/loginMail',
    template: `
        <section class="login-mail" id="loginMail">
            <form class="login-mail-form" id="loginMailForm">
                <input type="user" class="login-mail-form-user-name-input" id="loginMailFormUserNameInput" placeholder="hola@petblr.com" required />
                <input type="password" class="login-mail-form-password-input" id="loginMailFormPasswordInput" placeholder="CONTRASEÑA" required />
                <button class="login-mail-form-btn" id="loginMailFormBtn">INGRESAR</button>
            </form>
        </section>
         `,
  },
  feed: {
    path: '/feed',
    template: `
        <section class="feed" id="feed">
            <h1> Estamos trabajando para usted...</h1>
        </section>
         `,
  },


};
