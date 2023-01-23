   // import { EmailLogin } from '../src/components/EmailLogin.js'
    import { signInWithEmailAndPassword, firebaseAuth, signOut, sendPasswordResetEmail, createUserWithEmailAndPassword, sendEmailVerificatio, updateProfile } from '../src/app/firebase.js'
    import { signInAccount } from '../src/app/signIn.js'
    import { signOutFun } from '../src/app/signOut.js';
    import { pswReset } from '../src/app/PswReset.js';
    import { registrar }from '../src/app/register.js';

    jest.mock('../src/app/firebase.js', ()=>{
        return{
            firebaseAuth: jest.fn(() =>{
                return {firebaseAuth:'TEST'}
            }),
            signInWithEmailAndPassword: jest.fn((email,password) => {
                if(!email || !password){
                    throw new Error('ERROR')
                }
                return Promise.resolve({ user: 'admin' })
            }),
            signOut: jest.fn((auth)=>{
                if (!auth) return Promise.reject('no auth parameter')
            }),
            sendPasswordResetEmail: jest.fn((auth, email)=>{
                if(!auth || !email) return Promise.reject('no email or auth')
            }),
            createUserWithEmailAndPassword: jest.fn((email, password)=>{
                if(!email || !password){
                    throw new Error('ERROR')
                }
                return Promise.resolve({ userCredential: 'admin' })
            }),
            sendEmailVerification: jest.fn((auth)=>{
                if (!auth) return Promise.reject()
            }),
            updateProfile: jest.fn((displayName, auth)=>{
                if(!auth || !displayName) return Promise.reject('no displayName or auth')
            })
        }
    })

    describe('Test for the login function',()=> {
        const email = "petblr@test.com"
        const password = "Petblrlomejor123"
        const repeatPsw = "Petblrlomejor123"
        const displayName = "Petblr"
        
        it('Should call signInWithEmailAndPassword', async()=> {
            await signInAccount(email, password)
            expect(signInWithEmailAndPassword).toHaveBeenCalled()
        })

        it('Should throw an error if executed without arguments', async()=> {
            try {
                await signInAccount()
            }catch(error){             
                expect(error).toEqual(new Error('ERROR'))
            }
        })

        it('Should call signInWithEmailAndPassword with the firebaseAuth, email and pass arguments', async()=> {
            await signInAccount(email, password)
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(firebaseAuth, email, password)
        })
        
        it('should call signOut firebase function', async()=>{
            await signOutFun(firebaseAuth)
            expect(signOut).toHaveBeenCalled()
        })

        it('should throw an error signOut firebase function', async()=>{
            try {
                const result = await signOutFun()
                expect(result).toBe(false)
            } catch (error) {
                expect(error).toBe('no auth parameter')
            }
        })

        it('should call sendPasswordResetEmail firebase function', async()=>{
            await pswReset(firebaseAuth, email)
            expect(sendPasswordResetEmail).toHaveBeenCalled()
        })

        it('should throw an error sendPasswordResetEmail firebase function', async()=>{
            try {
                await pswReset(email)
            } catch (error) {
                expect(error).toBe('no email or auth')
            }
        })

        it('should throw an error sendEmailVerification firebase function', async()=>{
            try {
                await registrar()
            } catch (error) {
                expect(error).toBe('generic_failure')
            }
        })

        it('should call createUserWithEmailAndPassword firebase function', async()=>{
            try {
                await registrar(email, password)
            } catch (error) {
                expect(error).toBe('wrong password')
            }
        })

        it('should throw an error sendPasswordResetEmail firebase function', async()=>{
            try {
                await updateProfile(displayName)
            } catch (error) {
                expect(error).toBe('no displayName or auth')
            }
        })
    })