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
                    return;
                }

                if (this.email.length < 6) {
                    this.errorMessage = "E-mail have to be at least 6 characters long";
                    return;
                }

                if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.exec(this.email)) {
                    this.errorMessage = "E-mail is incorrect";
                    return;
                }

                if (this.password === "") {
                    this.errorMessage = "Password cannot be empty";
                    return;
                }

                if (this.password.length < 8) {
                    this.errorMessage = "Password have to be at least 8 characters long";
                    return;
                }

                if (!/[a-z]/.exec(this.password)) {
                    this.errorMessage = "Password have to include lowercase character";
                    return;
                }

                if (!/[A-Z]/.exec(this.password)) {
                    this.errorMessage = "Password have to include uppercase character";
                    return;
                }

                if (!/\d/.exec(this.password)) {
                    this.errorMessage = "Password have to inclue digit";
                    return;
                }

                if (this.password !== this.repeatPassword) {
                    this.errorMessage = "Passwords don't match";
                    return;
                }

                this.appState = AppState.Loading;
                this.errorMessage = "";

                const res = await postRegister({
                    email: this.email,
                    password: this.password,
                    repeatPassword: this.repeatPassword,
                });

                console.log(res)

                this.appState = AppState.Default;
            },
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
                        <div>
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
                <div>
                    user already exists
                </div>
            </template>
            <template v-else-if="appState === AppState.Registered">
                <div>
                    user successfully registered
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
</style>