<script>
    import { postRegister } from '@/api';
    import Loading from '@/components/Loading.vue';

    const AppState = {
        Default: "Default",
        Loading: "Loading",
        Exists: "Exists",
        Registered: "Registered",
    };

    const ApiResopnse = {
        Error: "Error",
        
    };

    export default {
        data() {
            return {
                email: "",
                password: "",
                repeatPassword: "",
                errorMessage: "",
                appState: AppState.Default,
                AppState,
                ApiResopnse,
            };
        },
        components: {
            Loading,
        },
        computed: {
            anyFieldEmpty() {
                return this.email === "" || this.password === "" || this.repeatPassword === "";
            },
            isError() {
                return this.errorMessage !== "";
            }
        },
        methods: {
            async submitForm(event) {
                event.preventDefault();
                this.appState = AppState.Loading;

                if (this.email === "") {
                    this.errorMessage = "E-mail cannot be empty";
                    this.appState = AppState.Default;
                    return;
                }

                if (this.email.length < 6) {
                    this.errorMessage = "E-mail have to be at least 6 characters long";
                    this.appState = AppState.Default;
                    return;
                }

                if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.exec(this.email)) {
                    this.errorMessage = "E-mail is incorrect";
                    this.appState = AppState.Default;
                    return;
                }

                if (this.password === "") {
                    this.errorMessage = "Password cannot be empty";
                    this.appState = AppState.Default;
                    return;
                }

                if (this.password.length < 8) {
                    this.errorMessage = "Password have to be at least 8 characters long";
                    this.appState = AppState.Default;
                    return;
                }

                if (!/[a-z]/.exec(this.password)) {
                    this.errorMessage = "Password have to include lowercase character";
                    this.appState = AppState.Default;
                    return;
                }

                if (!/[A-Z]/.exec(this.password)) {
                    this.errorMessage = "Password have to include uppercase character";
                    this.appState = AppState.Default;
                    return;
                }

                if (!/\d/.exec(this.password)) {
                    this.errorMessage = "Password have to inclue digit";
                    this.appState = AppState.Default;
                    return;
                }

                if (this.password !== this.repeatPassword) {
                    this.errorMessage = "Passwords don't match";
                    this.appState = AppState.Default;
                    return;
                }

                const res = await postRegister({
                    email: this.email,
                    password: this.password,
                    repeatPassword: this.repeatPassword,
                });

                this.errorMessage = "";

                switch (res.status) {
                    case 200:
                        this.appState = AppState.Registered;
                        break;
                    case 400:
                        this.appState = AppState.Default;
                        this.errorMessage = res.data.message;
                        break;
                    case 409:
                        this.appState = AppState.Exists;
                        break;
                    default:
                        this.appState = AppState.Default;
                        this.errorMessage = "Something went wrong";
                        break;
                };
            },
            reset() {
                this.email = "";
                this.password = "";
                this.repeatPassword = "";
                this.errorMessage = "";
                this.appState = AppState.Default;
            }
        },
    };
</script>

<template>
    <template v-if="appState === AppState.Loading">
        <Loading />
    </template>
    <template v-else>
        <div class="center-content">
            <template v-if="appState === AppState.Default">
                <form class="register-form" @submit="submitForm">
                    <h2>Register form</h2>

                    <template v-if="isError">
                        <div class="error-box">
                            {{ errorMessage }}
                        </div>
                    </template>

                    <input type="text" placeholder="E-mail" v-model="email">
                    <input type="password" placeholder="Password" v-model="password">
                    <input type="password" placeholder="Repeat password" v-model="repeatPassword">
                    <button type="submit" :disabled="anyFieldEmpty">Register</button>
                </form>
            </template>
            <template v-else-if="appState === AppState.Exists">
                <div class="info-box">
                    <h2>user already exists</h2>
                    <button @click="reset">Return</button>
                </div>
            </template>
            <template v-else-if="appState === AppState.Registered">
                <div class="info-box">
                    user successfully registered

                    <button @click="reset">Return</button>
                </div>
            </template>
        </div>
    </template>
    
</template>

<style scoped>
    .register-form {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        width: 16rem;

        & > h2 {
            text-align: center;
        }

        & > input {
            padding: .5rem;
        }

        & > button {
            padding: .5rem;
        }
    }

    .error-box {
        color: red;
    }

    .info-box {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        align-items: center;

        & > button {
            padding: .5rem;
        }
    }
</style>