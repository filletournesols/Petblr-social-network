import { onNavigate } from '../main.js';
import { pswReset } from '../app/Psw-reset.js';

export const RecoverPsw = () => {
    const RecoverPswDiv = document.createElement('div');
    const template = `
        <section class="recover-psw" id="RecoverPsw">
            <form class="recover-psw-form" id="RecoverPswForm">
                <div class="recover-psw-form-background">
                    <input type="recover-psw" class="recover-psw-form-input" id="RecoverPswFormInput" placeholder="hola@petblr.com" required />
                    <button class="reset-recover-psw-div-btn" id="resetRecoverPswDivBtn">RESTABLECER</button>
                    <button class="cancel-recover-psw-div-btn" id="cancelRecoverPswDivBtn">CANCELAR</button>
                </div>
            </form>
        </section>
    `
    RecoverPswDiv.innerHTML = template
    
    RecoverPswDiv.querySelector('#resetRecoverPswDivBtn').addEventListener('click', pswReset)
    RecoverPswDiv.querySelector('#cancelRecoverPswDivBtn').addEventListener('click', () => onNavigate('/emaillogin'))
    
    return RecoverPswDiv;
}